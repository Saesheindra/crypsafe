import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, CreditCard, Banknote, MessageCircle, CheckCircle, Lock, Clock, Link as LinkIcon, Zap, Bot, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import ShippingInfo from "../components/shop/ShippingInfo";

const paymentMethods = [
  {
    icon: ShoppingBag,
    title: "Shopee Store",
    description: "Shop with buyer protection on Shopee",
    banks: ["Shopee Pay", "Credit/Debit Cards", "Online Banking", "Buyer Protection", "Verified Reviews"],
    color: "from-[#EE4D2D] to-[#d43d1f]",
    provider: "shopee"
  },
  {
    icon: CreditCard,
    title: "Stripe Payment",
    description: "Secure card and FPX payments via Stripe",
    banks: ["FPX Online Banking", "Visa & Mastercard", "International cards", "Instant confirmation"],
    color: "from-purple-400 to-purple-600",
    provider: "stripe"
  },
  {
    icon: Banknote,
    title: "Direct Bank Transfer",
    description: "Manual bank transfer (backup option)",
    banks: ["Any Malaysian bank", "We provide account details", "Send proof of payment"],
    color: "from-blue-400 to-blue-600",
    provider: "bank"
  }
];

const paymentSteps = [
  {
    number: 1,
    title: "Select Your Product",
    description: "Browse our shop or book a consultation session"
  },
  {
    number: 2,
    title: "Contact Us on WhatsApp",
    description: "Tell us what you want to purchase"
  },
  {
    number: 3,
    title: "Request Payment Link",
    description: "Choose Stripe (card/FPX) for secure checkout"
  },
  {
    number: 4,
    title: "Receive Secure Link",
    description: "We send you a secure payment link via WhatsApp"
  },
  {
    number: 5,
    title: "Complete Payment",
    description: "Pay securely through Stripe"
  },
  {
    number: 6,
    title: "Instant Confirmation",
    description: "We confirm and process your order immediately"
  }
];

const securityFeatures = [
  "Payments processed via Stripe (PCI-DSS Level 1 certified)",
  "No credit card details stored on our systems",
  "Instant payment confirmation",
  "Full refund policy for unopened products",
  "Official Tangem reseller warranty included"
];

export default function Payment() {
  const getWhatsAppLink = (provider) => {
    const baseURL = "https://wa.me/60167736549?text=";
    let message = "";
    
    if (provider === "shopee") {
      message = encodeURIComponent("Hi! I'd like to purchase from your Shopee store. Can you help me?");
    } else if (provider === "stripe") {
      message = encodeURIComponent("Hi! I'd like to request a Stripe payment link for: [Product/Service Name]\n\nPayment method: Card / FPX Online Banking");
    } else {
      message = encodeURIComponent("Hi! I'd like to make a bank transfer payment for: [Product/Service Name]");
    }
    
    return baseURL + message;
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
          <Shield className="w-12 h-12 text-[#00ffc6]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Secure <span className="text-[#00ffc6]">Payment Options</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto mb-3">
          Multiple secure payment methods via Stripe. Request a payment link through WhatsApp for instant secure checkout.
        </p>
        <p className="text-sm text-[#bfeee0]">
          <strong className="text-[#00ffc6]">For Tangem products:</strong> Direct payment through us • <strong className="text-purple-400">For Ledger products:</strong> Pay on official Ledger store
        </p>
      </motion.div>

      {/* AI Assistant Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center flex-shrink-0">
            <Bot className="w-7 h-7 text-[#071018]" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xl font-bold mb-1">Need Help with Your Purchase?</h3>
            <p className="text-[#c6fff0] text-sm">Chat with our AI assistant for instant guidance on products and payments</p>
          </div>
          <a href="https://wa.me/601166736549?text=Hi!%20I%20have%20a%20question%20about%20payment%20options." target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3">
              <Bot className="w-5 h-5 mr-2" />
              Chat with AI Assistant
            </Button>
          </a>
        </div>
      </motion.div>

      {/* Payment Methods */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Choose Your Payment Method</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {paymentMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card hover:glow-effect transition-all h-full border-[#00ffc6]/20">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 mx-auto`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-center text-white">{method.title}</CardTitle>
                    <p className="text-[#c6fff0] text-sm text-center mt-2">{method.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      {method.banks.map((bank, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-[#bfeee0]">
                          <CheckCircle className="w-4 h-4 text-[#00ffc6] flex-shrink-0" />
                          {bank}
                        </div>
                      ))}
                    </div>
                    {method.provider === "shopee" ? (
                      <a href="https://shopee.com.my/harvin5979" target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-[#EE4D2D] hover:bg-[#d43d1f] text-white font-bold">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Visit Shopee Store
                        </Button>
                      </a>
                    ) : (
                      <a href={getWhatsAppLink(method.provider)} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold">
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Request Payment Link
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Shipping Rates */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <ShippingInfo />
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-8 mb-12 glow-effect"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">How Payment Works</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {paymentSteps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center font-bold text-[#071018] text-xl mb-4">
                  {step.number}
                </div>
                <h3 className="font-bold mb-2 text-sm text-white">{step.title}</h3>
                <p className="text-xs text-[#bfeee0]">{step.description}</p>
              </div>
              {index < paymentSteps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-[#00ffc6] to-transparent -ml-4"></div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Why Secure Payment Links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-2 gap-8 mb-12"
      >
        <Card className="glass-card border-[#00ffc6]/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-8 h-8 text-[#00ffc6]" />
              <CardTitle className="text-2xl text-white">Why Payment Links?</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold mb-1 text-white">Secure & Verified</p>
                  <p className="text-sm text-[#bfeee0]">We verify your order details before sending payment links</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold mb-1 text-white">Stripe Protection</p>
                  <p className="text-sm text-[#bfeee0]">Buyer protection and dispute resolution built-in</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold mb-1 text-white">Custom Amounts</p>
                  <p className="text-sm text-[#bfeee0]">We can create bundles and custom pricing for you</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold mb-1 text-white">Instant Notifications</p>
                  <p className="text-sm text-[#bfeee0]">Both you and we get instant payment confirmation</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card border-[#00ffc6]/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-8 h-8 text-[#00ffc6]" />
              <CardTitle className="text-2xl text-white">Security Guarantee</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {securityFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  <p className="text-[#bfeee0]">{feature}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Processor Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-2xl p-8 mb-12"
      >
        <h3 className="text-2xl font-bold mb-6 text-center text-white">Trusted Payment Processor</h3>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-10 h-10 text-purple-400" />
          </div>
          <h4 className="font-bold text-xl mb-2 text-white">Stripe</h4>
          <p className="text-sm text-[#bfeee0] mb-4 max-w-2xl mx-auto">
            Industry-leading payment processor trusted by millions globally. PCI-DSS Level 1 certified for maximum security.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">FPX Banking</span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">Visa/Mastercard</span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">International</span>
          </div>
        </div>
      </motion.div>

      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-2xl p-8 mb-12 text-center"
      >
        <Clock className="w-12 h-12 text-[#00ffc6] mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-3 text-white">Quick Response Time</h3>
        <p className="text-lg text-[#c6fff0] mb-2">
          We typically send payment links within <span className="text-[#00ffc6] font-bold">15-30 minutes</span> during business hours
        </p>
        <p className="text-sm text-[#bfeee0]">
          Business Hours: Monday - Saturday, 10 AM - 8 PM MYT
        </p>
      </motion.div>

      {/* CTA */}
      <div className="text-center glass-card rounded-2xl p-12 glow-effect">
        <h2 className="text-3xl font-bold mb-4 text-white">Ready to Make a Purchase?</h2>
        <p className="text-lg text-[#c6fff0] mb-8 max-w-2xl mx-auto">
          Contact us on WhatsApp or email to get your secure payment link
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <a href={getWhatsAppLink("stripe")} target="_blank" rel="noopener noreferrer">
            <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-6 text-lg">
              <CreditCard className="w-5 h-5 mr-2" />
              Get Stripe Payment Link
            </Button>
          </a>
          <a href="https://wa.me/60167736549" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-8 py-6 text-lg font-bold">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>
        <div className="pt-6 border-t border-[#00ffc6]/20">
          <p className="text-sm text-[#bfeee0] mb-2">
            <strong className="text-white">Contact Details:</strong>
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
      </div>
    </div>
  );
}
