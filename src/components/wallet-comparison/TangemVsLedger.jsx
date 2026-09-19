import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, X, Shield, Smartphone, Zap, CreditCard, Bluetooth, Battery } from "lucide-react";
import { motion } from "framer-motion";

const comparisonFeatures = [
  {
    feature: "Form Factor",
    tangem: { value: "Credit card size", icon: CreditCard, available: true },
    ledger: { value: "USB device", icon: Shield, available: true }
  },
  {
    feature: "Connection",
    tangem: { value: "NFC tap (no cables)", icon: Smartphone, available: true },
    ledger: { value: "USB-C / Bluetooth", icon: Bluetooth, available: true }
  },
  {
    feature: "Seed Phrase",
    tangem: { value: "No seed phrase needed", icon: Zap, available: true },
    ledger: { value: "24-word recovery phrase", icon: Shield, available: true }
  },
  {
    feature: "Battery",
    tangem: { value: "No battery (NFC powered)", icon: Battery, available: true },
    ledger: { value: "Rechargeable battery", icon: Battery, available: true }
  },
  {
    feature: "Screen",
    tangem: { value: "Uses phone screen", icon: Smartphone, available: true },
    ledger: { value: "Built-in screen", icon: Shield, available: true }
  },
  {
    feature: "Price Range",
    tangem: { value: "RM 350 - 800", icon: CreditCard, available: true },
    ledger: { value: "RM 349 - 1,599", icon: CreditCard, available: true }
  }
];

export default function TangemVsLedger() {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Tangem vs Ledger: <span className="text-[#00ffc6]">Which One?</span>
        </h2>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto">
          Both are excellent cold wallets. Choose based on your preference.
        </p>
      </motion.div>

      <Card className="glass-card border-[#00ffc6]/20">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#00ffc6]/20">
                  <th className="text-left p-4 text-white font-bold">Feature</th>
                  <th className="text-center p-4 text-[#00ffc6] font-bold">Tangem</th>
                  <th className="text-center p-4 text-purple-400 font-bold">Ledger</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-[#00ffc6]/10 hover:bg-[#0b2221] transition-colors"
                  >
                    <td className="p-4 text-[#c6fff0] font-medium">{item.feature}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#00ffc6]" />
                        <span className="text-[#bfeee0] text-sm">{item.tangem.value}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-400" />
                        <span className="text-[#bfeee0] text-sm">{item.ledger.value}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-[#00ffc6]/10 rounded-lg p-6 border border-[#00ffc6]/30">
              <h4 className="font-bold text-lg mb-3 text-[#00ffc6]">Choose Tangem if you want:</h4>
              <ul className="space-y-2 text-sm text-[#c6fff0]">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <span>Ultra-portable credit card design</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <span>No cables, just NFC tap</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <span>No seed phrase to manage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <span>Never needs charging</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-500/10 rounded-lg p-6 border border-purple-400/30">
              <h4 className="font-bold text-lg mb-3 text-purple-400">Choose Ledger if you want:</h4>
              <ul className="space-y-2 text-sm text-[#c6fff0]">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Built-in screen for verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Bluetooth mobile connectivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Traditional hardware wallet design</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>More established brand (since 2014)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}