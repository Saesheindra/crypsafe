import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const user = await base44.auth.me();
        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized - Admin only' }, { status: 401 });
        }

        const { method } = req;
        if (method !== 'POST') {
            return Response.json({ error: 'Method not allowed' }, { status: 405 });
        }

        const shipmentData = await req.json();
        const { courier, customer_name, customer_phone, shipping_address, city, state, postcode, weight_kg, declared_value } = shipmentData;

        if (!courier || !customer_name || !customer_phone || !shipping_address || !city || !state || !postcode) {
            return Response.json({ error: 'Missing required shipment fields' }, { status: 400 });
        }

        // Create shipment based on courier
        let result;
        
        switch (courier) {
            case 'poslaju':
                result = await base44.functions.invoke('createPoslajuShipment', shipmentData);
                break;
            case 'jt_express':
                result = await base44.functions.invoke('createJTExpressShipment', shipmentData);
                break;
            case 'ninja_van':
                result = await base44.functions.invoke('createNinjaVanShipment', shipmentData);
                break;
            default:
                return Response.json({ error: 'Unsupported courier' }, { status: 400 });
        }

        // Save shipment to database
        const shipment = await base44.asServiceRole.entities.Shipment.create({
            ...shipmentData,
            tracking_number: result.data.tracking_number,
            label_url: result.data.label_url,
            shipping_cost: result.data.shipping_cost,
            status: 'label_generated'
        });

        // Send notification to customer
        if (customer_phone) {
            try {
                await base44.functions.invoke('sendSMS', {
                    to: customer_phone,
                    message: `CrypSafe: Your order has shipped! Track: ${result.data.tracking_number}. Expected delivery: ${result.data.estimated_delivery_days} days. WhatsApp: +60167736549`
                });
            } catch (error) {
                console.error('SMS notification failed:', error);
            }
        }

        return Response.json({
            success: true,
            shipment: shipment,
            tracking_number: result.data.tracking_number,
            label_url: result.data.label_url
        });

    } catch (error) {
        console.error('Error creating shipment:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});