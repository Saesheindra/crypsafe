import React from "react";
import { Shield, Award, CheckCircle, Truck } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Official Reseller",
    subtitle: "Tangem Authorized",
    color: "from-[#00ffc6] to-[#00d9a8]"
  },
  {
    icon: Award,
    title: "Ledger Partner",
    subtitle: "Affiliate Program",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: CheckCircle,
    title: "100% Authentic",
    subtitle: "Warranty Included",
    color: "from-green-400 to-green-600"
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    subtitle: "2-6 Days Malaysia",
    color: "from-blue-400 to-blue-600"
  }
];

export default function TrustBadges({ compact = false }) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-3 justify-center">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card border-[#00ffc6]/20"
            >
              <Icon className="w-4 h-4 text-[#00ffc6]" />
              <div>
                <p className="text-xs font-bold text-white">{badge.title}</p>
                <p className="text-[10px] text-[#bfeee0]">{badge.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className="glass-card rounded-xl p-6 text-center hover:glow-effect transition-all border-[#00ffc6]/20"
          >
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mx-auto mb-3`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-bold text-white mb-1">{badge.title}</h4>
            <p className="text-sm text-[#bfeee0]">{badge.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}