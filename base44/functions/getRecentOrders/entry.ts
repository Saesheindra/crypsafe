import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import Stripe from 'npm:stripe@14.10.0';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized - Admin only' }, { status: 401 });
        }

        const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
        if (!stripeSecretKey) {
            return Response.json({ error: 'Stripe not configured' }, { status: 500 });
        }

        const stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2023-10-16',
        });

        // Get recent checkout sessions
        const sessions = await stripe.checkout.sessions.list({
            limit: 20,
            expand: ['data.line_items', 'data.customer']
        });

        const orders = await Promise.all(sessions.data.map(async (session) => {
            const lineItems = session.line_items?.data || [];
            
            return {
                id: session.id,
                amount_total: session.amount_total,
                currency: session.currency,
                payment_status: session.payment_status,
                status: session.status,
                created: new Date(session.created * 1000).toISOString(),
                customer: {
                    name: session.customer_details?.name || session.shipping_details?.name || 'N/A',
                    email: session.customer_details?.email || 'N/A',
                    phone: session.customer_details?.phone || session.shipping_details?.phone || 'N/A'
                },
                shipping: session.shipping_details ? {
                    address: session.shipping_details.address,
                    name: session.shipping_details.name
                } : null,
                items: lineItems.map(item => ({
                    description: item.description,
                    quantity: item.quantity,
                    amount: item.amount_total
                })),
                metadata: session.metadata
            };
        }));

        return Response.json({ orders });

    } catch (error) {
        console.error('Error fetching orders:', error);
        return Response.json({ 
            error: error.message,
            stack: error.stack 
        }, { status: 500 });
    }
});