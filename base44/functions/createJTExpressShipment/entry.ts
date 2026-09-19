import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const user = await base44.auth.me();
        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const apiKey = Deno.env.get('JT_EXPRESS_API_KEY');
        const customerCode = Deno.env.get('JT_EXPRESS_CUSTOMER_CODE');
        const apiAccount = Deno.env.get('JT_EXPRESS_API_ACCOUNT');

        if (!apiKey || !customerCode || !apiAccount) {
            return Response.json({ 
                error: 'J&T Express credentials not configured',
                details: 'Please set JT_EXPRESS_API_KEY, JT_EXPRESS_CUSTOMER_CODE, and JT_EXPRESS_API_ACCOUNT'
            }, { status: 500 });
        }

        const shipmentData = await req.json();
        const { customer_name, customer_phone, shipping_address, city, state, postcode, weight_kg, declared_value } = shipmentData;

        // J&T Express API endpoint
        const jtUrl = 'https://openapi.jtexpress.my/webopenplatformapi/api/order/addOrder';

        const requestBody = {
            customerCode: customerCode,
            digest: apiKey,
            txLogisticId: `CRYP${Date.now()}`, // Unique order ID
            sender: {
                name: 'CrypSafe',
                mobile: '0167736549',
                address: 'Your warehouse address',
                postCode: 'Your postcode',
                city: 'Your city',
                prov: 'Your state'
            },
            receiver: {
                name: customer_name,
                mobile: customer_phone.replace(/^0/, ''), // Remove leading 0
                address: shipping_address,
                postCode: postcode,
                city: city,
                prov: state
            },
            goods: [{
                goodsName: 'Hardware Wallet',
                goodsType: 'Electronics',
                goodsQuantity: 1,
                goodsProperty: 1,
                goodsDesc: 'Cryptocurrency Hardware Wallet & Accessories',
                goodsWeight: (weight_kg || 0.5) * 1000, // Convert to grams
                goodsValue: declared_value || 0
            }],
            serviceType: '1', // Standard delivery
            payType: '1' // Prepaid
        };

        const response = await fetch(jtUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apiAccount': apiAccount
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Failed to create J&T Express shipment');
        }

        const data = await response.json();

        if (data.code !== '1') {
            throw new Error(data.msg || 'J&T API returned error');
        }

        // Calculate shipping cost
        const eastMalaysiaStates = ['Sabah', 'Sarawak', 'Labuan'];
        const isEastMalaysia = eastMalaysiaStates.includes(state);
        const shippingCost = isEastMalaysia ? 20 : 10;

        return Response.json({
            success: true,
            tracking_number: data.data.billCode,
            label_url: data.data.labelUrl || null,
            shipping_cost: shippingCost,
            estimated_delivery_days: isEastMalaysia ? '4-6' : '2-3'
        });

    } catch (error) {
        console.error('Error creating J&T Express shipment:', error);
        return Response.json({ 
            error: error.message,
            details: 'Failed to create J&T Express shipment'
        }, { status: 500 });
    }
});