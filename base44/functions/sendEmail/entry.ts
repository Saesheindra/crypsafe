import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        const { method } = req;
        if (method !== 'POST') {
            return Response.json({ error: 'Method not allowed' }, { status: 405 });
        }

        const body = await req.json();
        const { to, subject, html, text, body_html, body_text } = body;

        // Support both naming conventions
        const emailHtml = html || body_html;
        const emailText = text || body_text;

        console.log('sendEmail called with:', { to, subject, hasHtml: !!emailHtml, hasText: !!emailText });

        if (!to || !subject || (!emailHtml && !emailText)) {
            console.error('Missing required fields:', { to: !!to, subject: !!subject, html: !!emailHtml, text: !!emailText });
            return Response.json({ 
                error: 'Missing required fields: to, subject, and either html/body_html or text/body_text' 
            }, { status: 400 });
        }

        // Use Base44's built-in email integration
        try {
            await base44.asServiceRole.integrations.Core.SendEmail({
                to: to,
                subject: subject,
                body: emailText || emailHtml // Core.SendEmail uses 'body' parameter
            });

            console.log('✅ Email sent successfully via Base44 Core.SendEmail to:', to);

            return Response.json({
                success: true,
                message: 'Email sent successfully',
                to: to
            });
        } catch (emailError) {
            console.error('❌ Failed to send email via Base44:', emailError);
            throw emailError;
        }

    } catch (error) {
        console.error('❌ Error in sendEmail function:', error);
        console.error('Error stack:', error.stack);
        return Response.json({ 
            error: error.message,
            details: 'Failed to send email',
            stack: error.stack
        }, { status: 500 });
    }
});