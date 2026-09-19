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

        const { shipmentId } = await req.json();

        if (!shipmentId) {
            return Response.json({ error: 'Missing shipmentId' }, { status: 400 });
        }

        // Fetch shipment details
        const shipments = await base44.asServiceRole.entities.Shipment.filter({ id: shipmentId });
        
        if (shipments.length === 0) {
            return Response.json({ error: 'Shipment not found' }, { status: 404 });
        }

        const shipment = shipments[0];

        if (!shipment.customer_email) {
            return Response.json({ error: 'No customer email found' }, { status: 400 });
        }

        if (!shipment.tracking_number || shipment.tracking_number.startsWith('PENDING')) {
            return Response.json({ error: 'Tracking number not available yet. Please create the shipment first.' }, { status: 400 });
        }

        // Determine tracking URL based on courier
        let trackingUrl = '';
        switch (shipment.courier) {
            case 'ninja_van':
                trackingUrl = `https://www.ninjavan.co/en-my/tracking?id=${shipment.tracking_number}`;
                break;
            case 'poslaju':
                trackingUrl = `https://www.pos.com.my/postal-services/quick-access?track-trace`;
                break;
            case 'jt_express':
                trackingUrl = `https://www.jtexpress.my/tracking`;
                break;
            default:
                trackingUrl = '#';
        }

        // Build tracking email
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #071018 0%, #0b2221 100%); padding: 30px; text-align: center;">
                    <h1 style="color: #00ffc6; margin: 0;">Your Order Has Shipped! 📦</h1>
                </div>
                <div style="padding: 30px; background: #fff;">
                    <p style="font-size: 16px; color: #333;">Hi ${shipment.customer_name},</p>
                    <p style="font-size: 14px; color: #666;">Great news! Your order has been shipped and is on its way to you.</p>
                    
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #00ffc6; margin-top: 0;">Tracking Information</h3>
                        <p style="margin: 10px 0;"><strong>Tracking Number:</strong> ${shipment.tracking_number}</p>
                        <p style="margin: 10px 0;"><strong>Courier:</strong> ${shipment.courier.replace(/_/g, ' ').toUpperCase()}</p>
                        ${shipment.estimated_delivery ? `<p style="margin: 10px 0;"><strong>Estimated Delivery:</strong> ${new Date(shipment.estimated_delivery).toLocaleDateString()}</p>` : ''}
                        
                        <a href="${trackingUrl}" style="display: inline-block; margin-top: 15px; padding: 12px 30px; background: #00ffc6; color: #071018; text-decoration: none; border-radius: 8px; font-weight: bold;">
                            Track Your Package
                        </a>
                    </div>
                    
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h4 style="color: #333; margin-top: 0;">Shipping Address:</h4>
                        <p style="color: #666; margin: 5px 0;">${shipment.shipping_address}</p>
                        <p style="color: #666; margin: 5px 0;">${shipment.city}, ${shipment.state} ${shipment.postcode}</p>
                    </div>
                    
                    <div style="background: #e3f9f4; border-left: 4px solid #00ffc6; padding: 15px; margin: 20px 0;">
                        <p style="margin: 0; color: #333;"><strong>💡 Delivery Tips:</strong></p>
                        <ul style="color: #666; margin: 10px 0; padding-left: 20px;">
                            <li>Make sure someone is available to receive the package</li>
                            <li>Track your package regularly for updates</li>
                            <li>Contact us immediately if there are any delivery issues</li>
                        </ul>
                    </div>
                    
                    <p style="font-size: 14px; color: #666; margin-top: 30px;">
                        Questions about your delivery? Contact us:
                    </p>
                    <p style="font-size: 14px; color: #666;">
                        📧 <a href="mailto:crypsafe.my@gmail.com" style="color: #00ffc6;">crypsafe.my@gmail.com</a><br>
                        💬 WhatsApp: <a href="https://wa.me/601166736549" style="color: #00ffc6;">+60 11 6673 6549</a>
                    </p>
                </div>
                <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 12px;">
                    <p>CrypSafe - A brand of SANDRIAR ENTERPRISE</p>
                    <p>Official Tangem Reseller • Official Keystone Reseller</p>
                </div>
            </div>
        `;

        const emailText = `
Hi ${shipment.customer_name},

Great news! Your order has been shipped and is on its way to you.

TRACKING INFORMATION:
Tracking Number: ${shipment.tracking_number}
Courier: ${shipment.courier.replace(/_/g, ' ').toUpperCase()}
${shipment.estimated_delivery ? `Estimated Delivery: ${new Date(shipment.estimated_delivery).toLocaleDateString()}` : ''}

Track your package: ${trackingUrl}

SHIPPING ADDRESS:
${shipment.shipping_address}
${shipment.city}, ${shipment.state} ${shipment.postcode}

Questions? Contact us:
Email: crypsafe.my@gmail.com
WhatsApp: +60 11 6673 6549

---
CrypSafe - Official Tangem & Keystone Reseller
        `;

        // Send email
        await base44.asServiceRole.functions.invoke('sendEmail', {
            to: shipment.customer_email,
            subject: `Your Order Has Shipped! 📦 Tracking: ${shipment.tracking_number}`,
            html: emailHtml,
            text: emailText
        });

        return Response.json({
            success: true,
            message: `Tracking email sent to ${shipment.customer_email}`
        });

    } catch (error) {
        console.error('Error sending tracking email:', error);
        return Response.json({ 
            error: error.message,
            details: 'Failed to send tracking email'
        }, { status: 500 });
    }
});