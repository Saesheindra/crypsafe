import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const assetConfig = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", binance: "BTCUSDT", color: "#f7931a", icon: "₿" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", binance: "ETHUSDT", color: "#627eea", icon: "Ξ" },
  { id: "solana", name: "Solana", symbol: "SOL", binance: "SOLUSDT", color: "#14F195", icon: "◎" },
  { id: "ripple", name: "XRP", symbol: "XRP", binance: "XRPUSDT", color: "#23292f", icon: "✕" }
];

export default function LiveCryptoPrices() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchPrices = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const results = await Promise.all(
        assetConfig.map(a =>
          fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${a.binance}`).then(r => r.json())
        )
      );

      const newPrices = {};
      assetConfig.forEach((asset, i) => {
        newPrices[asset.id] = {
          id: asset.id,
          current_price_usd: parseFloat(results[i].lastPrice),
          price_change_percentage_24h: parseFloat(results[i].priceChangePercent),
          market_cap_usd: 'N/A'
        };
      });

      setPrices(newPrices);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Error fetching prices:", error);
    }

    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPrices();
    // Refresh every 60 seconds
    const interval = setInterval(() => fetchPrices(true), 60000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    if (!price) return "0.00";
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <Card className="bg-[#0b2838] border-2 border-[#00ffc6]/30 shadow-xl">
      <CardHeader className="border-b border-[#00ffc6]/20 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg mb-1 text-white">Live Crypto Prices</CardTitle>
            {lastUpdate && (
              <p className="text-[10px] text-gray-300">
                Last updated: {lastUpdate.toLocaleTimeString('en-US')}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fetchPrices(true)}
            disabled={refreshing}
            className="hover:bg-[#00ffc6]/20 h-8 w-8"
          >
            <RefreshCw className={`w-4 h-4 text-[#00ffc6] ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-4">
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-[#0d3a4f]">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-full bg-gray-600" />
                  <div>
                    <Skeleton className="h-3 w-16 mb-1 bg-gray-600" />
                    <Skeleton className="h-2 w-12 bg-gray-600" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-20 mb-1 bg-gray-600" />
                  <Skeleton className="h-3 w-12 ml-auto bg-gray-600" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {assetConfig.map((asset, index) => {
                const priceData = prices[asset.id] || {};
                const isPositive = (priceData.price_change_percentage_24h || 0) >= 0;
                
                return (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ffc6]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    
                    <div className="relative flex items-center justify-between p-2 rounded-lg bg-[#0d3a4f] hover:bg-[#10455c] transition-all cursor-pointer border border-[#00ffc6]/20 hover:border-[#00ffc6]/50">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold border"
                          style={{ 
                            backgroundColor: asset.color + "30", 
                            color: asset.color,
                            borderColor: asset.color + "60"
                          }}
                        >
                          {asset.icon}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">{asset.name}</p>
                          <p className="text-[10px] text-gray-300">{asset.symbol}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 justify-end">
                            <p className="text-sm font-bold text-white">
                              ${formatPrice(priceData.current_price_usd)}
                            </p>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                                isPositive 
                                  ? 'bg-green-500/30 text-green-300 border border-green-500/50' 
                                  : 'bg-red-500/30 text-red-300 border border-red-500/50'
                              }`}
                            >
                              {isPositive ? (
                                <TrendingUp className="w-2.5 h-2.5" />
                              ) : (
                                <TrendingDown className="w-2.5 h-2.5" />
                              )}
                              {Math.abs(priceData.price_change_percentage_24h || 0).toFixed(2)}%
                            </motion.div>
                          </div>
                          <p className="text-[10px] text-gray-400">
                            MCap: {priceData.market_cap_usd || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-[#00ffc6]/30">
          <p className="text-[10px] text-gray-300 text-center">
            Powered by Binance • Auto-refreshes every minute
          </p>
        </div>
      </CardContent>
    </Card>
  );
}