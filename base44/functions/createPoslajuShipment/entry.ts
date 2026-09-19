import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const user = await base44.auth.me();
        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const apiKey = Deno.env.get('POSLAJU_API_KEY');
        const accountNo = Deno.env.get('POSLAJU_ACCOUNT_NO');

        if (!apiKey || !accountNo) {
            return Response.json({ 
                error: 'Poslaju credentials not configured',
                details: 'Please set POSLAJU_API_KEY and POSLAJU_ACCOUNT_NO in environment variables'
            }, { status: 500 });
        }

        const shipmentData = await req.json();
        const { customer_name, customer_phone, shipping_address, city, state, postcode, weight_kg, declared_value } = shipmentData;

        // Poslaju API endpoint (this is a placeholder - actual endpoint from Poslaju documentation)
        const poslajuUrl = 'https://api.pos.com.my/poslaju/v1/shipment/create';

        const requestBody = {
            accountNo: accountNo,
            sender: {
                name: 'CrypSafe',
                phone: '+60167736549',
                address: 'Your warehouse address',
                postcode: 'Your postcode',
                city: 'Your city',
                state: 'Your state'
            },
            receiver: {
                name: customer_name,
                phone: customer_phone,
                address: shipping_address,
                postcode: postcode,
                city: city,
                state: state
            },
            parcel: {
                weight: weight_kg || 0.5,
                declaredValue: declared_value || 0,
                contentDescription: 'Hardware Wallet & Accessories'
            },
            serviceType: 'Standard', // or 'Express'
        };

        const response = await fetch(poslajuUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create Poslaju shipment');
        }

        const data = await response.json();

        // Calculate shipping cost (West/East Malaysia)
        const eastMalaysiaStates = ['Sabah', 'Sarawak', 'Labuan'];
        const isEastMalaysia = eastMalaysiaStates.includes(state);
        const shippingCost = isEastMalaysia ? 20 : 10;

        return Response.json({
            success: true,
            tracking_number: data.trackingNumber,
            label_url: data.labelUrl,
            shipping_cost: shippingCost,
            estimated_delivery_days: isEastMalaysia ? '4-6' : '2-3'
        });

    } catch (error) {
        console.error('Error creating Poslaju shipment:', error);
        return Response.json({ 
            error: error.message,
            details: 'Failed to create Poslaju shipment. This might be a test/placeholder API.'
        }, { status: 500 });
    }
});