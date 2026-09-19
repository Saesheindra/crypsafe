import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import Stripe from 'npm:stripe@14.10.0';

Deno.serve(async (req) => {
    try {
        const { method } = req;
        if (method !== 'POST') {
            return Response.json({ error: 'Method not allowed' }, { status: 405 });
        }

        const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
        if (!stripeSecretKey) {
            console.error('STRIPE_SECRET_KEY not configured');
            return Response.json({ 
                error: 'Stripe not configured',
                details: 'Payment system is not set up. Please contact support.'
            }, { status: 500 });
        }

        const stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2023-10-16',
        });

        // Try to get user, but allow unauthenticated checkout
        const base44 = createClientFromRequest(req);
        let user = null;
        try {
            user = await base44.auth.me();
        } catch (e) {
            console.log('User not authenticated, proceeding with guest checkout');
        }

        const body = await req.json();
        const { 
            items, // Array of items for multi-item cart
            product_name, // Single item support
            product_description,
            amount, 
            currency = 'myr',
            customer_email,
            customer_name,
            customer_phone,
            shipping_address,
            metadata = {},
            promo_code // Optional promo code
        } = body;

        // Validate promo code
        let discountPercent = 0;
        let validPromoCode = null;
        const currentDate = new Date();
        const promoExpiry = new Date('2026-03-31T23:59:59');

        if (promo_code && promo_code.toUpperCase() === 'CRYPSAFE10' && currentDate <= promoExpiry) {
            discountPercent = 10;
            validPromoCode = 'CRYPSAFE10';
        }

        // Get app URL for success/cancel redirects
        const origin = req.headers.get('origin') || req.headers.get('referer');
        let appUrl = 'https://crypsafe.com.my';
        
        if (origin) {
            try {
                const url = new URL(origin);
                appUrl = url.origin;
            } catch (e) {
                console.error('Failed to parse origin:', e);
            }
        }

        console.log('Creating checkout with appUrl:', appUrl);

        // Handle both single item and multi-item carts
        let lineItems;
        let totalAmount;

        if (items && Array.isArray(items) && items.length > 0) {
            // Multi-item cart
            lineItems = items.map(item => ({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.product_name || item.name,
                        description: item.product_description || item.description || '',
                    },
                    unit_amount: Math.round((item.price || 0) * 100), // Convert to cents
                },
                quantity: item.quantity || 1,
            }));
            
            // Calculate total from items
            totalAmount = items.reduce((sum, item) => 
                sum + ((item.price || 0) * (item.quantity || 1)), 0
            );
        } else {
            // Single item
            if (!product_name || !amount) {
                return Response.json({ 
                    error: 'Missing required fields: product_name and amount, or items array' 
                }, { status: 400 });
            }
            
            lineItems = [{
                price_data: {
                    currency: currency,
                    product_data: {
                        name: product_name,
                        description: product_description || '',
                    },
                    unit_amount: Math.round(amount * 100),
                },
                quantity: 1,
            }];
            
            totalAmount = amount;
        }

        // Free shipping for all orders
        const shippingOptions = [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: currency,
                    },
                    display_name: 'FREE Shipping (Malaysia)',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 2,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 6,
                        },
                    },
                },
            },
        ];

        // Create Stripe checkout session
        const sessionMetadata = {
            ...metadata,
            promo_code: validPromoCode || ''
        };
        
        if (user) {
            sessionMetadata.user_id = user.id;
            sessionMetadata.user_email = user.email;
        }

        // Create discount coupon if promo code is valid
        let discounts = [];
        if (discountPercent > 0) {
            // Create a one-time coupon for this session
            const coupon = await stripe.coupons.create({
                percent_off: discountPercent,
                duration: 'once',
                name: `${validPromoCode} - ${discountPercent}% Off`
            });
            discounts = [{ coupon: coupon.id }];
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'fpx'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${appUrl}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}?payment=cancelled`,
            customer_email: customer_email || (user ? user.email : undefined),
            metadata: sessionMetadata,
            phone_number_collection: {
                enabled: true,
            },
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['MY'],
            },
            shipping_options: shippingOptions,
            discounts: discounts,
        });

        console.log('Checkout session created successfully:', session.id);

        return Response.json({
            success: true,
            checkout_url: session.url,
            session_id: session.id
        });

    } catch (error) {
        console.error('Error creating Stripe checkout:', error);
        console.error('Error stack:', error.stack);
        
        return Response.json({ 
            error: error.message || 'Failed to create checkout',
            details: error.type || 'Stripe checkout error',
            stack: error.stack
        }, { status: 500 });
    }
});