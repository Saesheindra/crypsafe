import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        const { method } = req;
        if (method !== 'GET') {
            return Response.json({ error: 'Method not allowed' }, { status: 405 });
        }

        const url = new URL(req.url);
        const trackingNumber = url.searchParams.get('tracking_number');
        const courier = url.searchParams.get('courier');

        if (!trackingNumber) {
            return Response.json({ error: 'Missing tracking_number' }, { status: 400 });
        }

        // Use AfterShip for unified tracking across all couriers
        const aftershipApiKey = Deno.env.get('AFTERSHIP_API_KEY');

        if (aftershipApiKey) {
            const aftershipUrl = `https://api.aftership.com/v4/trackings/${courier || 'poslaju'}/${trackingNumber}`;
            
            const response = await fetch(aftershipUrl, {
                method: 'GET',
                headers: {
                    'aftership-api-key': aftershipApiKey,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                return Response.json({
                    success: true,
                    tracking: data.data.tracking
                });
            }
        }

        // Fallback: Check database for tracking info
        const shipments = await base44.entities.Shipment.filter({ tracking_number: trackingNumber });
        
        if (shipments.length > 0) {
            return Response.json({
                success: true,
                tracking: shipments[0]
            });
        }

        return Response.json({ 
            error: 'Tracking number not found',
            details: 'Please ensure AfterShip is configured for live tracking'
        }, { status: 404 });

    } catch (error) {
        console.error('Error tracking shipment:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});