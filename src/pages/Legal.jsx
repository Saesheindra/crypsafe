
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, Package, CreditCard, AlertCircle, Cookie } from "lucide-react";

const legalSections = [
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: Shield,
    content: {
      lastUpdated: "January 2025",
      sections: [
        {
          title: "Information We Collect",
          content: [
            "Personal information (name, email, phone number) when you book consultations or make purchases",
            "Payment information processed securely through Stripe and Coinbase Commerce",
            "Communication records from WhatsApp and email interactions",
            "Device and browser information for website functionality"
          ]
        },
        {
          title: "How We Use Your Information",
          content: [
            "Process orders and deliver products/services",
            "Provide customer support and consultation services",
            "Send booking confirmations and updates",
            "Improve our services and user experience",
            "Comply with legal obligations"
          ]
        },
        {
          title: "Data Protection",
          content: [
            "We use industry-standard encryption for all data transmission",
            "Payment information is processed by PCI-DSS compliant providers (Stripe, Coinbase Commerce)",
            "We never store credit card information on our servers",
            "Your data is stored securely and only accessible to authorized personnel"
          ]
        },
        {
          title: "Your Rights",
          content: [
            "Access your personal data",
            "Request correction of inaccurate data",
            "Request deletion of your data (subject to legal requirements)",
            "Opt-out of marketing communications",
            "Contact us at +60 16 773 6549 for any privacy concerns"
          ]
        }
      ]
    }
  },
  {
    id: "terms",
    title: "Terms of Service",
    icon: FileText,
    content: {
      lastUpdated: "January 2025",
      sections: [
        {
          title: "Acceptance of Terms",
          content: [
            "By accessing CrypSafe services, you agree to these terms",
            "We reserve the right to modify terms at any time",
            "Continued use after changes constitutes acceptance"
          ]
        },
        {
          title: "Services Provided",
          content: [
            "Sale of Tangem hardware wallets and accessories",
            "Cryptocurrency transfer consultation services",
            "Public Gold dealer services",
            "Educational resources on crypto security"
          ]
        },
        {
          title: "User Responsibilities",
          content: [
            "Provide accurate information for orders and bookings",
            "Keep your Tangem wallet and recovery phrases secure",
            "Follow guidance provided during consultations",
            "Do not share sensitive information (seed phrases, private keys) with anyone",
            "Verify all transaction details before confirming transfers"
          ]
        },
        {
          title: "Prohibited Activities",
          content: [
            "Using services for illegal activities",
            "Attempting to manipulate or hack our systems",
            "Sharing login credentials",
            "Misrepresenting yourself or your intentions"
          ]
        }
      ]
    }
  },
  {
    id: "warranty",
    title: "Warranty & Returns",
    icon: Package,
    content: {
      lastUpdated: "January 2025",
      sections: [
        {
          title: "Limited Warranty (Tangem Wallets)",
          content: [
            "Tangem wallets come with manufacturer's 25-year warranty",
            "Covers manufacturing defects and card malfunctions",
            "Does not cover physical damage, water damage, or misuse",
            "Warranty claim must be initiated through official Tangem channels",
            "We assist with warranty claims as an authorized reseller"
          ]
        },
        {
          title: "Return Policy",
          content: [
            "Returns accepted within 14 days of delivery",
            "Products must be unopened and in original packaging",
            "Used or opened products cannot be returned due to security reasons",
            "Shipping costs are non-refundable unless product is defective",
            "Contact us at +60 16 773 6549 to initiate a return"
          ]
        },
        {
          title: "Refund Process",
          content: [
            "Approved returns processed within 5-7 business days",
            "Refunds issued to original payment method",
            "Stripe payments: 5-10 business days to reflect in account",
            "Crypto payments: Refunded to original wallet address",
            "Consultation fees are non-refundable after session is booked"
          ]
        },
        {
          title: "Defective Products",
          content: [
            "Contact us immediately if you receive a defective product",
            "We provide replacement or full refund for defective items",
            "Return shipping for defective products is covered by us",
            "Proof of defect may be required (photos/videos)"
          ]
        }
      ]
    }
  },
  {
    id: "shipping",
    title: "Shipping Policy",
    icon: Package,
    content: {
      lastUpdated: "January 2025",
      sections: [
        {
          title: "Shipping Rates",
          content: [
            "West Malaysia: RM 10 flat rate (2-3 business days)",
            "East Malaysia: RM 20 flat rate (4-6 business days)",
            "FREE shipping for orders above RM 1000 (West Malaysia only)",
            "All shipments include tracking numbers"
          ]
        },
        {
          title: "Processing Time",
          content: [
            "Orders processed within 1-2 business days after payment confirmation",
            "You will receive tracking information via WhatsApp/email",
            "Business days: Monday - Friday (excluding public holidays)"
          ]
        },
        {
          title: "Delivery",
          content: [
            "Delivery to provided address only",
            "Signature may be required upon delivery",
            "Contact courier directly for delivery issues",
            "We are not responsible for delays caused by courier or customs"
          ]
        },
        {
          title: "International Shipping",
          content: [
            "Currently, we only ship within Malaysia",
            "International customers: Contact us for special arrangements",
            "Digital consultations available worldwide"
          ]
        }
      ]
    }
  },
  {
    id: "disclaimer",
    title: "Disclaimer & Liability",
    icon: AlertCircle,
    content: {
      lastUpdated: "January 2025",
      sections: [
        {
          title: "Consultation Services Disclaimer",
          content: [
            "We provide guidance and education, not financial advice",
            "You are solely responsible for your investment decisions",
            "Cryptocurrency investments carry inherent risks",
            "We do not guarantee profits or protection from losses",
            "Always verify transaction details independently"
          ]
        },
        {
          title: "Product Disclaimer",
          content: [
            "Tangem wallets are sold as-is with manufacturer's warranty",
            "We are an authorized reseller, not the manufacturer",
            "Product specifications may change without notice",
            "Crypto security depends on user practices and security measures"
          ]
        },
        {
          title: "Limitation of Liability",
          content: [
            "We are not liable for cryptocurrency losses due to user error",
            "Not responsible for exchange platform issues or failures",
            "Not liable for price fluctuations or market changes",
            "Maximum liability limited to purchase price of products/services",
            "We are not responsible for lost or stolen recovery phrases"
          ]
        },
        {
          title: "Third-Party Services",
          content: [
            "We use Stripe, Coinbase Commerce for payments - subject to their terms",
            "Public Gold services subject to their terms and conditions",
            "Not responsible for third-party platform downtimes or issues"
          ]
        }
      ]
    }
  },
  {
    id: "consultation",
    title: "Consultation Terms",
    icon: FileText,
    content: {
      lastUpdated: "January 2025",
      sections: [
        {
          title: "Booking & Payment",
          content: [
            "Payment required before time slot booking for paid sessions",
            "Free 15-minute sessions can be booked directly",
            "No-shows without 24-hour notice forfeit session fee",
            "Rescheduling allowed up to 24 hours before session"
          ]
        },
        {
          title: "Session Conduct",
          content: [
            "Sessions conducted via video call or in-person (KL area)",
            "Client must have stable internet for video sessions",
            "Screen sharing may be required for technical guidance",
            "We NEVER ask for seed phrases or private keys",
            "Recording sessions is not permitted without consent"
          ]
        },
        {
          title: "Post-Session Support",
          content: [
            "7-day WhatsApp support included with paid sessions",
            "Support covers questions related to session content only",
            "Additional consultations may be booked if needed",
            "Emergency support available for critical security issues"
          ]
        },
        {
          title: "Cancellation Policy",
          content: [
            "Cancel up to 24 hours before session for full refund",
            "Cancellations within 24 hours: 50% refund",
            "No-shows: No refund",
            "We reserve the right to cancel and refund if unable to provide service"
          ]
        }
      ]
    }
  }
];

export default function Legal() {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Legal <span className="text-[#00ffc6]">Information</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto">
          Our policies, terms, and legal information to ensure transparency and protect both you and CrypSafe
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="privacy" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-[#0b2221] mb-8 h-auto gap-2 p-2">
            {legalSections.map((section) => {
              const Icon = section.icon;
              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="data-[state=active]:bg-[#00ffc6] data-[state=active]:text-[#071018] data-[state=inactive]:text-[#c6fff0] flex items-center gap-2 py-3 text-sm hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{section.title}</span>
                  <span className="sm:hidden">{section.title.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {legalSections.map((section) => (
            <TabsContent key={section.id} value={section.id}>
              <Card className="glass-card border-[#00ffc6]/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {React.createElement(section.icon, { className: "w-8 h-8 text-[#00ffc6]" })}
                    <CardTitle className="text-3xl text-white">{section.title}</CardTitle>
                  </div>
                  <p className="text-sm text-[#bfeee0]">
                    Last updated: {section.content.lastUpdated}
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  {section.content.sections.map((subsection, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#0b2221] rounded-lg p-6 border border-[#00ffc6]/10"
                    >
                      <h3 className="text-xl font-bold text-white mb-4">{subsection.title}</h3>
                      <ul className="space-y-3">
                        {subsection.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-[#c6fff0]">
                            <div className="w-2 h-2 rounded-full bg-[#00ffc6] mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 glass-card rounded-2xl p-8 text-center border-[#00ffc6]/20"
      >
        <h3 className="text-2xl font-bold mb-4 text-white">Questions About Our Policies?</h3>
        <p className="text-[#c6fff0] mb-6">
          If you have any questions or concerns about our policies, please don't hesitate to contact us.
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/60167736549" target="_blank" rel="noopener noreferrer">
              <button className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-3 rounded-lg transition-all inline-flex items-center gap-2">
                <span>💬</span>
                WhatsApp: +60 16 773 6549
              </button>
            </a>
            <a href="mailto:crypsafe.my@gmail.com">
              <button className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold px-8 py-3 rounded-lg transition-all inline-flex items-center gap-2">
                <span>📧</span>
                crypsafe.my@gmail.com
              </button>
            </a>
          </div>
          <p className="text-sm text-[#bfeee0]">
            Business Hours: Monday - Saturday, 10 AM - 8 PM MYT
          </p>
        </div>
      </motion.div>
    </div>
  );
}
