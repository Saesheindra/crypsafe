import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Smartphone, Zap, TrendingUp, CheckCircle, CreditCard, Globe, BarChart3, Coins } from "lucide-react";
import { motion } from "framer-motion";

const tangemFeatures = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Military-grade chip technology protects your crypto 24/7, even when your phone is compromised",
    color: "from-red-400 to-red-600"
  },
  {
    icon: Smartphone,
    title: "NFC Tap & Go",
    description: "Simply tap your card to your phone to access your wallet - no cables, no complexity",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Zap,
    title: "No Seed Phrases",
    description: "Revolutionary backup system - no need to write down or remember complex seed phrases",
    color: "from-yellow-400 to-yellow-600"
  },
  {
    icon: TrendingUp,
    title: "Live Portfolio Value",
    description: "Monitor your portfolio value in real-time with built-in live tracking directly in the Tangem App",
    color: "from-green-400 to-green-600",
    highlight: true
  },
  {
    icon: BarChart3,
    title: "Live Market Data & Insights",
    description: "Access real-time market data, price charts, and comprehensive token information - everything you need to know about your crypto",
    color: "from-blue-500 to-cyan-500",
    highlight: true
  },
  {
    icon: Coins,
    title: "Built-in Staking",
    description: "Stake your crypto directly from the Tangem App - no need for exchanges. Earn passive income while maintaining full custody",
    color: "from-orange-400 to-yellow-500",
    highlight: true
  },
  {
    icon: CreditCard,
    title: "Credit Card Size",
    description: "Fits perfectly in your wallet - take your crypto anywhere without bulk",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Globe,
    title: "Multi-Chain Support",
    description: "Support for Bitcoin, Ethereum, Solana, XRP, and 6000+ tokens across multiple blockchains",
    color: "from-[#00ffc6] to-[#00d9a8]"
  }
];

export default function WhyChooseTangem({ compact = false }) {
  if (compact) {
    return (
      <div className="glass-card rounded-2xl p-6 border-[#00ffc6]/20">
        <h3 className="text-2xl font-bold mb-6 text-center text-white">
          Why Choose <span className="text-[#00ffc6]">Tangem?</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {tangemFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-3 p-4 rounded-lg bg-[#0b2221] ${
                  feature.highlight ? 'border-2 border-[#00ffc6] glow-effect' : 'border border-[#00ffc6]/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-white">{feature.title}</h4>
                  <p className="text-sm text-[#bfeee0]">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Why Choose <span className="text-[#00ffc6]">Tangem?</span>
        </h2>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto">
          The world's most user-friendly cold wallet with advanced features for both beginners and experts
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tangemFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`glass-card h-full hover:glow-effect transition-all duration-300 ${
                feature.highlight 
                  ? 'border-2 border-[#00ffc6] shadow-lg shadow-[#00ffc6]/20' 
                  : 'border-[#00ffc6]/20'
              }`}>
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {feature.highlight && (
                    <div className="mb-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00ffc6] text-[#071018]">
                        ⭐ NEW FEATURE
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-[#c6fff0]">{feature.description}</p>
                  {feature.highlight && feature.title === "Live Portfolio Value" && (
                    <div className="mt-4 p-3 rounded-lg bg-[#00ffc6]/10 border border-[#00ffc6]/30">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          Real-time portfolio value tracking
                        </li>
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          Live price updates for all assets
                        </li>
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          Track gains and losses per asset
                        </li>
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          Historical performance charts
                        </li>
                      </ul>
                    </div>
                  )}
                  {feature.highlight && feature.title === "Live Market Data & Insights" && (
                    <div className="mt-4 p-3 rounded-lg bg-[#00ffc6]/10 border border-[#00ffc6]/30">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          Live price charts and market trends
                        </li>
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          Comprehensive token information
                        </li>
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          Market cap, volume, and supply data
                        </li>
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          All you need to know about each token
                        </li>
                      </ul>
                    </div>
                  )}
                  {feature.highlight && feature.title === "Built-in Staking" && (
                    <div className="mt-4 p-3 rounded-lg bg-[#00ffc6]/10 border border-[#00ffc6]/30">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          Stake directly from your wallet
                        </li>
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          No need to keep funds on exchanges
                        </li>
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          Earn passive income securely
                        </li>
                        <li className="flex items-start gap-2 text-[#c6fff0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                          Full custody while staking
                        </li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}