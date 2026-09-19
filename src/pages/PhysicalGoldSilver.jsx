import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, TrendingUp, Shield, CheckCircle, Copy, BookOpen, Gift, Award, Gem } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const metalBenefits = [
  "Tangible assets with intrinsic value",
  "Hedge against inflation & currency devaluation",
  "Portfolio diversification from crypto and stocks",
  "Physical delivery or vault storage options",
  "Shariah-compliant investment options",
  "5000+ years of proven value preservation",
  "Global recognition and liquidity",
  "Protection during economic uncertainty"
];

const learningTopics = [
  {
    icon: BookOpen,
    title: "Understanding Precious Metals",
    description: "Learn about gold and silver as asset classes, their historical performance, and why they're considered safe havens."
  },
  {
    icon: TrendingUp,
    title: "Malaysian Precious Metals Market",
    description: "Explore the Malaysian market, pricing mechanisms, and trusted platforms like Public Gold for secure investments."
  },
  {
    icon: Shield,
    title: "Storage & Security",
    description: "Understand storage options from home safes to professional vault services, insurance, and security best practices."
  }
];

const goldVsSilver = {
  gold: [
    "Higher value density - easier to store large amounts",
    "More stable pricing with lower volatility",
    "Traditional store of wealth for millennia",
    "Better for long-term wealth preservation",
    "Lower storage costs relative to value",
    "Preferred by central banks worldwide"
  ],
  silver: [
    "More affordable entry point for beginners",
    "Industrial demand drives additional value",
    "Higher growth potential during bull markets",
    "Used in solar panels, electronics, medical",
    "More accessible for regular accumulation",
    "Gold-to-silver ratio offers trading opportunities"
  ]
};

export default function PhysicalGoldSilver() {
  const dealerCode = "YOUR_DEALER_CODE";
  const [copied, setCopied] = useState(false);

  const copyDealerCode = () => {
    navigator.clipboard.writeText(dealerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Coins className="w-12 h-12 text-yellow-400" />
          <Gem className="w-10 h-10 text-gray-300" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Physical <span className="text-yellow-400">Gold & Silver</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-3xl mx-auto">
          Learn about diversifying your wealth with physical gold and silver. Combine crypto security with traditional precious metals for balanced, resilient protection.
        </p>
      </motion.div>

      {/* ... keep existing code (all other sections remain the same) ... */}
    </div>
  );
}