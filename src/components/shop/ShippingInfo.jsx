import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, MapPin, CheckCircle } from "lucide-react";

const SHIPPING_RATES = {
  west_malaysia: {
    name: "West Malaysia",
    price: 0,
    states: ["Kuala Lumpur", "Selangor", "Penang", "Johor", "Melaka", "Negeri Sembilan", "Perak", "Pahang", "Kedah", "Perlis", "Terengganu", "Kelantan", "Putrajaya"]
  },
  east_malaysia: {
    name: "East Malaysia",
    price: 0,
    states: ["Sabah", "Sarawak", "Labuan"]
  }
};

export default function ShippingInfo({ compact = false }) {
  if (compact) {
    return (
      <div className="bg-[#0b2221] rounded-lg p-4 border border-[#00ffc6]/20">
        <div className="flex items-center gap-3 mb-3">
          <Truck className="w-5 h-5 text-[#00ffc6]" />
          <h4 className="font-bold text-white">Shipping Rates</h4>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-[#c6fff0]">West Malaysia</span>
            <span className="font-bold text-green-400">FREE</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#c6fff0]">East Malaysia</span>
            <span className="font-bold text-green-400">FREE</span>
          </div>
          <p className="text-xs text-[#bfeee0] mt-2">Via Ninja Van, Pos Laju, or J&T Express</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="glass-card border-[#00ffc6]/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Truck className="w-8 h-8 text-[#00ffc6]" />
          <CardTitle className="text-2xl text-white">FREE Shipping Nationwide</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#0b2221] rounded-lg p-6 border border-[#00ffc6]/10">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-[#00ffc6]" />
              <h3 className="text-xl font-bold text-white">{SHIPPING_RATES.west_malaysia.name}</h3>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-green-400">FREE</span>
              <span className="text-[#c6fff0] ml-2">all orders</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-[#c6fff0] mb-2 font-semibold">Coverage:</p>
              <div className="flex flex-wrap gap-2">
                {SHIPPING_RATES.west_malaysia.states.slice(0, 6).map((state) => (
                  <span key={state} className="text-xs px-2 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] font-medium">
                    {state}
                  </span>
                ))}
                <span className="text-xs px-2 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] font-medium">
                  +{SHIPPING_RATES.west_malaysia.states.length - 6} more
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#00ffc6]/20">
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#c6fff0]">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <span>2-3 business days delivery</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#c6fff0]">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <span>Tracking number provided</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#c6fff0]">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <span>Ninja Van / Pos Laju / J&T</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#0b2221] rounded-lg p-6 border border-blue-400/10">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">{SHIPPING_RATES.east_malaysia.name}</h3>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-green-400">FREE</span>
              <span className="text-[#c6fff0] ml-2">all orders</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-[#c6fff0] mb-2 font-semibold">Coverage:</p>
              <div className="flex flex-wrap gap-2">
                {SHIPPING_RATES.east_malaysia.states.map((state) => (
                  <span key={state} className="text-xs px-2 py-1 rounded-full bg-blue-400/20 text-blue-400 font-medium">
                    {state}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#00ffc6]/20">
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#c6fff0]">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>4-6 business days delivery</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#c6fff0]">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Tracking number provided</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#c6fff0]">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Ninja Van / Pos Laju / J&T</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-400/30">
          <p className="text-sm text-green-300 text-center font-medium">
            🎉 <strong>FREE shipping</strong> on <strong>ALL orders</strong> across Malaysia!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export { SHIPPING_RATES };