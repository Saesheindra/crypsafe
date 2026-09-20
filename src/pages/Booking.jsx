import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle, Shield, MessageCircle, CreditCard, ArrowRight, TrendingUp, ShoppingBag, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import WhyChooseTangem from "../components/tangem/WhyChooseTangem";

const sessionTypes = [
  {
    id: "product_bundle",
    title: "Live Consultation + Tangem Wallet",
    duration: "30 minutes",
    price: "RM 50",
    description: "Add live consultation to any Tangem wallet purchase",
    features: [
      "50% OFF - Save RM 50!",
      "Add-on with any Tangem wallet purchase",
      "Self-custody education session",
      "User-controlled setup guidance",
      "Seed phrase security education",
      "7-day educational support via WhatsApp"
    ],
    popular: true,
    badge: "BEST VALUE"
  },
  {
    id: "consultation_only",
    title: "Consultation Only",
    duration: "30 minutes",
    price: "RM 100",
    description: "Professional guidance for your existing wallet",
    features: [
      "30-minute self-custody education",
      "Cold wallet advocacy and guidance",
      "User-controlled setup education",
      "Seed phrase security best practices",
      "7-day educational support",
      "For customers with existing wallets"
    ]
  }
];

export default function Booking() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleBookingClick = (sessionType) => {
    if (sessionType === "consultation_only") {
      window.open('https://wa.me/601166736549?text=Hi!%20I%20would%20like%20to%20book%20a%20Consultation%20Only%20session%20(RM%20100).%20Please%20send%20me%20the%20payment%20link.', '_blank');
    } else {
      window.location.href = createPageUrl("Shop");
    }
  };

  const openCalendly = () => {
    window.open('https://calendly.com/harvin5979/30min', '_blank');
  };

  const openWhatsAppAgent = () => {
    window.open('https://wa.me/601166736549?text=Hi!%20I%20have%20a%20question%20about%20your%20products.', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Book a <span className="text-[#00ffc6]">1-on-1 Educational Session</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto">
          Self-custody education and cold wallet advocacy. Learn user-controlled setup in 30-minute educational sessions starting from RM 50.
        </p>
      </motion.div>

      {/* AI Agent Helper Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.02 }}
        className="glass-card rounded-2xl p-6 mb-8 border-2 border-blue-500/30 glow-effect"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xl font-bold mb-1 text-white">💬 Need Help Booking? Ask Our AI Assistant!</h3>
            <p className="text-[#c6fff0] text-sm">Get instant answers about consultation sessions, pricing, what's included, and scheduling. Available 24/7 on WhatsApp!</p>
          </div>
          <Button
            onClick={openWhatsAppAgent}
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat Now
          </Button>
        </div>
      </motion.div>

      {/* Special Offer Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass-card rounded-2xl p-6 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-7 h-7 text-[#071018]" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xl font-bold mb-1 text-white">🎁 Add Educational Session (RM 50) with Any Tangem Wallet!</h3>
            <p className="text-[#c6fff0] text-sm">Select any <strong className="text-[#00ffc6]">Tangem wallet</strong> from our shop and add a 30-minute self-custody education session for only <strong className="text-[#00ffc6]">RM 50</strong> (Regular: RM 100). Simply mention "Add Education Session" when ordering!</p>
          </div>
          <Link to={createPageUrl("Shop")}>
            <Button className="bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold px-6 py-3">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Tangem Wallets
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {sessionTypes.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <Card className={`glass-card hover:glow-effect transition-all duration-300 h-full flex flex-col ${
              session.popular 
                ? 'border-2 border-[#00ffc6] shadow-lg shadow-[#00ffc6]/20 relative' 
                : 'border border-[#00ffc6]/20'
            }`}>
              {session.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] text-[#071018] px-6 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    ⭐ {session.badge}
                  </div>
                </div>
              )}
              <CardHeader className={session.badge ? 'pt-8' : ''}>
                <CardTitle className="text-xl mb-2">{session.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-[#bfeee0]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {session.duration}
                  </span>
                  <span className="font-bold text-lg text-[#00ffc6]">
                    {session.price}
                  </span>
                  {session.id === "product_bundle" && (
                    <span className="text-xs line-through text-gray-400">RM 100</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-[#c6fff0] mb-4">{session.description}</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {session.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#bfeee0]">
                      <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  {session.id === "product_bundle" ? (
                    <Link to={createPageUrl("Shop")} className="block w-full">
                      <Button className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-6 text-base shadow-lg hover:shadow-xl transition-all group">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Shop Wallets First
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => handleBookingClick("consultation_only")}
                      className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-6 text-base shadow-lg hover:shadow-xl transition-all group"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Request Payment Link
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Calendly Embed Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-8 mb-12 border-[#00ffc6]/20"
      >
        <div className="text-center mb-6">
          <Calendar className="w-12 h-12 text-[#00ffc6] mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2 text-white">Already Paid? Book Your Session Now</h3>
          <p className="text-[#c6fff0]">Click below to schedule your consultation session</p>
        </div>
        <div className="text-center">
          <Button
            onClick={openCalendly}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-8 py-4 text-lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule on Calendly
          </Button>
        </div>
      </motion.div>

      {/* HATA Exchange Promotion */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card rounded-2xl p-6 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <div className="flex items-start gap-4">
          <div className="text-5xl">🚀</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-white">New to Crypto? Start with HATA Exchange!</h3>
            <p className="text-[#c6fff0] mb-4">
              Invest in top cryptocurrencies like Bitcoin and Ethereum with HATA - the latest regulated Exchange in Malaysia!
            </p>
            <a 
              href="https://hata.io/signup?ref=155150"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold">
                <TrendingUp className="w-5 h-5 mr-2" />
                Sign Up on HATA Exchange
              </Button>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Tangem Features Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <WhyChooseTangem compact={true} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6 mb-12 border-[#00ffc6]/20 bg-[#00ffc6]/5"
      >
        <div className="flex items-start gap-4">
          <CreditCard className="w-8 h-8 text-[#00ffc6] mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg mb-2 text-white">How It Works</h3>
            <div className="space-y-2 text-[#bfeee0]">
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00ffc6] text-[#071018] flex items-center justify-center font-bold text-sm">1</span>
                <strong>Tangem + Consultation (RM 50):</strong> Select any Tangem wallet from shop, mention "Add Consultation RM 50" when ordering
              </p>
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00ffc6] text-[#071018] flex items-center justify-center font-bold text-sm">2</span>
                <strong>Consultation Only (RM 100):</strong> Request payment link via WhatsApp for standalone consultation
              </p>
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00ffc6] text-[#071018] flex items-center justify-center font-bold text-sm">3</span>
                After payment, we send you Calendly link to book your 30-minute session
              </p>
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00ffc6] text-[#071018] flex items-center justify-center font-bold text-sm">4</span>
                Choose your preferred date and time on Calendly
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-6 mb-12 border-[#00ffc6]/20"
      >
        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-[#00ffc6] mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg mb-2 text-white">Your Security is Our Priority</h3>
            <p className="text-[#bfeee0]">
              We never ask for seed phrases or private keys. All educational sessions are conducted with full transparency and focus on security best practices.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-[#bfeee0] mb-4">Have questions before booking?</p>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/601166736549" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
            <a href="mailto:crypsafe.my@gmail.com">
              <Button variant="outline" className="border-2 border-[#00ffc6] text-[#00ffc6] hover:bg-[#00ffc6] hover:text-[#071018] px-8 py-6 text-lg font-bold">
                📧 Email Us
              </Button>
            </a>
          </div>
          <p className="text-sm text-[#bfeee0]">
            Email: <a href="mailto:crypsafe.my@gmail.com" className="text-[#00ffc6] hover:underline">crypsafe.my@gmail.com</a> • WhatsApp: +60 11 6673 6549
          </p>
        </div>
      </motion.div>
    </div>
  );
}