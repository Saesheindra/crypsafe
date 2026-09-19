import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, Zap, Users, CheckCircle, ArrowRight, TrendingUp, Bot, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import LiveCryptoPrices from "../components/home/LiveCryptoPrices";
import WhyChooseTangem from "../components/tangem/WhyChooseTangem";

const features = [
  {
    icon: Shield,
    title: "Tangem Wallets",
    description: "NFC cold wallets for everyday protection — no seed words, mobile-friendly, quick setup.",
    link: createPageUrl("Shop"),
    color: "from-[#00ffc6] to-[#00d9a8]"
  },
  {
    icon: Shield,
    title: "OneKey Wallets",
    description: "Open-source hardware wallets with multi-chain support — transparency and security combined.",
    link: createPageUrl("OneKey"),
    color: "from-green-400 to-green-600"
  },
  {
    icon: Shield,
    title: "Keystone Backup",
    description: "Durable steel seed phrase backup — fire, water, and corrosion resistant. Safeguard your recovery words.",
    link: createPageUrl("Shop"),
    color: "from-blue-400 to-blue-600"
  },
];

const steps = [
  "Buy your cold wallet from our Shop",
  "Follow included setup instructions and educational resources",
  "Take full control with self-custody best practices"
];



const exchangeRisks = [
  {
    title: "FTX Collapse (2022)",
    description: "US$8 billion lost when FTX went bankrupt. Customers couldn't withdraw their funds.",
    impact: "Billions lost"
  },
  {
    title: "Mt. Gox Hack (2014)",
    description: "850,000 BTC stolen. Users waited years for partial compensation.",
    impact: "Largest crypto hack"
  },
  {
    title: "Celsius Bankruptcy (2022)",
    description: "Froze withdrawals, leaving users unable to access their crypto.",
    impact: "User funds locked"
  },
  {
    title: "BlockFi Collapse (2022)",
    description: "Filed for bankruptcy, users lost access to their holdings.",
    impact: "Funds frozen"
  }
];

const faqItems = [
  {
    question: "What is a crypto wallet?",
    answer: "A crypto wallet is a digital tool that stores your cryptocurrency private keys - the passwords that give you access to your crypto assets. Think of it like a secure digital bank account, but you're in full control. Your wallet doesn't actually store the crypto itself (that lives on the blockchain), but it holds the keys that prove ownership and allow you to send/receive crypto."
  },
  {
    question: "How do crypto wallets work?",
    answer: "Crypto wallets work using a pair of cryptographic keys: a public key (like your account number that others can see) and a private key (like your password that only you should know). When you want to send crypto, your wallet uses your private key to sign the transaction and broadcast it to the blockchain network. The blockchain then verifies and records the transaction. Your wallet shows your balance by reading the blockchain, not by storing coins locally."
  },
  {
    question: "What are the different types of crypto wallets?",
    answer: "There are several types: 1) Hot Wallets (software wallets connected to internet) - convenient but vulnerable to hacks, includes mobile apps, desktop software, and exchange wallets. 2) Cold Wallets (hardware wallets offline) - like Tangem and OneKey, offer maximum security by keeping your keys offline. 3) Paper Wallets - physical printouts of keys (outdated and risky). 4) Custodial Wallets - where a third party (like an exchange) controls your keys. We recommend cold wallets for serious crypto holders as they provide the best security."
  },
  {
    question: "Why do I need a hardware wallet?",
    answer: "Hardware wallets (cold wallets) are essential for security. Here's why: 1) Exchange Risk - Exchanges can be hacked, go bankrupt (like FTX), or freeze your account. 2) Malware Protection - Hardware wallets keep your private keys offline, safe from computer viruses and hackers. 3) True Ownership - With 'not your keys, not your coins', hardware wallets give you complete control. 4) Long-term Security - For holding crypto long-term, cold storage is the gold standard. If you have more than RM 5,000 in crypto, a hardware wallet is highly recommended. We offer Tangem, OneKey, and Keystone products - take our Wallet Quiz to find your perfect match!"
  },
  {
    question: "How to get a crypto wallet?",
    answer: "Getting started is easy with CrypSafe: 1) Choose your wallet - We offer Tangem (card-style, NFC, no seed phrases) and OneKey (open-source, multi-chain). Take our Wallet Quiz if unsure. 2) Purchase - Buy directly from us (official Tangem & OneKey reseller). 3) Setup - Follow included manufacturer instructions for self-custody setup. 4) Backup - Consider adding Keystone steel backup to protect your seed phrase from fire/water damage."
  },
  {
    question: "What's the difference between Tangem and OneKey?",
    answer: "Tangem: Credit card size, uses NFC tap technology, no seed phrases to manage (uses backup cards instead), perfect for everyday carry and beginners. Best for: Portability, simplicity, and mobile-first users. OneKey: Open-source hardware wallet with multi-chain support, transparent and community-audited. Best for: Users who value open-source security and multi-chain support. Both are excellent - take our Wallet Quiz to find your perfect match!"
  },
  {
    question: "Do I still need a wallet if I buy crypto on exchanges?",
    answer: "YES! Keeping crypto on exchanges is risky. Remember: 'Not your keys, not your coins.' Exchanges have been hacked (Mt. Gox - 850,000 BTC stolen), gone bankrupt (FTX - $8 billion lost, Celsius, BlockFi), or frozen withdrawals. When crypto is on an exchange, you don't truly own it - the exchange does. A hardware wallet gives you complete ownership and control through self-custody."
  },
  {
    question: "What happens if I lose my hardware wallet?",
    answer: "Don't worry - your crypto is safe! For Tangem: Use your backup cards (we recommend the 3-card pack) to recover everything. No seed phrases to worry about. For other wallets: Use your 24-word recovery phrase to restore your wallet on a new device or compatible wallet. This is why we strongly recommend Keystone Steel Backup - it protects your recovery phrase from fire, water, and deterioration. As long as you have your backup, you can always recover your crypto even if the physical device is lost or destroyed."
  },
  {
    question: "How long does shipping take in Malaysia?",
    answer: "West Malaysia: RM 10 flat rate, arrives in 2-3 business days. East Malaysia: RM 20 flat rate, arrives in 4-6 business days. FREE shipping for orders above RM 500 (West Malaysia only). All shipments include tracking numbers sent via WhatsApp/email. We process orders within 1-2 business days after payment confirmation. For urgent orders, contact us on WhatsApp (+60 16 773 6549) and we'll do our best to expedite."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We offer multiple secure payment options: 1) Stripe - Credit/debit cards and FPX (direct bank transfer from any Malaysian bank). 2) Bank Transfer - Direct transfer to our business account. 3) Shopee - Shop on our official Shopee store (search: harvin5979) for Shopee wallet, cards, and buyer protection. Payment links are sent securely via WhatsApp for your safety."
  }
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#00ffc6] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Self-Custody Starts With <span className="text-[#00ffc6]">the Right Tools</span>
              </h1>
              <p className="text-lg md:text-xl text-[#c6fff0] mb-8">
                CrypSafe is an authorized reseller of Tangem, OneKey, and Keystone products. We provide cold wallets and metal seed phrase backup kits, supporting users with education on self-custody best practices.
                We promote user-controlled security, where individuals maintain full ownership of their digital assets at all times.
                CrypSafe does not access wallets, private keys, or recovery phrases and does not provide financial advice. Users make all decisions independently.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={createPageUrl("Shop")}>
                  <Button className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold px-6 py-6 text-lg glow-effect">
                    Shop Cold Wallets
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-[#bfeee0]">
                <CheckCircle className="w-5 h-5 text-[#00ffc6]" />
                <span>Authorized Tangem Reseller • Authorized OneKey Reseller • Authorized Keystone Reseller • Educational resources available • Secure checkout</span>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <div className="px-4 py-2 rounded-lg bg-[#00ffc6]/10 border border-[#00ffc6]/30 text-sm font-bold text-[#00ffc6]">
                  ✅ Verified Tangem Reseller
                </div>
                <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-400/30 text-sm font-bold text-green-400">
                  ✅ OneKey Reseller
                </div>
                <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-400/30 text-sm font-bold text-blue-400">
                  ✅ Keystone Reseller
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative space-y-6"
            >
              <LiveCryptoPrices />
              
              <ul className="mt-6 space-y-2 text-sm text-[#bfeee0] glass-card p-4 rounded-xl">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  Educational resources included with purchase
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  Self-paced learning materials
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  WhatsApp support for product questions
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Crypto Security Advisor Banner */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 glow-effect border-2 border-[#00ffc6]/30"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center flex-shrink-0">
              <Bot className="w-8 h-8 text-[#071018]" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-2xl font-bold mb-2 text-white">🤖 Not Sure Which Wallet to Choose?</h3>
              <p className="text-[#c6fff0] mb-2">
                Chat with our AI Crypto Security Advisor! Get personalized recommendations based on your needs, experience level, and holdings.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-3 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] border border-[#00ffc6]/50">
                  ✨ Personalized Advice
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] border border-[#00ffc6]/50">
                  💡 Product Comparisons
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] border border-[#00ffc6]/50">
                  🎯 Expert Recommendations
                </span>
              </div>
            </div>
            <a
              href="https://base44.app/api/apps/68f88f2cb7165a70a22ee871/agents/crypto_security_advisor/whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                <MessageCircle className="w-6 h-6 mr-2" />
                Get AI Advice on WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Why Cold Wallet Section - MOVED TO TOP PRIORITY */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-2xl p-8 md:p-12 glow-effect border-2 border-red-500/30"
        >
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-red-400">Not Your Keys, Not Your Coins</span>
            </h2>
            <p className="text-xl text-[#c6fff0] max-w-3xl mx-auto">
              Leaving crypto on exchanges means you don't truly own it. Here's why you need a cold wallet:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-400">⚠️</span> Exchange Risks
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <span className="text-red-400 font-bold">❌</span>
                  <div>
                    <p className="font-bold text-white">Exchange Hacks</p>
                    <p className="text-sm text-[#bfeee0]">Hackers target centralized exchanges with billions at stake</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <span className="text-red-400 font-bold">❌</span>
                  <div>
                    <p className="font-bold text-white">Platform Bankruptcy</p>
                    <p className="text-sm text-[#bfeee0]">Companies can collapse, freezing your funds</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <span className="text-red-400 font-bold">❌</span>
                  <div>
                    <p className="font-bold text-white">Account Freezes</p>
                    <p className="text-sm text-[#bfeee0]">Exchanges can freeze accounts without warning</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <span className="text-red-400 font-bold">❌</span>
                  <div>
                    <p className="font-bold text-white">No True Ownership</p>
                    <p className="text-sm text-[#bfeee0]">You don't control the private keys</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-[#00ffc6]">✓</span> Cold Wallet Benefits
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">True Ownership</p>
                    <p className="text-sm text-[#bfeee0]">You control your private keys = you own your crypto</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Offline Security</p>
                    <p className="text-sm text-[#bfeee0]">Designed to reduce exposure to online threats</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Reduced Platform Risk</p>
                    <p className="text-sm text-[#bfeee0]">Less dependent on exchange solvency</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">24/7 Access</p>
                    <p className="text-sm text-[#bfeee0]">Access your funds anytime, anywhere</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-red-400 text-center">⚠️ Don't Risk It: Real Exchange Failures</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {exchangeRisks.map((risk, index) => (
                <div key={index} className="bg-[#021213] rounded-lg p-4">
                  <p className="font-bold text-white mb-2">{risk.title}</p>
                  <p className="text-xs text-[#bfeee0] mb-2">{risk.description}</p>
                  <span className="text-xs font-bold text-red-400">{risk.impact}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Wallet Quiz CTA - MOVED UP */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-12 text-center glow-effect border-2 border-[#00ffc6]/30"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not Sure Which Wallet to Choose?
          </h2>
          <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto mb-8">
            Take our quick 2-minute quiz to discover which wallet is the perfect fit for your needs
          </p>
          <Link to={createPageUrl("WalletQuiz")}>
            <Button className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold px-8 py-6 text-lg glow-effect">
              Take the Wallet Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Security Disclaimer Banner */}
      <section className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.01 }}
          className="glass-card rounded-2xl p-6 border-2 border-red-500/30 glow-effect bg-red-900/10"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 text-white">🔒 Security Notice: What CrypSafe Will NEVER Do</h3>
              <ul className="space-y-2 text-[#c6fff0] text-sm mb-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong className="text-white">CrypSafe does NOT ask for private keys, seed phrases, passwords, or recovery phrases.</strong> All educational sessions focus on security best practices without requiring access to your sensitive information.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong className="text-white">We do not impersonate any crypto exchange or wallet provider.</strong> We are an independent educational service and official hardware wallet reseller.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span><strong className="text-white">Users always retain full control of their assets.</strong> CrypSafe provides educational resources on self-custody, where YOU own and control your crypto—not us.</span>
                </li>
              </ul>
              <p className="text-[#bfeee0] text-xs">
                <strong className="text-red-400">Warning:</strong> Anyone asking for your private keys, seed phrases, or passwords is a scammer. Keep them private and secure at all times.
              </p>
            </div>
          </div>
        </motion.div>
      </section>



      {/* Trust Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8 md:p-12 text-center glow-effect"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">
            Trusted by <span className="text-[#00ffc6]">Malaysian Crypto Investors</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-[#00ffc6] mb-2">Official</div>
              <p className="text-[#c6fff0]">Tangem, OneKey & Keystone Reseller</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00ffc6] mb-2">100%</div>
              <p className="text-[#c6fff0]">Authentic Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00ffc6] mb-2">24/7</div>
              <p className="text-[#c6fff0]">WhatsApp Support</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#00ffc6] mb-2">FREE</div>
              <p className="text-[#c6fff0]">Shipping &gt;RM 1000</p>
            </div>
          </div>
        </motion.div>
      </section>
      


      {/* Why Choose Tangem Section */}
      <section className="container mx-auto px-4 py-16">
        <WhyChooseTangem />
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={feature.link}>
                  <Card className="glass-card hover:glow-effect transition-all duration-300 h-full cursor-pointer group border-[#00ffc6]/20">
                    <CardContent className="p-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-[#00ffc6] transition-colors">{feature.title}</h3>
                      <p className="text-[#bfeee0] mb-4">{feature.description}</p>
                      <span className="text-[#00ffc6] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-2xl p-8 md:p-12 glow-effect"
        >
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-8 h-8 text-[#00ffc6]" />
            <h2 className="text-3xl font-bold">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center font-bold text-[#071018]">
                    {index + 1}
                  </div>
                  <p className="text-[#c6fff0] pt-2">{step}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-full w-full h-0.5 bg-gradient-to-r from-[#00ffc6] to-transparent -ml-4"></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Keystone Backup Section - Reframed as Security Add-on */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-8 md:p-12 glow-effect border-2 border-blue-500/30"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-16 h-16 text-blue-400" />
              <span className="text-4xl">+</span>
              <Shield className="w-16 h-16 text-[#00ffc6]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Your Security: <span className="text-blue-400">Keystone Steel Backup</span>
            </h2>
            <p className="text-xl text-[#c6fff0] max-w-3xl mx-auto mb-4">
              Cold wallets reduce exposure to online threats — but seed phrases still need protection. Consider steel backup as an additional security layer.
            </p>
            <div className="inline-block px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/50">
              <p className="text-sm text-blue-300">
                <strong className="text-blue-400">✅ Official Keystone Reseller</strong> — Essential security layer for ANY wallet
              </p>
            </div>
          </div>

          {/* Why You Need Both */}
          <div className="bg-blue-900/20 border-2 border-blue-500/50 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-400 text-center">⚠️ Cold Wallet + Steel Backup = Enhanced Security Approach</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-4 rounded-lg bg-[#021213]">
                <p className="text-lg font-bold mb-2 text-white">✅ Cold Wallets Aim to Reduce:</p>
                <ul className="text-sm text-[#bfeee0] space-y-1 text-left">
                  <li>• Exposure to exchange failures</li>
                  <li>• Online attack surface</li>
                  <li>• Dependency on third parties</li>
                </ul>
              </div>
              <div className="text-center p-4 rounded-lg bg-[#021213]">
                <p className="text-lg font-bold mb-2 text-white">✅ Steel Backup Aims to Address:</p>
                <ul className="text-sm text-[#bfeee0] space-y-1 text-left">
                  <li>• Physical damage to paper backups</li>
                  <li>• Environmental hazards (fire, water)</li>
                  <li>• Material degradation over time</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-[#c6fff0]">
                <strong className="text-red-400">Important:</strong> Losing your seed phrase typically means permanent loss of access to your crypto. Steel backup provides a more durable storage option than paper.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-400">🔥</span> Why Steel Over Paper?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Fire Resistant</p>
                    <p className="text-sm text-[#bfeee0]">Survives up to 1399°C — paper burns at 233°C</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Waterproof</p>
                    <p className="text-sm text-[#bfeee0]">Stainless steel won't rust or degrade in floods</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Lasts Forever</p>
                    <p className="text-sm text-[#bfeee0]">304 stainless steel — corrosion resistant for decades</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Universal Compatibility</p>
                    <p className="text-sm text-[#bfeee0]">Works with ALL crypto wallets (Tangem, OneKey, MetaMask, etc.)</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-400">📦</span> Choose Your Backup
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#021213] border-2 border-blue-400/30">
                  <h4 className="font-bold text-xl mb-2 text-white">Keystone Tablet</h4>
                  <p className="text-[#c6fff0] text-sm mb-3">Standard backup solution — only 4 letters needed per word</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-400">RM 199</span>
                    <Link to={createPageUrl("Shop")}>
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        Add to Wallet
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#021213] border-2 border-blue-400/50 glow-effect">
                  <div className="mb-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-400 text-[#071018]">
                      ⭐ MAXIMUM SECURITY
                    </span>
                  </div>
                  <h4 className="font-bold text-xl mb-2 text-white">Keystone Tablet Plus</h4>
                  <p className="text-[#c6fff0] text-sm mb-3">Premium backup — individual slot for each letter (17 screws)</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-400">RM 280</span>
                    <Link to={createPageUrl("Shop")}>
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        Add to Wallet
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Bundle Suggestion */}
                <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-400/30">
                  <p className="text-sm text-green-300 text-center">
                    <strong>💰 Pro Tip:</strong> Buy wallet + steel backup together and save with our bundle packages!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-red-400 text-center">⚠️ Real Stories: Why Steel Backup Matters</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-[#021213] rounded-lg p-4">
                <span className="text-3xl mb-2 block">🔥</span>
                <p className="text-sm text-[#bfeee0]"><strong className="text-white">House Fire:</strong> Lost paper backup, lost $50K in crypto</p>
              </div>
              <div className="bg-[#021213] rounded-lg p-4">
                <span className="text-3xl mb-2 block">🌊</span>
                <p className="text-sm text-[#bfeee0]"><strong className="text-white">Flood Damage:</strong> Ink washed away, wallet useless</p>
              </div>
              <div className="bg-[#021213] rounded-lg p-4">
                <span className="text-3xl mb-2 block">📄</span>
                <p className="text-sm text-[#bfeee0]"><strong className="text-white">Paper Fade:</strong> 5 years later, words unreadable</p>
              </div>
              <div className="bg-[#021213] rounded-lg p-4">
                <span className="text-3xl mb-2 block">🤦</span>
                <p className="text-sm text-[#bfeee0]"><strong className="text-white">Misplaced:</strong> Threw away during move, $100K gone</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* HATA Exchange Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8 md:p-12 border-2 border-[#00ffc6]/30 glow-effect"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-10 h-10 text-[#071018]" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Don't Have a Crypto Account?</h2>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-bold border border-green-500/50">
                SC-APPROVED
              </span>
            </div>
            <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto">
              Sign up with <strong className="text-[#00ffc6]">HATA</strong> — Malaysia's newest regulated exchange. Start investing in Bitcoin, Ethereum, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0b2221] rounded-xl p-6 border border-[#00ffc6]/20">
              <CheckCircle className="w-8 h-8 text-[#00ffc6] mb-3" />
              <h3 className="font-bold text-lg mb-2 text-white">Easy MYR Deposits</h3>
              <p className="text-[#bfeee0] text-sm">Deposit instantly via FPX from any Malaysian bank</p>
            </div>
            <div className="bg-[#0b2221] rounded-xl p-6 border border-[#00ffc6]/20">
              <CheckCircle className="w-8 h-8 text-[#00ffc6] mb-3" />
              <h3 className="font-bold text-lg mb-2 text-white">Low Fees & Fast</h3>
              <p className="text-[#bfeee0] text-sm">Competitive fees with instant transfer confirmations</p>
            </div>
            <div className="bg-[#0b2221] rounded-xl p-6 border border-[#00ffc6]/20">
              <CheckCircle className="w-8 h-8 text-[#00ffc6] mb-3" />
              <h3 className="font-bold text-lg mb-2 text-white">Cold Wallet Compatible</h3>
              <p className="text-[#bfeee0] text-sm">Buy crypto and transfer to your own cold wallet for self-custody</p>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="https://hata.io/signup?ref=155150"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                🚀 Sign Up with HATA
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <p className="text-sm text-[#bfeee0] mt-4">
              Start your crypto journey with a regulated Malaysian exchange
            </p>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section - NEW */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-2xl p-8 md:p-12 glow-effect border-[#00ffc6]/20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Frequently Asked <span className="text-[#00ffc6]">Questions</span>
            </h2>
            <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto">
              Everything you need to know about crypto wallets, security, and getting started with CrypSafe
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-[#0b2221] border border-[#00ffc6]/20 rounded-lg px-6 hover:border-[#00ffc6]/50 transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-bold text-white hover:text-[#00ffc6] py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#c6fff0] pb-4 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center p-6 rounded-xl bg-[#00ffc6]/10 border border-[#00ffc6]/30">
            <p className="text-[#c6fff0] mb-4">
              <strong className="text-[#00ffc6]">Still have questions?</strong> We're here to help!
            </p>
            <a href="https://wa.me/601166736549" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3">
                💬 Ask Us on WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center glass-card rounded-2xl p-12 glow-effect">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Learn Self-Custody?</h2>
          <p className="text-lg text-[#c6fff0] mb-8 max-w-2xl mx-auto">
            Join hundreds of Malaysians purchasing cold wallets and accessing self-custody educational resources.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Link to={createPageUrl("Shop")}>
              <Button className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold px-8 py-6 text-lg glow-effect">
                Buy Tangem Wallet
              </Button>
            </Link>
            <a href="https://wa.me/601166736549" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-6 text-lg">
                💬 Chat via WhatsApp
              </Button>
            </a>
          </div>
          <div className="pt-6 border-t border-[#00ffc6]/20">
            <p className="text-sm text-[#bfeee0] mb-2">
              <strong className="text-white">Contact Us:</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="mailto:crypsafe.my@gmail.com" className="text-[#00ffc6] hover:text-[#00d9a8] transition-colors">
                📧 crypsafe.my@gmail.com
              </a>
              <span className="hidden sm:inline text-[#bfeee0]">•</span>
              <a href="https://wa.me/601166736549" className="text-[#00ffc6] hover:text-[#00d9a8] transition-colors">
                💬 +60 11 6673 6549
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}