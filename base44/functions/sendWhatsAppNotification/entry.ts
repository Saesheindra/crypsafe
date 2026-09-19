import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        const { method } = req;
        if (method !== 'POST') {
            return Response.json({ error: 'Method not allowed' }, { status: 405 });
        }

        const { to, message } = await req.json();

        if (!to || !message) {
            return Response.json({ error: 'Missing required fields: to, message' }, { status: 400 });
        }

        console.log('Sending WhatsApp notification to:', to);

        // Get Twilio credentials from environment
        const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
        const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
        const fromNumber = Deno.env.get('TWILIO_WHATSAPP_NUMBER'); // Should be in format: whatsapp:+14155238886

        if (!accountSid || !authToken || !fromNumber) {
            console.warn('Twilio WhatsApp credentials not configured - skipping WhatsApp notification');
            return Response.json({ 
                success: false,
                skipped: true,
                message: 'WhatsApp notifications not configured'
            });
        }

        // Format phone number to WhatsApp format
        let formattedTo = to;
        if (!to.startsWith('whatsapp:')) {
            // Format to E.164 first
            let phoneNumber = to;
            if (!phoneNumber.startsWith('+')) {
                // If Malaysian number without country code, add +60
                if (phoneNumber.startsWith('0')) {
                    phoneNumber = '+6' + phoneNumber.substring(1);
                } else if (phoneNumber.startsWith('1')) {
                    phoneNumber = '+60' + phoneNumber;
                } else {
                    phoneNumber = '+' + phoneNumber;
                }
            }
            formattedTo = `whatsapp:${phoneNumber}`;
        }

        console.log('Formatted WhatsApp number:', formattedTo);

        // Send WhatsApp message using Twilio API
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
        const auth = btoa(`${accountSid}:${authToken}`);

        const body = new URLSearchParams({
            To: formattedTo,
            From: fromNumber,
            Body: message
        });

        const response = await fetch(twilioUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString()
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Twilio WhatsApp error:', errorData);
            throw new Error(errorData.message || 'Failed to send WhatsApp message');
        }

        const data = await response.json();
        console.log('✅ WhatsApp message sent successfully:', data.sid);

        return Response.json({
            success: true,
            messageSid: data.sid,
            status: data.status,
            to: formattedTo
        });

    } catch (error) {
        console.error('❌ Error sending WhatsApp notification:', error);
        return Response.json({ 
            success: false,
            error: error.message,
            details: 'Failed to send WhatsApp notification'
        }, { status: 500 });
    }
});