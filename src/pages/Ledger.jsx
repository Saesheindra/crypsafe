import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CheckCircle, Star, Package, Shield, Eye, Smartphone, Users, TrendingUp, Award, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const ledgerFeatures = [
  {
    icon: Shield,
    title: "Proven Security Track Record",
    description: "Trusted since 2014 with over 6 million devices sold worldwide. Bank-grade security certified.",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Eye,
    title: "Built-in Verification Screen",
    description: "Large display lets you verify every transaction directly on the device, not on your potentially compromised computer.",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Smartphone,
    title: "Bluetooth Connectivity",
    description: "Ledger Nano X supports Bluetooth for seamless mobile app integration while maintaining security.",
    color: "from-green-400 to-green-600"
  },
  {
    icon: Award,
    title: "Industry Standard",
    description: "Recognized and recommended by crypto exchanges, institutional investors, and security experts globally.",
    color: "from-yellow-400 to-yellow-600"
  }
];

const idealForLedger = [
  {
    icon: Users,
    title: "Traditional Security Users",
    description: "Prefer physical button verification and built-in screens for complete transaction control"
  },
  {
    icon: TrendingUp,
    title: "High-Value Holders",
    description: "Managing substantial crypto portfolios requiring institutional-grade security with proven track record"
  },
  {
    icon: Shield,
    title: "Privacy-Conscious Users",
    description: "Value the ability to verify transactions on the device screen without relying on phone/computer display"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Users",
    description: "Want Bluetooth connectivity for seamless mobile management (Nano X) while maintaining cold storage security"
  }
];

const getLedgerProductImage = (product) => {
  if (product.image_url) return product.image_url;
  
  const name = product.name?.toLowerCase() || '';
  
  if (name.includes('flex')) {
    return 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f88f2cb7165a70a22ee871/138a91d0c_LEDGERFLEX_BTC_1000x1000_1.jpg';
  }
  
  return null;
};

export default function Ledger() {
  const handleLedgerClick = () => {
    window.open('https://shop.ledger.com/?r=36f598aa14f9', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Shop <span className="text-purple-400">Ledger Wallets</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto mb-3">
          The world's most trusted hardware wallet since 2014. Over 6 million devices protecting billions in crypto assets.
        </p>
        <div className="inline-block px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-400/50">
          <p className="text-sm text-purple-300">
            <strong className="text-purple-400">🤝 Ledger Affiliate Partner</strong> — We refer you to Ledger's official store & provide local setup support
          </p>
        </div>
      </motion.div>

      {/* Ledger Product Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-12 border-2 border-purple-400/30 glow-effect"
      >
        <div className="flex items-center gap-3 mb-4">
          <Play className="w-8 h-8 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">See Ledger in Action</h2>
        </div>
        <p className="text-[#c6fff0] mb-6">Watch how Ledger's built-in screen provides secure transaction verification - the industry standard for hardware wallet security.</p>
        
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black">
          <video 
            className="w-full h-full object-contain"
            controls
            autoPlay={true}
            muted={true}
            loop={false}
            preload="metadata"
          >
            <source src="https://i.imgur.com/fRu8W66.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      {/* Quiz CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-2xl p-6 mb-12 border-2 border-purple-400/30 glow-effect text-center"
      >
        <h3 className="text-2xl font-bold mb-3 text-white">Not Sure Which Wallet to Choose?</h3>
        <p className="text-[#c6fff0] mb-4">Take our quick quiz to find the perfect cold wallet for your needs</p>
        <Link to={createPageUrl("WalletQuiz")}>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-3">
            Take the Wallet Quiz
          </Button>
        </Link>
      </motion.div>

      {/* Why Choose Ledger */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Why Choose <span className="text-purple-400">Ledger?</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ledgerFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card h-full border-purple-400/20 hover:glow-effect transition-all">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-[#c6fff0]">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Ideal For Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-8 mb-12 glow-effect border-2 border-purple-400/30"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Ledger is <span className="text-purple-400">Ideal For</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {idealForLedger.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-[#0b2221]">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-white">{item.title}</h4>
                  <p className="text-[#c6fff0] text-sm">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Products Grid */}
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Choose Your Ledger Model</h2>
      
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass-card border-purple-400/20">
              <CardHeader>
                <Skeleton className="h-48 w-full rounded-lg" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Array.isArray(products) && products.map((product, index) => {
            const productImage = getLedgerProductImage(product);
            const isNanoSPlus = product.name?.toLowerCase().includes('nano s plus') || product.name?.toLowerCase().includes('nano s+');
            const isNanoGen5 = product.name?.toLowerCase().includes('gen5') || product.name?.toLowerCase().includes('gen 5');
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card hover:glow-effect transition-all duration-300 h-full flex flex-col border-purple-400/20 group">
                  <CardHeader>
                    {product.popular && (
                      <Badge className="absolute top-4 right-4 bg-purple-400 text-white font-bold">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {isNanoGen5 && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] text-[#071018] font-bold shadow-lg animate-pulse">
                        ⭐ NEW
                      </Badge>
                    )}
                    {isNanoSPlus && (
                      <Badge className="absolute top-4 left-4 bg-green-500 text-white font-bold shadow-lg">
                        💰 Most Affordable
                      </Badge>
                    )}
                    <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-[#021213] rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                      {productImage ? (
                        <img 
                          src={productImage} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const parent = e.target.parentElement;
                            if (parent && !parent.querySelector('svg')) {
                              const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                              svg.setAttribute("class", "w-16 h-16 text-purple-400 opacity-50");
                              svg.setAttribute("fill", "none");
                              svg.setAttribute("stroke", "currentColor");
                              svg.setAttribute("viewBox", "0 0 24 24");
                              svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>';
                              parent.appendChild(svg);
                            }
                          }}
                        />
                      ) : (
                        <Package className="w-16 h-16 text-purple-400 opacity-50" />
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-purple-400 transition-colors text-white">{product.name}</CardTitle>
                    <p className="text-[#bfeee0] text-sm mt-2">{product.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    {product.features && product.features.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#c6fff0]">
                            <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-bold text-purple-400">
                          RM {product.price.toFixed(2)}
                        </span>
                        <Badge variant="outline" className="border-green-500 text-green-400">
                          In Stock
                        </Badge>
                      </div>
                      <Button
                        onClick={handleLedgerClick}
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-3 shadow-lg hover:shadow-xl transition-all"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Buy on Ledger Official Store
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Why Buy Through Us */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-8 glow-effect border-purple-400/20"
      >
        <h3 className="text-2xl font-bold mb-6 text-purple-400">Why Buy Through CrypSafe as Affiliate Partner?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold mb-2 text-white">🔗 Direct to Official Store</h4>
            <p className="text-sm text-[#bfeee0]">We link you directly to Ledger's official store - authentic products with global warranty and latest firmware</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-white">🎓 Local Setup Support</h4>
            <p className="text-sm text-[#bfeee0]">Get personalized help setting up and transferring to your Ledger in Bahasa Malaysia & English</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-white">💬 Ongoing Assistance</h4>
            <p className="text-sm text-[#bfeee0]">WhatsApp support for any questions about your Ledger wallet journey - even after purchase</p>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-400/30">
          <p className="text-sm text-[#c6fff0] text-center">
            <strong className="text-purple-400">💡 Note:</strong> Purchases are made directly on Ledger's official website. We earn a small commission while you get the same price and full manufacturer support.
          </p>
        </div>
      </motion.div>

      {/* CTA */}
      <div className="mt-12 text-center glass-card rounded-2xl p-12 glow-effect">
        <h2 className="text-3xl font-bold mb-4 text-white">Need Help Choosing?</h2>
        <p className="text-lg text-[#c6fff0] mb-8 max-w-2xl mx-auto">
          Contact us for personalized advice on which hardware wallet suits your needs best
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://wa.me/60167736549" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-6 text-lg">
              💬 Chat on WhatsApp
            </Button>
          </a>
          <Link to={createPageUrl("WalletQuiz")}>
            <Button variant="outline" className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-6 text-lg font-bold">
              Take Wallet Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}