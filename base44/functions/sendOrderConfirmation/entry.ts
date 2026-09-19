import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        const { method } = req;
        if (method !== 'POST') {
            return Response.json({ error: 'Method not allowed' }, { status: 405 });
        }

        const body = await req.json();
        const { order, customer } = body;

        // Extract data from nested structure
        const orderId = order?.id;
        const items = order?.items || [];
        const total = order?.total;
        const subtotal = order?.subtotal;
        const shippingCost = order?.shipping_cost || 0;
        const paymentMethod = order?.payment_method || 'card';
        
        const customerEmail = customer?.email;
        const customerName = customer?.name;
        const customerPhone = customer?.phone;
        const customerAddress = customer?.address;
        const customerCity = customer?.city;
        const customerState = customer?.state;
        const customerPostcode = customer?.postcode;

        console.log('Sending order confirmation to:', customerEmail);
        console.log('Order details:', { orderId, total, items: items.length });

        if (!customerEmail || !customerName || !items || items.length === 0 || !total) {
            console.error('Missing required order information:', { customerEmail, customerName, itemsCount: items?.length, total });
            return Response.json({ error: 'Missing required order information' }, { status: 400 });
        }

        // Build full shipping address string
        const fullAddress = [
            customerAddress,
            customerCity,
            customerState,
            customerPostcode
        ].filter(Boolean).join(', ');

        // Build items list for email
        const itemsList = items.map(item => 
            `• ${item.name} - RM ${item.price.toFixed(2)} x ${item.quantity || 1}`
        ).join('\n');

        // Send Email
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #071018 0%, #0b2221 100%); padding: 30px; text-align: center;">
                    <h1 style="color: #00ffc6; margin: 0;">Order Confirmation</h1>
                </div>
                <div style="padding: 30px; background: #fff;">
                    <p style="font-size: 16px; color: #333;">Hi ${customerName},</p>
                    <p style="font-size: 14px; color: #666;">Thank you for your order! We've received your payment and will process your order shortly.</p>
                    
                    ${orderId ? `<p style="font-size: 14px; color: #666;"><strong>Order ID:</strong> ${orderId}</p>` : ''}
                    ${paymentMethod ? `<p style="font-size: 14px; color: #666;"><strong>Payment Method:</strong> ${paymentMethod}</p>` : ''}
                    
                    <h3 style="color: #00ffc6; margin-top: 30px;">Order Details:</h3>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        ${items.map(item => `
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <span>${item.name} ${item.quantity ? `x ${item.quantity}` : ''}</span>
                                <span>RM ${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                            </div>
                        `).join('')}
                        ${subtotal ? `
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-top: 10px; border-top: 1px dashed #ddd;">
                                <span>Subtotal</span>
                                <span>RM ${subtotal.toFixed(2)}</span>
                            </div>
                        ` : ''}
                        ${shippingCost > 0 ? `
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <span>Shipping</span>
                                <span>RM ${shippingCost.toFixed(2)}</span>
                            </div>
                        ` : ''}
                        <hr style="border: none; border-top: 2px solid #00ffc6; margin: 15px 0;">
                        <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #00ffc6;">
                            <span>Total:</span>
                            <span>RM ${total.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    ${fullAddress ? `
                        <h3 style="color: #00ffc6; margin-top: 30px;">Shipping Address:</h3>
                        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 10px 0;">
                            <p style="color: #666; margin: 0;">${fullAddress}</p>
                        </div>
                    ` : ''}
                    
                    <p style="font-size: 14px; color: #666; margin-top: 30px;">
                        We'll send you tracking information via WhatsApp once your order ships (1-2 business days).
                    </p>
                    
                    <p style="font-size: 14px; color: #666;">
                        Questions? Contact us on WhatsApp: <a href="https://wa.me/601166736549" style="color: #00ffc6;">+60 11 6673 6549</a>
                    </p>
                </div>
                <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 12px;">
                    <p>CrypSafe - A brand of SANDRIAR ENTERPRISE</p>
                    <p>Official Tangem Reseller • Ledger Affiliate Partner</p>
                </div>
            </div>
        `;

        const emailText = `
Hi ${customerName},

Thank you for your order! We've received your payment and will process your order shortly.

${orderId ? `Order ID: ${orderId}\n` : ''}
${paymentMethod ? `Payment Method: ${paymentMethod}\n` : ''}

Order Details:
${itemsList}
${subtotal ? `Subtotal: RM ${subtotal.toFixed(2)}\n` : ''}
${shippingCost > 0 ? `Shipping: RM ${shippingCost.toFixed(2)}\n` : ''}

Total: RM ${total.toFixed(2)}

${fullAddress ? `\nShipping Address:\n${fullAddress}\n` : ''}

We'll send you tracking information via WhatsApp once your order ships (1-2 business days).

Questions? Contact us on WhatsApp: +60 11 6673 6549

---
CrypSafe - Official Tangem Reseller • Ledger Affiliate Partner
        `.trim();

        // Send email using sendEmail function
        try {
            await base44.asServiceRole.functions.invoke('sendEmail', {
                to: customerEmail,
                subject: `Order Confirmation - CrypSafe${orderId ? ` #${orderId.substring(0, 8)}` : ''}`,
                html: emailHtml,
                text: emailText
            });
            console.log('✅ Email sent successfully to:', customerEmail);
        } catch (emailError) {
            console.error('❌ Failed to send email:', emailError);
            throw emailError; // Re-throw to be caught by outer catch
        }

        // Send SMS if phone number provided
        if (customerPhone) {
            const smsMessage = `CrypSafe: Order confirmed! Total: RM${total.toFixed(2)}. ${items.length} item(s) will ship in 1-2 days. Track via WhatsApp. Thanks!`;
            
            try {
                await base44.asServiceRole.functions.invoke('sendSMS', {
                    to: customerPhone,
                    message: smsMessage
                });
                console.log('✅ SMS sent successfully to:', customerPhone);
            } catch (smsError) {
                console.error('⚠️ SMS failed but email sent:', smsError);
                // Don't fail the whole request if SMS fails
            }
        }

        return Response.json({
            success: true,
            message: 'Order confirmation sent',
            emailSent: true,
            smsSent: !!customerPhone
        });

    } catch (error) {
        console.error('❌ Error sending order confirmation:', error);
        console.error('Error stack:', error.stack);
        return Response.json({ 
            error: error.message,
            details: 'Failed to send order confirmation',
            stack: error.stack
        }, { status: 500 });
    }
});