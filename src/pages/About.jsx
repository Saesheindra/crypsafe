import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Award, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          About <span className="text-[#00ffc6]">CrypSafe</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-3xl mx-auto">
          A trusted brand of SANDRIAR ENTERPRISE — Authorized cold wallet reseller supporting Malaysian crypto users with self-custody education.
        </p>
      </motion.div>

      {/* Company Information */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-8 mb-12 border-[#00ffc6]/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-10 h-10 text-[#00ffc6]" />
          <h2 className="text-3xl font-bold text-white">Who We Are</h2>
        </div>
        <div className="space-y-4 text-[#c6fff0]">
          <p className="text-lg">
            <strong className="text-white">CrypSafe</strong> is a brand of <strong className="text-white">SANDRIAR ENTERPRISE</strong>, a registered Malaysian business (SSM Registration: 202103048249) based in Kuala Lumpur.
          </p>
          <p>
            We are an <strong className="text-[#00ffc6]">authorized reseller</strong> of cold wallets and metal seed phrase backup kits, officially verified by Tangem, OneKey, and Keystone as a trusted partner in Malaysia. We also operate as a Ledger affiliate partner.
          </p>
          <p>
            Our mission is to promote <strong className="text-white">self-custody education</strong> and provide Malaysians with access to genuine security hardware — empowering individuals to take full control of their digital assets.
          </p>
        </div>
      </motion.div>

      {/* What We Do */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          What We <span className="text-[#00ffc6]">Do</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card border-[#00ffc6]/20 hover:glow-effect transition-all">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-[#071018]" />
              </div>
              <CardTitle className="text-xl text-white">Authorized Reseller</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#c6fff0]">
                Official distributor of Tangem, OneKey, and Keystone products. All items are authentic with full manufacturer warranty and support.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-[#00ffc6]/20 hover:glow-effect transition-all">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl text-white">Self-Custody Advocacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#c6fff0]">
                We promote user-controlled security where individuals maintain full ownership. We provide educational resources on best practices.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-[#00ffc6]/20 hover:glow-effect transition-all">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl text-white">Local Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#c6fff0]">
                Based in Malaysia with local inventory, fast shipping, and support in Bahasa Malaysia & English via WhatsApp.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Official Verification */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Official <span className="text-[#00ffc6]">Verification</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#0b2221] rounded-xl p-6 border border-[#00ffc6]/20">
            <h3 className="font-bold text-xl mb-3 text-[#00ffc6]">✅ Verified Tangem Reseller</h3>
            <p className="text-[#c6fff0] text-sm mb-3">
              Listed on Tangem's official partnership page as an authorized reseller in Malaysia.
            </p>
            <a 
              href="https://tangem.com/en/partnership/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00ffc6] hover:underline text-sm"
            >
              Verify on Tangem.com →
            </a>
          </div>
          <div className="bg-[#0b2221] rounded-xl p-6 border border-green-400/20">
            <h3 className="font-bold text-xl mb-3 text-green-400">✅ Verified OneKey Reseller</h3>
            <p className="text-[#c6fff0] text-sm mb-3">
              Listed on OneKey's official reseller network as an authorized partner.
            </p>
            <a 
              href="https://help.onekey.so/en/articles/11461258-onekey-reseller-network" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:underline text-sm"
            >
              Verify on OneKey.so →
            </a>
          </div>
          <div className="bg-[#0b2221] rounded-xl p-6 border border-blue-400/20">
            <h3 className="font-bold text-xl mb-3 text-blue-400">✅ Verified Keystone Reseller</h3>
            <p className="text-[#c6fff0] text-sm mb-3">
              Listed on Keystone's official resellers page as an authorized distributor.
            </p>
            <a 
              href="https://keyst.one/resellers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-sm"
            >
              Verify on Keystone →
            </a>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-[#bfeee0]">
            <strong className="text-white">Additional Partnerships:</strong> Ledger Affiliate Partner
          </p>
        </div>
      </motion.div>

      {/* Business Details */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-8 mb-12 border-[#00ffc6]/20"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Business <span className="text-[#00ffc6]">Information</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 text-[#00ffc6] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Registered Business Name</h3>
                <p className="text-[#c6fff0]">SANDRIAR ENTERPRISE</p>
                <p className="text-sm text-[#bfeee0]">SSM Registration: 202103048249</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-[#00ffc6] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Location</h3>
                <p className="text-[#c6fff0]">Kuala Lumpur, Malaysia</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-[#00ffc6] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Phone</h3>
                <a href="tel:+601166736549" className="text-[#00ffc6] hover:underline">
                  +60 11 6673 6549
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-[#00ffc6] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Email</h3>
                <a href="mailto:crypsafe.my@gmail.com" className="text-[#00ffc6] hover:underline">
                  crypsafe.my@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="w-6 h-6 text-[#00ffc6] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">WhatsApp</h3>
                <a 
                  href="https://wa.me/601166736549" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#00ffc6] hover:underline"
                >
                  Chat with us
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center glass-card rounded-2xl p-12 glow-effect"
      >
        <h2 className="text-3xl font-bold mb-4 text-white">Have Questions?</h2>
        <p className="text-lg text-[#c6fff0] mb-8 max-w-2xl mx-auto">
          Contact us anytime for product inquiries, order support, or questions about available educational resources.
        </p>
        <a href="https://wa.me/601166736549" target="_blank" rel="noopener noreferrer">
          <Button className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-6 text-lg">
            <MessageCircle className="w-6 h-6 mr-2" />
            Chat on WhatsApp
          </Button>
        </a>
      </motion.div>
    </div>
  );
}