import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, Shield, Zap, AlertTriangle, CheckCircle, XCircle, 
  Lock, Smartphone, Eye, CreditCard, Key, Globe, Coins, TrendingUp,
  FileText, Users, Brain, Lightbulb, Target, Award, Play, BookMarked
} from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const walletComparison = {
  features: [
    "Form Factor",
    "Security Model",
    "Seed Phrase Backup",
    "Screen Verification",
    "Mobile Connectivity",
    "Price Range",
    "Best For",
    "Setup Difficulty",
    "Portability",
    "Track Record"
  ],
  tangem: {
    name: "Tangem Wallet",
    color: "from-[#00ffc6] to-[#00d9a8]",
    values: [
      "Credit card size (NFC)",
      "EAL6+ certified chip",
      "3 backup cards (no seed phrase)",
      "Phone screen only",
      "NFC tap technology",
      "RM 429",
      "Beginners, daily users, travelers",
      "Very Easy ⭐⭐⭐⭐⭐",
      "Excellent (fits in wallet)",
      "Trusted since 2018"
    ],
    pros: [
      "No seed phrases to manage or lose",
      "Ultra-portable credit card format",
      "Simple NFC tap interface",
      "Built-in portfolio tracking & staking",
      "Live market data in app",
      "3-card backup system",
      "No charging needed (passive NFC)",
      "Perfect for everyday carry"
    ],
    cons: [
      "No built-in screen verification",
      "Must trust phone for transaction display",
      "Backup cards must be stored separately",
      "Less traditional security model"
    ]
  },
  ledger: {
    name: "Ledger Wallet",
    color: "from-purple-400 to-purple-600",
    values: [
      "USB device with screen",
      "Secure Element + PIN",
      "24-word seed phrase (BIP39)",
      "Built-in OLED screen",
      "Bluetooth (Nano X) / USB",
      "RM 299 - RM 549",
      "Traditional users, high-value holders",
      "Moderate ⭐⭐⭐",
      "Good (requires USB/Bluetooth)",
      "Industry leader since 2014"
    ],
    pros: [
      "Built-in screen for transaction verification",
      "Proven track record (6M+ devices)",
      "Industry standard hardware wallet",
      "Physical button confirmation",
      "Bluetooth support (Nano X)",
      "Wide crypto support (5,500+ coins)",
      "Trusted by institutions",
      "Regular firmware updates"
    ],
    cons: [
      "Must manage 24-word seed phrase",
      "Requires USB cable or Bluetooth",
      "Bulkier than card-style wallets",
      "Needs charging (Nano X)",
      "Higher learning curve for beginners"
    ]
  },
  keystone: {
    name: "Keystone Backup",
    color: "from-blue-400 to-blue-600",
    values: [
      "Steel plate (backup only)",
      "Physical durability",
      "Works with any wallet's seed phrase",
      "N/A (not a wallet)",
      "N/A (backup device)",
      "RM 250 - RM 350",
      "Anyone with crypto wallets",
      "Easy ⭐⭐⭐⭐",
      "Requires secure storage location",
      "Proven steel backup solution"
    ],
    pros: [
      "Fire resistant (1399°C+)",
      "Water & corrosion resistant",
      "Works with ANY wallet",
      "Permanent backup solution",
      "No electronics to fail",
      "One-time investment",
      "Lasts decades",
      "Universal compatibility"
    ],
    cons: [
      "Not a wallet itself (backup only)",
      "Requires physical storage space",
      "Must be kept in secure location",
      "Additional cost to wallet purchase"
    ]
  }
};

const blockchainBasics = [
  {
    icon: Globe,
    title: "What is Blockchain?",
    content: "Blockchain is a distributed ledger technology that records transactions across multiple computers. Think of it as a digital ledger that everyone can see but no one can alter. Each 'block' contains transaction data and is cryptographically linked to the previous block, forming a 'chain.' This makes it nearly impossible to hack or manipulate."
  },
  {
    icon: Lock,
    title: "How Crypto Works",
    content: "Cryptocurrency uses public-key cryptography. You have a public address (like an account number) that anyone can see, and a private key (like a password) that only you should know. Your crypto doesn't actually live in a wallet—it lives on the blockchain. Your wallet stores the private keys that prove ownership and let you spend your crypto."
  },
  {
    icon: Shield,
    title: "Why Cold Wallets are Essential",
    content: "Cold wallets keep your private keys offline, away from internet threats. Even if hackers compromise your computer or phone, they can't access your crypto because the keys never touch the internet. Hot wallets (exchange wallets, mobile apps) are connected to the internet, making them vulnerable to hacking, malware, and platform failures like FTX or Mt. Gox."
  }
];

const seedPhraseGuide = {
  what: {
    title: "What is a Seed Phrase?",
    content: "A seed phrase (or recovery phrase) is a list of 12-24 words that serves as a master backup for your crypto wallet. These words are generated using BIP39 standard and can recreate your entire wallet, including all your private keys. If you lose your physical wallet device, you can restore everything using your seed phrase.",
    examples: [
      "Example: 'witch collapse practice feed shame open despair creek road again ice least'",
      "Each word comes from a standardized list of 2,048 possible words",
      "The order of words matters—changing the order creates a different wallet"
    ]
  },
  importance: {
    title: "Why Seed Phrases Matter",
    points: [
      "**Ultimate Backup:** Your seed phrase is the ONLY way to recover your crypto if you lose your wallet device",
      "**Complete Control:** Whoever has your seed phrase has complete access to your crypto—no exceptions",
      "**Irreversible Loss:** If you lose your seed phrase AND your wallet, your crypto is gone forever. No company can help you",
      "**Not Optional:** Most hardware wallets require seed phrase backup (except Tangem which uses backup cards)"
    ]
  },
  bestPractices: {
    title: "Seed Phrase Security Best Practices",
    dos: [
      "✅ Write it down on paper or steel (like Keystone)",
      "✅ Store in multiple secure locations (fireproof safe, safety deposit box)",
      "✅ Never share with anyone—not even customer support",
      "✅ Keep offline—never type into computer or phone",
      "✅ Verify you wrote it correctly by testing recovery",
      "✅ Consider steel backup (Keystone) for fire/water protection"
    ],
    donts: [
      "❌ Never take photos of your seed phrase",
      "❌ Never store digitally (computer, phone, cloud)",
      "❌ Never share on messaging apps or email",
      "❌ Never enter into websites claiming to 'verify' it",
      "❌ Never tell anyone you have crypto (security by obscurity)",
      "❌ Never store with your wallet device"
    ]
  }
};

const securityBestPractices = [
  {
    category: "Hardware Wallet Security",
    icon: Shield,
    practices: [
      {
        title: "Buy Direct Only",
        description: "Purchase hardware wallets only from official sources or authorized resellers (like CrypSafe). Never buy from eBay, Amazon third-party sellers, or used markets—devices could be tampered with.",
        risk: "High"
      },
      {
        title: "Verify Device Authenticity",
        description: "Check for tamper-proof seals, verify serial numbers on manufacturer's website, and ensure packaging is original. Tangem has holographic seals, Ledger has specific packaging features.",
        risk: "High"
      },
      {
        title: "Backup Immediately",
        description: "Create your backup (seed phrase or Tangem backup cards) during initial setup. Test the backup by doing a recovery before storing large amounts.",
        risk: "Critical"
      },
      {
        title: "Store Backups Securely",
        description: "Keep seed phrases/backup cards in fireproof safes, safety deposit boxes, or use steel backup plates. Store in 2-3 different physical locations.",
        risk: "Critical"
      },
      {
        title: "Keep Firmware Updated",
        description: "Update your hardware wallet's firmware through official apps only. Updates patch security vulnerabilities and add new features.",
        risk: "Medium"
      }
    ]
  },
  {
    category: "Exchange Safety",
    icon: TrendingUp,
    practices: [
      {
        title: "Don't Store on Exchanges Long-Term",
        description: "Exchanges can be hacked (Mt. Gox - 850K BTC), go bankrupt (FTX - $8B), or freeze accounts. Move crypto to your cold wallet after purchase. Remember: 'Not your keys, not your coins.'",
        risk: "Critical"
      },
      {
        title: "Use SC-Approved Exchanges Only",
        description: "In Malaysia, use only Securities Commission approved exchanges: Luno, Tokenize, MX Global, Sinegy, HATA. Avoid unlicensed platforms that could disappear with your funds.",
        risk: "High"
      },
      {
        title: "Enable 2FA",
        description: "Use Google Authenticator or hardware 2FA keys (not SMS). This adds a second layer of protection even if your password is compromised.",
        risk: "High"
      },
      {
        title: "Withdraw Small Test Amount First",
        description: "When moving crypto from exchange to wallet, send a small test transaction first (e.g., RM 10). Verify it arrives correctly before sending larger amounts.",
        risk: "Medium"
      }
    ]
  },
  {
    category: "Common Scams to Avoid",
    icon: AlertTriangle,
    practices: [
      {
        title: "Fake Support Scams",
        description: "Scammers pose as customer support on Telegram, Twitter, or Discord. They ask for seed phrases or direct you to fake websites. Real support NEVER asks for seed phrases.",
        risk: "Critical",
        example: "Example: 'Hi, I'm from Tangem support. Please verify your seed phrase at this link...'"
      },
      {
        title: "Phishing Websites",
        description: "Fake websites that look identical to real ones (e.g., tangem.com vs tangеm.com with Cyrillic 'e'). Always bookmark official sites and check URLs carefully.",
        risk: "Critical",
        example: "Example: Google search shows 'Sponsored' Ledger link that's actually a fake site stealing seed phrases"
      },
      {
        title: "Giveaway Scams",
        description: "Fake giveaways claiming 'Send 1 BTC, get 2 BTC back!' or 'Elon Musk is giving away crypto!' These are always scams. No one gives away free crypto.",
        risk: "High",
        example: "Example: Verified-looking Twitter account: 'Send ETH to this address and we'll double it!'"
      },
      {
        title: "Dusting Attacks",
        description: "Scammers send small amounts of crypto to your wallet, then track your transactions or send malicious links. Don't interact with unknown small deposits.",
        risk: "Medium",
        example: "Example: Receive 0.0001 BTC with memo: 'Claim reward at this website...'"
      },
      {
        title: "Fake Apps",
        description: "Malicious apps in app stores that steal private keys. Only download wallet apps from official websites, not by searching app stores.",
        risk: "Critical",
        example: "Example: App called 'Tangem Wallet Pro' or 'Ledger Live +' in app store—these are fake"
      }
    ]
  }
];

const advancedTopics = [
  {
    title: "Understanding Transaction Fees",
    icon: Coins,
    content: "Learn how gas fees work on different blockchains, how to optimize transaction costs, and when to make transfers for lower fees."
  },
  {
    title: "Multi-Signature Wallets",
    icon: Users,
    content: "Explore advanced security with multi-sig wallets that require multiple approvals for transactions, ideal for businesses or high-value holdings."
  },
  {
    title: "DeFi & Smart Contracts",
    icon: Brain,
    content: "Understand decentralized finance, how to use your cold wallet with DeFi protocols, and the risks of smart contract interactions."
  },
  {
    title: "Portfolio Diversification",
    icon: Target,
    content: "Learn strategies for balancing your portfolio between different cryptocurrencies, stablecoins, and traditional assets like gold."
  }
];

export default function Education() {
  const [activeComparison, setActiveComparison] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-12 h-12 text-[#00ffc6]" />
          <Brain className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Crypto Security <span className="text-[#00ffc6]">Education Hub</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-3xl mx-auto">
          Master crypto security with our comprehensive guides. From beginner basics to advanced protection strategies—everything you need to safeguard your digital assets.
        </p>
      </motion.div>

      {/* Video Tutorial Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <div className="flex items-center gap-3 mb-6">
          <Play className="w-8 h-8 text-[#00ffc6]" />
          <h2 className="text-3xl font-bold text-white">Video Tutorials</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3 text-white">Tangem Wallet Demo</h3>
            <p className="text-[#c6fff0] mb-4 text-sm">See how easy it is to use Tangem's NFC tap technology</p>
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <video className="w-full h-full object-contain" controls preload="metadata">
                <source src="https://i.imgur.com/SbZcdHi.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3 text-white">Ledger Wallet Demo</h3>
            <p className="text-[#c6fff0] mb-4 text-sm">Watch Ledger's built-in screen verification in action</p>
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <video className="w-full h-full object-contain" controls preload="metadata">
                <source src="https://i.imgur.com/fRu8W66.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Blockchain & Cold Wallet Basics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Understanding <span className="text-[#00ffc6]">Blockchain & Cold Wallets</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blockchainBasics.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="glass-card border-[#00ffc6]/20 hover:glow-effect transition-all">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#c6fff0]">{item.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* Comprehensive Wallet Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Complete <span className="text-[#00ffc6]">Wallet Comparison</span>
        </h2>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#0b2221] mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tangem">Tangem</TabsTrigger>
            <TabsTrigger value="ledger">Ledger</TabsTrigger>
            <TabsTrigger value="keystone">Keystone</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#00ffc6]/30">
                    <th className="text-left p-4 text-white">Feature</th>
                    <th className="text-left p-4 text-[#00ffc6]">Tangem</th>
                    <th className="text-left p-4 text-purple-400">Ledger</th>
                    <th className="text-left p-4 text-blue-400">Keystone</th>
                  </tr>
                </thead>
                <tbody>
                  {walletComparison.features.map((feature, index) => (
                    <tr key={index} className="border-b border-[#00ffc6]/10 hover:bg-[#0b2221] transition-colors">
                      <td className="p-4 font-bold text-white">{feature}</td>
                      <td className="p-4 text-[#c6fff0]">{walletComparison.tangem.values[index]}</td>
                      <td className="p-4 text-[#c6fff0]">{walletComparison.ledger.values[index]}</td>
                      <td className="p-4 text-[#c6fff0]">{walletComparison.keystone.values[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {Object.entries(walletComparison).filter(([key]) => key !== 'features').map(([key, wallet]) => (
            <TabsContent key={key} value={key}>
              <div className="space-y-6">
                <div className={`p-6 rounded-xl bg-gradient-to-br ${wallet.color} bg-opacity-10 border-2 border-opacity-30`}>
                  <h3 className="text-2xl font-bold mb-4 text-white">{wallet.name}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3 text-green-400">✅ Pros</h4>
                      <ul className="space-y-2">
                        {wallet.pros.map((pro, index) => (
                          <li key={index} className="flex items-start gap-2 text-[#c6fff0] text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-3 text-red-400">❌ Cons</h4>
                      <ul className="space-y-2">
                        {wallet.cons.map((con, index) => (
                          <li key={index} className="flex items-start gap-2 text-[#c6fff0] text-sm">
                            <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {key === 'tangem' && (
                  <Link to={createPageUrl("Shop")}>
                    <Button className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] text-[#071018] font-bold py-4">
                      Shop Tangem Wallets
                    </Button>
                  </Link>
                )}
                {key === 'ledger' && (
                  <Link to={createPageUrl("Ledger")}>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-4">
                      Shop Ledger Wallets
                    </Button>
                  </Link>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Seed Phrase Complete Guide */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-yellow-400/30 glow-effect"
      >
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-10 h-10 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white">
            Complete Guide to <span className="text-yellow-400">Seed Phrases</span>
          </h2>
        </div>

        <div className="space-y-8">
          {/* What is a Seed Phrase */}
          <div className="bg-[#0b2221] rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">{seedPhraseGuide.what.title}</h3>
            <p className="text-[#c6fff0] mb-4">{seedPhraseGuide.what.content}</p>
            <div className="bg-yellow-900/20 border border-yellow-400/30 rounded-lg p-4">
              <ul className="space-y-2">
                {seedPhraseGuide.what.examples.map((example, index) => (
                  <li key={index} className="text-[#c6fff0] text-sm">{example}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-red-400">{seedPhraseGuide.importance.title}</h3>
            <ul className="space-y-3">
              {seedPhraseGuide.importance.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-[#c6fff0]" dangerouslySetInnerHTML={{ __html: point }} />
                </li>
              ))}
            </ul>
          </div>

          {/* Best Practices */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-900/20 border-2 border-green-500/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-green-400">✅ DO</h3>
              <ul className="space-y-2">
                {seedPhraseGuide.bestPractices.dos.map((item, index) => (
                  <li key={index} className="text-[#c6fff0] text-sm">{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-red-400">❌ DON'T</h3>
              <ul className="space-y-2">
                {seedPhraseGuide.bestPractices.donts.map((item, index) => (
                  <li key={index} className="text-[#c6fff0] text-sm">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Keystone Backup CTA */}
          <div className="bg-blue-900/20 border-2 border-blue-500/50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-10 h-10 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2 text-blue-400">Protect Your Seed Phrase with Steel</h4>
                <p className="text-[#c6fff0] mb-4">
                  Paper backups can burn, fade, or be damaged by water. <strong className="text-white">Keystone Steel Backup</strong> survives fire (1399°C+), water, and lasts decades. The ultimate insurance for your crypto recovery.
                </p>
                <Link to={createPageUrl("Shop")}>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold">
                    Shop Keystone Backup
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security Best Practices */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Security <span className="text-[#00ffc6]">Best Practices</span>
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {securityBestPractices.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <div key={sectionIndex}>
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                  <Icon className="w-8 h-8 text-[#00ffc6]" />
                  {section.category}
                </h3>
                {section.practices.map((practice, practiceIndex) => (
                  <AccordionItem 
                    key={practiceIndex} 
                    value={`${sectionIndex}-${practiceIndex}`}
                    className="glass-card border border-[#00ffc6]/20 rounded-lg px-6 mb-2"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-center gap-3 w-full">
                        <span className="text-white font-bold">{practice.title}</span>
                        <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                          practice.risk === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                          practice.risk === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' :
                          'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                        }`}>
                          {practice.risk} Risk
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#c6fff0] pt-4">
                      <p className="mb-2">{practice.description}</p>
                      {practice.example && (
                        <div className="mt-3 p-3 rounded-lg bg-red-900/20 border border-red-500/30">
                          <p className="text-sm text-red-300"><strong>⚠️ {practice.example}</strong></p>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            );
          })}
        </Accordion>
      </motion.div>

      {/* Advanced Topics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Advanced <span className="text-[#00ffc6]">Topics</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {advancedTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <Card key={index} className="glass-card border-[#00ffc6]/20 hover:glow-effect transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{topic.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#c6fff0]">{topic.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card rounded-2xl p-12 text-center glow-effect border-2 border-[#00ffc6]/30"
      >
        <Award className="w-16 h-16 text-[#00ffc6] mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-white">
          Ready to Secure Your <span className="text-[#00ffc6]">Crypto?</span>
        </h2>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto mb-8">
          Now that you understand crypto security, take the next step. Purchase a hardware wallet and access our educational resources.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <Link to={createPageUrl("Shop")}>
            <Button className="bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] text-[#071018] font-bold px-8 py-4 text-lg">
              Shop Wallets
            </Button>
          </Link>

          <Link to={createPageUrl("WalletQuiz")}>
            <Button variant="outline" className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg font-bold">
              Take Wallet Quiz
            </Button>
          </Link>
        </div>
        <div className="pt-6 border-t border-[#00ffc6]/20">
          <p className="text-sm text-[#bfeee0] mb-2">
            <strong className="text-white">Need Help?</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:crypsafe.my@gmail.com" className="text-[#00ffc6] hover:text-[#00d9a8] transition-colors">
              📧 crypsafe.my@gmail.com
            </a>
            <span className="hidden sm:inline text-[#bfeee0]">•</span>
            <a href="https://wa.me/60167736549" className="text-[#00ffc6] hover:text-[#00d9a8] transition-colors">
              💬 +60 16 773 6549
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}