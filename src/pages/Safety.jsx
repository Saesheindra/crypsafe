import React from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, XCircle, CheckCircle, Lock, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const neverDo = [
  {
    icon: XCircle,
    title: "Ask for your seed phrase or private keys",
    description: "Your seed phrase is the master key to your wallet. CrypSafe will NEVER ask for it under any circumstances—not for setup, support, or verification."
  },
  {
    icon: XCircle,
    title: "Ask you to connect your wallet",
    description: "We do not need access to your wallet. All our products are self-custody devices that you control entirely."
  },
  {
    icon: XCircle,
    title: "Ask you to transfer cryptocurrency",
    description: "CrypSafe does not handle, store, or transfer cryptocurrency. We only sell hardware security products."
  },
  {
    icon: XCircle,
    title: "Provide wallet recovery services",
    description: "We cannot recover lost seed phrases or access locked wallets. Recovery is only possible through your own backup (seed phrase or Tangem backup cards)."
  }
];

const scamWarnings = [
  {
    title: "Fake Support Impersonation",
    description: "Scammers may impersonate CrypSafe staff on social media, email, or messaging apps asking for sensitive information.",
    action: "Always verify through our official channels only"
  },
  {
    title: "Phishing Websites",
    description: "Fake websites copying our design to steal your information or cryptocurrency.",
    action: "Bookmark our official website and check URLs carefully"
  },
  {
    title: "Social Media Scams",
    description: "Fake accounts claiming to be CrypSafe offering giveaways or requesting payments.",
    action: "Follow only our verified official accounts"
  }
];

export default function Safety() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          🔐 Anti-Phishing & <span className="text-red-400">User Safety Notice</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-3xl mx-auto">
          Protect yourself from scams and phishing attempts. Learn what CrypSafe will NEVER ask you to do.
        </p>
      </motion.div>

      {/* Critical Warning Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <Alert className="bg-red-900/30 border-2 border-red-500 p-6">
          <AlertTriangle className="h-6 w-6 text-red-400" />
          <AlertDescription className="ml-8 text-white">
            <p className="text-lg font-bold mb-2">⚠️ CRITICAL SECURITY WARNING</p>
            <p className="text-[#c6fff0]">
              Anyone asking for your <strong className="text-red-400">seed phrase, private keys, or asking you to transfer cryptocurrency</strong> is a scammer—even if they claim to be from CrypSafe, Tangem, Ledger, or any crypto company. <strong className="text-white">NEVER share this information with anyone.</strong>
            </p>
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* What CrypSafe Will NEVER Do */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-red-500/30 glow-effect"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          CrypSafe Will <span className="text-red-400">NEVER</span> Do This
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {neverDo.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card className="glass-card border-2 border-red-500/30 h-full hover:border-red-500/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                        <p className="text-[#c6fff0] text-sm">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* What CrypSafe Actually Does */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-green-500/30 glow-effect"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          What CrypSafe <span className="text-green-400">Actually Does</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card border-green-500/30">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-white">Authorized Product Reseller</h3>
              <p className="text-[#c6fff0] text-sm">
                We sell genuine hardware wallets (Tangem, Ledger) and metal seed phrase backup kits (Keystone) as an official authorized reseller.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-green-500/30">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-white">Educational Resources</h3>
              <p className="text-[#c6fff0] text-sm">
                We provide general educational content about self-custody concepts, wallet setup guides, and security best practices.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-green-500/30">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-white">Zero Access Policy</h3>
              <p className="text-[#c6fff0] text-sm">
                CrypSafe never asks for, stores, or has access to private keys, seed phrases, or crypto assets. You retain full control.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Non-Custodial Notice */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            <span className="text-[#00ffc6]">Non-Custodial</span> Products Only
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-[#c6fff0]">
            <p className="text-lg">
              <strong className="text-white">All products sold are non-custodial hardware devices.</strong>
            </p>
            <p>
              This means <strong className="text-[#00ffc6]">you—and only you</strong>—control your private keys and cryptocurrency. CrypSafe cannot access, move, freeze, or recover your assets. This is by design for maximum security.
            </p>
            <p className="text-sm">
              <strong className="text-white">What this means for you:</strong> You have complete ownership and responsibility. If you lose your backup (seed phrase or Tangem backup cards), your cryptocurrency cannot be recovered by anyone—including CrypSafe, the wallet manufacturer, or any third party.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Common Scam Tactics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-yellow-400/30 glow-effect"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Common <span className="text-yellow-400">Scam Tactics</span> to Avoid
        </h2>
        <div className="space-y-4">
          {scamWarnings.map((warning, index) => (
            <div key={index} className="bg-[#0b2221] rounded-lg p-6 border border-yellow-400/30">
              <h3 className="font-bold text-xl mb-2 text-yellow-400">⚠️ {warning.title}</h3>
              <p className="text-[#c6fff0] mb-3">{warning.description}</p>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <p className="text-sm text-green-300"><strong>Protection:</strong> {warning.action}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* How to Verify It's Really Us */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          How to <span className="text-[#00ffc6]">Verify It's Really Us</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-[#0b2221] rounded-xl p-6 border border-[#00ffc6]/30">
            <h3 className="font-bold text-xl mb-4 text-[#00ffc6]">✅ Official Contact Channels</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">WhatsApp/Phone</p>
                  <a href="tel:+601166736549" className="text-[#00ffc6] hover:underline text-sm">
                    +60 11 6673 6549
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Email</p>
                  <a href="mailto:crypsafe.my@gmail.com" className="text-[#00ffc6] hover:underline text-sm">
                    crypsafe.my@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Business</p>
                  <p className="text-[#c6fff0] text-sm">SANDRIAR ENTERPRISE</p>
                  <p className="text-[#bfeee0] text-xs">SSM: 202103048249</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0b2221] rounded-xl p-6 border border-red-500/30">
            <h3 className="font-bold text-xl mb-4 text-red-400">❌ If Someone Contacts You...</h3>
            <ul className="space-y-3 text-sm text-[#c6fff0]">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Asking for seed phrases = SCAM
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Asking to connect wallet = SCAM
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Asking to send crypto = SCAM
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Claiming to recover lost wallets = SCAM
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                Urgent action required = SCAM
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50">
              <p className="text-sm text-red-300 font-bold">
                🚨 When in doubt, contact us directly through our official channels above to verify.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Our Business Model */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Our <span className="text-[#00ffc6]">Business Model</span>
        </h2>
        <div className="max-w-3xl mx-auto space-y-4 text-[#c6fff0]">
          <p className="text-lg text-center mb-6">
            <strong className="text-white">CrypSafe is an official reseller of hardware wallets and metal seed phrase storage products.</strong>
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#0b2221] rounded-lg p-4 border border-[#00ffc6]/20 text-center">
              <p className="text-sm font-bold text-white mb-2">We Sell</p>
              <p className="text-xs text-[#c6fff0]">Physical security hardware (Tangem, Ledger, Keystone)</p>
            </div>
            <div className="bg-[#0b2221] rounded-lg p-4 border border-[#00ffc6]/20 text-center">
              <p className="text-sm font-bold text-white mb-2">We Educate</p>
              <p className="text-xs text-[#c6fff0]">General self-custody best practices and setup guides</p>
            </div>
            <div className="bg-[#0b2221] rounded-lg p-4 border border-[#00ffc6]/20 text-center">
              <p className="text-sm font-bold text-white mb-2">We Support</p>
              <p className="text-xs text-[#c6fff0]">Product questions and order assistance</p>
            </div>
          </div>
          <div className="mt-6 p-6 rounded-xl bg-green-900/20 border-2 border-green-500/50">
            <p className="text-center text-lg">
              <CheckCircle className="w-6 h-6 text-green-400 inline mr-2" />
              <strong className="text-green-400">Users retain full control of their digital assets at all times.</strong>
            </p>
            <p className="text-center text-sm text-[#c6fff0] mt-3">
              CrypSafe never asks for, stores, or has access to private keys, seed phrases, or recovery phrases. We do not provide financial advice. Users make all decisions independently.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Report Suspicious Activity */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-card rounded-2xl p-12 text-center border-2 border-[#00ffc6]/30 glow-effect"
      >
        <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-white">
          Encountered a <span className="text-red-400">Scam or Phishing Attempt?</span>
        </h2>
        <p className="text-lg text-[#c6fff0] mb-8 max-w-2xl mx-auto">
          If someone is impersonating CrypSafe or asking for sensitive information, contact us immediately through our official channels.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://wa.me/601166736549" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-6 text-lg">
              🚨 Report via WhatsApp
            </Button>
          </a>
          <a href="mailto:crypsafe.my@gmail.com">
            <Button variant="outline" className="border-2 border-[#00ffc6] text-[#00ffc6] hover:bg-[#00ffc6] hover:text-[#071018] px-8 py-6 text-lg font-bold">
              📧 Report via Email
            </Button>
          </a>
        </div>
      </motion.div>

      {/* Remember */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-red-900/30 border-2 border-red-500 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold mb-4 text-red-400">🔒 Remember</h3>
        <p className="text-lg text-white max-w-2xl mx-auto">
          <strong>Your seed phrase = your money.</strong> Anyone asking for it is trying to steal from you. CrypSafe, Tangem, Ledger, and legitimate companies will NEVER ask for this information.
        </p>
      </motion.div>
    </div>
  );
}