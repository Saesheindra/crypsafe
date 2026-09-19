import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import Stripe from 'npm:stripe@14.10.0';

Deno.serve(async (req) => {
    try {
        const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
        const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

        if (!stripeSecretKey) {
            console.error('STRIPE_SECRET_KEY not configured');
            return Response.json({ error: 'Stripe not configured' }, { status: 500 });
        }

        const stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2023-10-16',
        });

        // Get the raw body for signature verification
        const body = await req.text();
        const signature = req.headers.get('stripe-signature');

        if (!signature) {
            console.error('No Stripe signature in webhook request');
            return Response.json({ error: 'No signature provided' }, { status: 400 });
        }

        // Initialize base44 client with service role for webhook processing
        const base44 = createClientFromRequest(req);

        let event;

        // Verify webhook signature if webhook secret is configured
        if (webhookSecret) {
            try {
                event = await stripe.webhooks.constructEventAsync(
                    body,
                    signature,
                    webhookSecret
                );
                console.log('Webhook signature verified successfully');
            } catch (err) {
                console.error('Webhook signature verification failed:', err.message);
                return Response.json({ error: 'Invalid signature' }, { status: 400 });
            }
        } else {
            // If no webhook secret, parse the body directly (NOT RECOMMENDED FOR PRODUCTION)
            console.warn('STRIPE_WEBHOOK_SECRET not set - skipping signature verification');
            event = JSON.parse(body);
        }

        console.log('Processing webhook event:', event.type, 'ID:', event.id);

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                console.log('Processing checkout session:', session.id);

                // Extract customer and shipping details
                const customerEmail = session.customer_details?.email || '';
                const customerName = session.customer_details?.name || '';
                const customerPhone = session.customer_details?.phone || '';
                const shippingAddress = session.shipping_details?.address || {};
                const shippingName = session.shipping_details?.name || customerName;

                console.log('Customer details:', { email: customerEmail, name: customerName, phone: customerPhone });

                // Get line items
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
                console.log('Line items retrieved:', lineItems.data.length, 'items');

                // Calculate amounts
                const subtotal = session.amount_subtotal / 100;
                const shippingCost = session.total_details?.amount_shipping 
                    ? session.total_details.amount_shipping / 100
                    : 0;
                const total = session.amount_total / 100;

                console.log('Order amounts:', { subtotal, shippingCost, total });

                // Format items list for notifications
                const itemsList = lineItems.data.map(item =>
                    `${item.description} x ${item.quantity} - RM ${(item.amount_total / 100).toFixed(2)}`
                ).join('\n');

                // Create shipment record
                const shipmentData = {
                    order_id: session.id,
                    tracking_number: 'PENDING - Awaiting label generation',
                    courier: shippingAddress.state?.toLowerCase().includes('sabah') ||
                             shippingAddress.state?.toLowerCase().includes('sarawak') ||
                             shippingAddress.state?.toLowerCase().includes('labuan')
                             ? 'poslaju' : 'ninja_van',
                    status: 'pending',
                    customer_name: shippingName,
                    customer_phone: customerPhone || 'Not provided',
                    customer_email: customerEmail,
                    shipping_address: `${shippingAddress.line1 || ''} ${shippingAddress.line2 || ''}`.trim(),
                    city: shippingAddress.city || '',
                    state: shippingAddress.state || '',
                    postcode: shippingAddress.postal_code || '',
                    shipping_cost: shippingCost,
                    declared_value: total,
                    notes: `Stripe Order: ${session.id}`
                };

                try {
                    const shipment = await base44.asServiceRole.entities.Shipment.create(shipmentData);
                    console.log('✅ Shipment record created for order:', session.id, 'Shipment ID:', shipment.id);
                } catch (error) {
                    console.error('❌ Failed to create shipment record:', error);
                }

                // Send order confirmation to customer
                try {
                    console.log('Sending customer order confirmation to:', customerEmail);
                    
                    const orderData = {
                        order: {
                            id: session.id,
                            items: lineItems.data.map(item => ({
                                name: item.description,
                                quantity: item.quantity,
                                price: item.amount_total / 100
                            })),
                            subtotal: subtotal,
                            shipping_cost: shippingCost,
                            total: total,
                            payment_method: session.payment_method_types?.[0] || 'card'
                        },
                        customer: {
                            email: customerEmail,
                            name: shippingName,
                            phone: customerPhone,
                            address: shipmentData.shipping_address,
                            city: shipmentData.city,
                            state: shipmentData.state,
                            postcode: shipmentData.postcode
                        }
                    };

                    await base44.asServiceRole.functions.invoke('sendOrderConfirmation', orderData);
                    console.log('✅ Customer order confirmation sent for order:', session.id);
                } catch (error) {
                    console.error('❌ Failed to send customer order confirmation:', error);
                    console.error('Error details:', error.message, error.stack);
                }

                // Send admin notification email
                try {
                    console.log('Sending admin notification email to: crypsafe.my@gmail.com');
                    
                    const adminEmailBody = `
New Stripe/Card Order Received! 🎉💳

Order ID: ${session.id}
Payment Status: ${session.payment_status}
Payment Method: ${session.payment_method_types?.[0] || 'card'}
Total Amount: RM ${total.toFixed(2)}

CUSTOMER DETAILS:
Name: ${shippingName}
Email: ${customerEmail}
Phone: ${customerPhone || 'Not provided'}

SHIPPING ADDRESS:
${shipmentData.shipping_address}
${shipmentData.city}, ${shipmentData.state} ${shipmentData.postcode}

ORDER ITEMS:
${itemsList}

PRICING:
Subtotal: RM ${subtotal.toFixed(2)}
Shipping: RM ${shippingCost.toFixed(2)}
Total: RM ${total.toFixed(2)}

✅ PAYMENT VERIFIED AUTOMATICALLY

NEXT STEPS:
1. Generate shipping label in Admin Shipping page
2. Update tracking number in database
3. Send tracking email to customer

View order in Stripe: https://dashboard.stripe.com/payments/${session.payment_intent}
                    `.trim();

                    await base44.asServiceRole.functions.invoke('sendEmail', {
                        to: 'crypsafe.my@gmail.com',
                        subject: `🛒 New Stripe Order: ${shippingName} - RM ${total.toFixed(2)}`,
                        text: adminEmailBody,
                        html: adminEmailBody.replace(/\n/g, '<br>')
                    });
                    console.log('✅ Admin notification email sent for order:', session.id);
                } catch (error) {
                    console.error('❌ Failed to send admin notification email:', error);
                    console.error('Error details:', error.message, error.stack);
                }

                // Send WhatsApp notification to admin
                try {
                    console.log('Sending WhatsApp notification to admin: +601166736549');
                    
                    const whatsappMessage = `🛒 NEW ORDER RECEIVED! 💳

Order: ${session.id.slice(-8)}
Customer: ${shippingName}
Amount: RM ${total.toFixed(2)}
Payment: ${session.payment_method_types?.[0]?.toUpperCase() || 'CARD'}

Items:
${itemsList}

📍 Ship to: ${shipmentData.city}, ${shipmentData.state}
📞 Phone: ${customerPhone || 'Not provided'}

✅ Payment verified
⚠️ Action needed: Create shipping label`;

                    await base44.asServiceRole.functions.invoke('sendWhatsAppNotification', {
                        to: '+601166736549',
                        message: whatsappMessage
                    });
                    console.log('✅ WhatsApp notification sent to admin');
                } catch (error) {
                    console.error('⚠️ Failed to send WhatsApp notification (non-critical):', error);
                    // Don't fail the webhook if WhatsApp fails
                }

                console.log('✅ Order processed successfully:', session.id);
                break;
            }

            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object;
                console.log('PaymentIntent succeeded:', paymentIntent.id);
                break;
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object;
                console.log('Payment failed:', paymentIntent.id);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return Response.json({ received: true });

    } catch (error) {
        console.error('❌ Webhook error:', error);
        console.error('Error stack:', error.stack);
        return Response.json({
            error: error.message,
            details: 'Webhook processing failed',
            stack: error.stack
        }, { status: 500 });
    }
});