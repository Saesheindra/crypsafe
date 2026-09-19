import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        // Verify user is authenticated
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { method } = req;
        if (method !== 'POST') {
            return Response.json({ error: 'Method not allowed' }, { status: 405 });
        }

        const { to, message } = await req.json();

        if (!to || !message) {
            return Response.json({ error: 'Missing required fields: to, message' }, { status: 400 });
        }

        // Get Twilio credentials from environment
        const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
        const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
        const fromNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

        if (!accountSid || !authToken || !fromNumber) {
            return Response.json({ 
                error: 'Twilio credentials not configured',
                details: 'Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER in environment variables'
            }, { status: 500 });
        }

        // Format phone number to E.164 format if needed
        let formattedTo = to;
        if (!to.startsWith('+')) {
            // If Malaysian number without country code, add +60
            if (to.startsWith('0')) {
                formattedTo = '+6' + to.substring(1);
            } else if (to.startsWith('1')) {
                formattedTo = '+60' + to;
            } else {
                formattedTo = '+' + to;
            }
        }

        // Send SMS using Twilio API
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
            throw new Error(errorData.message || 'Failed to send SMS');
        }

        const data = await response.json();

        return Response.json({
            success: true,
            messageSid: data.sid,
            status: data.status,
            to: formattedTo
        });

    } catch (error) {
        console.error('Error sending SMS:', error);
        return Response.json({ 
            error: error.message,
            details: 'Failed to send SMS notification'
        }, { status: 500 });
    }
});