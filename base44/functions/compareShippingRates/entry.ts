import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { method } = req;
        if (method !== 'POST') {
            return Response.json({ error: 'Method not allowed' }, { status: 405 });
        }

        const { state, postcode, weight_kg } = await req.json();

        if (!state || !postcode) {
            return Response.json({ error: 'Missing state or postcode' }, { status: 400 });
        }

        const eastMalaysiaStates = ['Sabah', 'Sarawak', 'Labuan'];
        const isEastMalaysia = eastMalaysiaStates.includes(state);

        // Default rates for Malaysian couriers
        const rates = [
            {
                courier: 'ninja_van',
                name: 'Ninja Van',
                price: isEastMalaysia ? 20 : 10,
                estimatedDays: isEastMalaysia ? '4-6' : '2-3',
                recommended: true,
                features: ['Fast pickup', 'Easy tracking', 'Reliable service']
            },
            {
                courier: 'poslaju',
                name: 'Pos Laju',
                price: isEastMalaysia ? 20 : 10,
                estimatedDays: isEastMalaysia ? '4-6' : '2-3',
                recommended: false,
                features: ['Government postal service', 'Wide coverage']
            },
            {
                courier: 'jt_express',
                name: 'J&T Express',
                price: isEastMalaysia ? 20 : 10,
                estimatedDays: isEastMalaysia ? '4-6' : '2-3',
                recommended: false,
                features: ['Competitive rates', 'Good network']
            }
        ];

        // If EasyParcel is configured, get live rates
        const easyparcelApiKey = Deno.env.get('EASYPARCEL_API_KEY');
        
        if (easyparcelApiKey) {
            try {
                const easyparcelUrl = 'https://api.easyparcel.com/api/v1/rates';
                const response = await fetch(easyparcelUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${easyparcelApiKey}`
                    },
                    body: JSON.stringify({
                        origin: {
                            postcode: 'YOUR_WAREHOUSE_POSTCODE',
                            state: 'YOUR_STATE'
                        },
                        destination: {
                            postcode: postcode,
                            state: state
                        },
                        weight: weight_kg || 0.5,
                        length: 30,
                        width: 20,
                        height: 10
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    return Response.json({
                        success: true,
                        rates: data.rates || rates
                    });
                }
            } catch (error) {
                console.error('EasyParcel API error:', error);
            }
        }

        return Response.json({
            success: true,
            rates: rates
        });

    } catch (error) {
        console.error('Error comparing shipping rates:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});