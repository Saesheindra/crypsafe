import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const user = await base44.auth.me();
        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const clientId = Deno.env.get('NINJAVAN_CLIENT_ID');
        const clientSecret = Deno.env.get('NINJAVAN_CLIENT_SECRET');
        const countryCode = Deno.env.get('NINJAVAN_COUNTRY_CODE') || 'MY';

        if (!clientId || !clientSecret) {
            return Response.json({ 
                error: 'Ninja Van credentials not configured',
                details: 'Please set NINJAVAN_CLIENT_ID and NINJAVAN_CLIENT_SECRET in environment variables'
            }, { status: 500 });
        }

        const shipmentData = await req.json();
        const { customer_name, customer_phone, customer_email, shipping_address, city, state, postcode, weight_kg, declared_value } = shipmentData;

        // Get OAuth token first - PRODUCTION API
        const tokenUrl = `https://api.ninjavan.co/MY/2.2/oauth/access_token`;
        const tokenResponse = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            })
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            throw new Error(`Failed to authenticate with Ninja Van: ${errorText}`);
        }

        const { access_token } = await tokenResponse.json();

        // Create order - PRODUCTION API (v2.2)
        const orderUrl = `https://api.ninjavan.co/${countryCode}/2.2/orders`;
        
        // Format phone number (remove +60 or leading 0)
        let formattedPhone = customer_phone.replace(/\+60|^0/, '');
        
        const orderData = {
            service_type: "Parcel",
            service_level: "Standard",
            requested_tracking_number: `CRYP${Date.now()}`,
            
            // Sender info - 3 Infinite Emporium / CrypSafe
            from: {
                name: "CrypSafe (3 Infinite Emporium)",
                phone_number: "167736549",
                email: "orders@crypsafe.com",
                address: {
                    address1: Deno.env.get('WAREHOUSE_ADDRESS_LINE1') || "Your warehouse address line 1",
                    address2: Deno.env.get('WAREHOUSE_ADDRESS_LINE2') || "",
                    postcode: Deno.env.get('WAREHOUSE_POSTCODE') || "YOUR_POSTCODE",
                    city: Deno.env.get('WAREHOUSE_CITY') || "YOUR_CITY",
                    state: Deno.env.get('WAREHOUSE_STATE') || "YOUR_STATE",
                    country: "MY"
                }
            },
            
            // Recipient info
            to: {
                name: customer_name,
                phone_number: formattedPhone,
                email: customer_email || "customer@example.com",
                address: {
                    address1: shipping_address,
                    address2: "",
                    postcode: postcode,
                    city: city,
                    state: state,
                    country: "MY"
                }
            },
            
            // Parcel info
            parcel_job: {
                is_pickup_required: false,
                pickup_service_type: "Scheduled",
                pickup_service_level: "Standard",
                dimensions: {
                    weight: weight_kg || 0.5,
                    size: "S"
                },
                cash_on_delivery: false
            }
        };

        const orderResponse = await fetch(orderUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        if (!orderResponse.ok) {
            const errorData = await orderResponse.json();
            throw new Error(errorData.message || `Failed to create Ninja Van order: ${JSON.stringify(errorData)}`);
        }

        const data = await orderResponse.json();

        // Get shipping label - PRODUCTION API
        const labelUrl = `https://api.ninjavan.co/${countryCode}/2.2/orders/${data.tracking_id}/print_airway_bill`;
        const labelResponse = await fetch(labelUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        });

        let labelPdfUrl = null;
        if (labelResponse.ok) {
            const labelBlob = await labelResponse.blob();
            // Upload the label to your storage
            const labelFile = new File([labelBlob], `${data.tracking_id}.pdf`, { type: 'application/pdf' });
            const uploadResult = await base44.functions.invoke('uploadFile', { file: labelFile });
            labelPdfUrl = uploadResult.data.file_url;
        }

        // Calculate shipping cost (West/East Malaysia)
        const eastMalaysiaStates = ['Sabah', 'Sarawak', 'Labuan'];
        const isEastMalaysia = eastMalaysiaStates.includes(state);
        const shippingCost = isEastMalaysia ? 20 : 10;

        return Response.json({
            success: true,
            tracking_number: data.tracking_id,
            label_url: labelPdfUrl,
            shipping_cost: shippingCost,
            estimated_delivery_days: isEastMalaysia ? '4-6' : '2-3',
            ninja_van_order_id: data.id
        });

    } catch (error) {
        console.error('Error creating Ninja Van shipment:', error);
        return Response.json({ 
            error: error.message,
            details: 'Failed to create Ninja Van shipment'
        }, { status: 500 });
    }
});