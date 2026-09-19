import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Contact <span className="text-[#00ffc6]">Us</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-3xl mx-auto">
          Need help? Have questions about our products? Contact us for product inquiries, order support, and information about available educational resources.
        </p>
      </motion.div>

      {/* Primary Contact Methods */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-2 border-[#25D366]/30 hover:glow-effect transition-all h-full">
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-[#25D366] flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">WhatsApp (Recommended)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#c6fff0]">
                Get instant responses on WhatsApp. Our fastest and most convenient support channel.
              </p>
              <a href="https://wa.me/601166736549" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-6">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start WhatsApp Chat
                </Button>
              </a>
              <p className="text-sm text-[#bfeee0]">
                <strong>Phone Number:</strong> +60 11 6673 6549
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-2 border-[#00ffc6]/30 hover:glow-effect transition-all h-full">
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-[#071018]" />
              </div>
              <CardTitle className="text-2xl text-white">Email Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#c6fff0]">
                Send us detailed inquiries via email. We typically respond within 24 hours.
              </p>
              <a href="mailto:crypsafe.my@gmail.com">
                <Button className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-6">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </Button>
              </a>
              <p className="text-sm text-[#bfeee0]">
                <strong>Email:</strong> crypsafe.my@gmail.com
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Business Information */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-8 mb-12 border-[#00ffc6]/20"
      >
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          Business <span className="text-[#00ffc6]">Details</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-[#00ffc6] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2">Company Name</h3>
                <p className="text-[#c6fff0]">SANDRIAR ENTERPRISE</p>
                <p className="text-sm text-[#bfeee0] mt-1">
                  Brand: CrypSafe<br />
                  SSM Registration: 202103048249
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#00ffc6] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2">Location</h3>
                <p className="text-[#c6fff0]">
                  Based in Kuala Lumpur, Malaysia<br />
                  Shipping nationwide (West & East Malaysia)
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#00ffc6] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2">Contact Numbers</h3>
                <p className="text-[#c6fff0]">
                  WhatsApp/Phone: <a href="tel:+601166736549" className="text-[#00ffc6] hover:underline">+60 11 6673 6549</a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-[#00ffc6] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2">Response Time</h3>
                <p className="text-[#c6fff0]">
                  WhatsApp: Usually within 1-2 hours<br />
                  Email: Within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* What We Can Help With */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          How We Can <span className="text-[#00ffc6]">Help</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card border-[#00ffc6]/20">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3 text-white">📦 Product Inquiries</h3>
              <ul className="space-y-2 text-sm text-[#c6fff0]">
                <li>• Product specifications</li>
                <li>• Stock availability</li>
                <li>• Pricing information</li>
                <li>• Bulk orders</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="glass-card border-[#00ffc6]/20">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3 text-white">🚚 Order Support</h3>
              <ul className="space-y-2 text-sm text-[#c6fff0]">
                <li>• Order status tracking</li>
                <li>• Shipping information</li>
                <li>• Payment assistance</li>
                <li>• Returns & refunds</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="glass-card border-[#00ffc6]/20">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3 text-white">💡 General Support</h3>
              <ul className="space-y-2 text-sm text-[#c6fff0]">
                <li>• Product recommendations</li>
                <li>• Educational resources</li>
                <li>• Warranty information</li>
                <li>• Technical questions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-8 border-[#00ffc6]/20"
      >
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Additional <span className="text-[#00ffc6]">Resources</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-center">
          <div>
            <h3 className="font-bold text-white mb-3">🛍️ Shop on Shopee</h3>
            <p className="text-sm text-[#c6fff0] mb-3">
              Prefer using Shopee? Find us there too!
            </p>
            <a 
              href="https://shopee.com.my/harvin5979" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-[#EE4D2D] text-[#EE4D2D] hover:bg-[#EE4D2D] hover:text-white">
                Visit Shopee Store
              </Button>
            </a>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">📚 Education Center</h3>
            <p className="text-sm text-[#c6fff0] mb-3">
              Learn about cold wallets and self-custody
            </p>
            <a href="/Education">
              <Button variant="outline" className="border-[#00ffc6] text-[#00ffc6] hover:bg-[#00ffc6] hover:text-[#071018]">
                Visit Education Hub
              </Button>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}