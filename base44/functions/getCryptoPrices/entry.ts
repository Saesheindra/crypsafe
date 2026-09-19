Deno.serve(async (req) => {
    try {

        // Try multiple free APIs
        const apis = [
            {
                url: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,SOL,XRP&tsyms=USD',
                parse: (data) => {
                    const raw = data.RAW;
                    return {
                        bitcoin: {
                            id: 'bitcoin',
                            current_price_usd: raw.BTC?.USD?.PRICE || null,
                            price_change_percentage_24h: raw.BTC?.USD?.CHANGEPCT24HOUR || null,
                            market_cap_usd: raw.BTC?.USD?.MKTCAP ? `$${(raw.BTC.USD.MKTCAP / 1e9).toFixed(2)}B` : 'N/A'
                        },
                        ethereum: {
                            id: 'ethereum',
                            current_price_usd: raw.ETH?.USD?.PRICE || null,
                            price_change_percentage_24h: raw.ETH?.USD?.CHANGEPCT24HOUR || null,
                            market_cap_usd: raw.ETH?.USD?.MKTCAP ? `$${(raw.ETH.USD.MKTCAP / 1e9).toFixed(2)}B` : 'N/A'
                        },
                        solana: {
                            id: 'solana',
                            current_price_usd: raw.SOL?.USD?.PRICE || null,
                            price_change_percentage_24h: raw.SOL?.USD?.CHANGEPCT24HOUR || null,
                            market_cap_usd: raw.SOL?.USD?.MKTCAP ? `$${(raw.SOL.USD.MKTCAP / 1e9).toFixed(2)}B` : 'N/A'
                        },
                        ripple: {
                            id: 'ripple',
                            current_price_usd: raw.XRP?.USD?.PRICE || null,
                            price_change_percentage_24h: raw.XRP?.USD?.CHANGEPCT24HOUR || null,
                            market_cap_usd: raw.XRP?.USD?.MKTCAP ? `$${(raw.XRP.USD.MKTCAP / 1e9).toFixed(2)}B` : 'N/A'
                        }
                    };
                }
            }
        ];

        for (const api of apis) {
            try {
                const response = await fetch(api.url, { headers: { 'Accept': 'application/json' } });
                if (!response.ok) continue;
                const data = await response.json();
                const prices = api.parse(data);
                if (prices.bitcoin?.current_price_usd) {
                    return Response.json({ prices });
                }
            } catch (e) {
                console.error('API failed:', e.message);
                continue;
            }
        }

        // If all fail, return static fallback prices so UI doesn't break
        return Response.json({
            prices: {
                bitcoin: { id: 'bitcoin', current_price_usd: null, price_change_percentage_24h: null, market_cap_usd: 'N/A' },
                ethereum: { id: 'ethereum', current_price_usd: null, price_change_percentage_24h: null, market_cap_usd: 'N/A' },
                solana: { id: 'solana', current_price_usd: null, price_change_percentage_24h: null, market_cap_usd: 'N/A' },
                ripple: { id: 'ripple', current_price_usd: null, price_change_percentage_24h: null, market_cap_usd: 'N/A' }
            }
        });

    } catch (error) {
        console.error('Failed to fetch crypto prices:', error.message);
        return Response.json({ error: 'Unable to fetch crypto prices' }, { status: 500 });
    }
});