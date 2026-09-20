import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, ShoppingCart, Flame, Droplet, Zap, Package, MessageCircle, AlertTriangle, Play, Lock, Globe, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ShoppingCartComponent from "../components/shop/ShoppingCart";

const keystoneFeatures = [
  {
    icon: Flame,
    title: "Fire Resistant",
    description: "Survives up to 1399°C — paper burns at 233°C",
    color: "from-red-400 to-red-600"
  },
  {
    icon: Droplet,
    title: "Waterproof",
    description: "Stainless steel resists water and humidity damage",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Shield,
    title: "Long-lasting",
    description: "304 stainless steel — designed for long-term durability",
    color: "from-green-400 to-green-600"
  },
  {
    icon: Zap,
    title: "Universal Compatibility",
    description: "Works with all crypto wallets (Tangem, Ledger, MetaMask, etc.)",
    color: "from-purple-400 to-purple-600"
  }
];

const keystoneWhyChoose = [
  {
    icon: Flame,
    title: "Extreme Durability",
    description: "304 stainless steel withstands fire up to 1399°C, water damage, and corrosion for decades.",
    color: "from-orange-400 to-red-600"
  },
  {
    icon: Lock,
    title: "Ultimate Backup Security",
    description: "Physical engraving ensures your seed phrase can never be deleted, corrupted, or hacked.",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Globe,
    title: "Universal BIP39 Support",
    description: "Compatible with all major wallets — Ledger, Trezor, Tangem, MetaMask, and more.",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Clock,
    title: "Generational Storage",
    description: "Pass down your crypto legacy. Steel backup lasts 100+ years unlike paper that degrades.",
    color: "from-[#00ffc6] to-[#00d9a8]"
  }
];

const idealForKeystone = [
  "Long-term crypto holders who need permanent backup",
  "Users with hardware wallets (Ledger, Trezor, Tangem)",
  "Privacy-conscious individuals avoiding digital storage",
  "Crypto investors planning generational wealth transfer",
  "Anyone replacing paper seed phrase backup"
];

// Hardcoded Keystone products
const KEYSTONE_PRODUCTS = [
  {
    id: "keystone-3-pro",
    name: "Keystone 3 Pro",
    description: "Premium air-gapped hardware wallet with 4-inch touchscreen, triple secure element chips, and fingerprint sensor. Ultimate security for serious crypto holders.",
    price: 500,
    stock: 5,
    popular: false,
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7ccc2c_keystone-3-pro.png",
    features: [
      "4-inch IPS touchscreen display",
      "Triple secure element chips (EAL5+)",
      "Fingerprint biometric authentication",
      "100% air-gapped — no WiFi, Bluetooth, or USB data",
      "PCI anti-tamper protection"
    ]
  },
  {
    id: "keystone-tablet",
    name: "Keystone Tablet",
    description: "Indestructible steel seed phrase backup. Withstands fire up to 1399°C, water, and corrosion. Compatible with all BIP39 wallets.",
    price: 199,
    stock: 10,
    popular: false,
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7ccc2c_keystone-tablet.png",
    features: [
      "304 stainless steel construction",
      "Fire resistant up to 1399°C",
      "Waterproof & corrosion resistant",
      "Supports 12/18/24 word seed phrases",
      "Works with any BIP39 wallet"
    ]
  },
  {
    id: "keystone-tablet-plus",
    name: "Keystone Tablet Plus",
    description: "Premium steel backup with enhanced capacity. Stores up to 24 words with improved engraving system. Maximum protection for your seed phrase.",
    price: 280,
    stock: 8,
    popular: true,
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7ccc2c_keystone-tablet-plus.png",
    features: [
      "Premium 304 stainless steel",
      "Enhanced engraving system",
      "Supports up to 24 word phrases",
      "Includes letter stamping kit",
      "100+ years durability"
    ]
  }
];

export default function Keystone() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Use hardcoded products
  const products = KEYSTONE_PRODUCTS;
  const isLoading = false;

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('crypsafe_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('crypsafe_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const cartItem = {
      id: product.id,
      variantId: null,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: 1,
      stock: product.stock,
      image_url: product.image_url,
      hasConsultation: false
    };

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        const newQuantity = newCart[existingItemIndex].quantity + 1;
        if (newQuantity <= product.stock) {
          newCart[existingItemIndex].quantity = newQuantity;
          return newCart;
        } else {
          alert(`Only ${product.stock} items available in stock`);
          return prevCart;
        }
      } else {
        return [...prevCart, cartItem];
      }
    });
    setCartOpen(true);
  };

  const updateQuantity = (itemId, variantId, hasConsultation, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, variantId, hasConsultation);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === itemId && item.variantId === variantId && item.hasConsultation === hasConsultation) {
          if (newQuantity <= item.stock) {
            return { ...item, quantity: newQuantity };
          } else {
            alert(`Only ${item.stock} items available`);
            return item;
          }
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId, variantId, hasConsultation) => {
    setCart(prevCart =>
      prevCart.filter(item =>
        !(item.id === itemId && item.variantId === variantId && item.hasConsultation === hasConsultation)
      )
    );
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
    }
  };


  const handleOrderClick = (product) => {
    const message = encodeURIComponent(`Hi! I'd like to order: ${product.name} (RM ${product.price?.toFixed(2)})`);
    window.open(`https://wa.me/601166736549?text=${message}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-16 h-16 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          <span className="text-blue-400">Keystone</span> Steel Backup
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto mb-4">
          Official Keystone Reseller — Protect your seed phrase with indestructible steel backup. Compatible with ANY crypto wallet.
        </p>
        <div className="inline-block px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/50">
          <p className="text-sm text-blue-300">
            <strong className="text-blue-400">✅ Official Keystone Reseller</strong> — Fire, water & corrosion resistant
          </p>
        </div>
      </motion.div>

      {/* Keystone Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-12 border-2 border-blue-400/30 glow-effect"
      >
        <div className="flex items-center gap-3 mb-4">
          <Play className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">See Keystone in Action</h2>
        </div>
        <p className="text-[#c6fff0] mb-6">Watch how Keystone steel backup provides indestructible protection for your seed phrase — surviving fire, water, and the test of time.</p>

        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black">
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay={false}
            muted={true}
            loop={false}
            preload="metadata"
          >
            <source src="https://i.imgur.com/kFz8QcM.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      {/* Why Choose Keystone Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Why Choose <span className="text-blue-400">Keystone?</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keystoneWhyChoose.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="glass-card h-full hover:glow-effect transition-all duration-300 border-blue-400/20">
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
      </motion.div>

      {/* Ideal For Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-blue-400/30 glow-effect"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          <span className="text-blue-400">Ideal For</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {idealForKeystone.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-[#0b2221]">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-[#c6fff0]">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Why Steel Backup Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-yellow-500/30 glow-effect"
      >
        <div className="text-center mb-6">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            ⚠️ Important: <span className="text-yellow-400">Seed Phrase Security</span>
          </h2>
          <p className="text-lg text-[#c6fff0] max-w-3xl mx-auto">
            Losing your seed phrase typically means permanent loss of access to your crypto. Steel backup provides a more durable storage option than paper for long-term security.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-red-400">❌ Paper Backup Risks</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-2xl">🔥</span>
                <div>
                  <p className="font-bold text-white">Fire Damage</p>
                  <p className="text-sm text-[#bfeee0]">Paper burns at 233°C — house fires easily exceed this</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-2xl">🌊</span>
                <div>
                  <p className="font-bold text-white">Water Damage</p>
                  <p className="text-sm text-[#bfeee0]">Floods, spills, or humidity can make ink unreadable</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-2xl">📄</span>
                <div>
                  <p className="font-bold text-white">Paper Deterioration</p>
                  <p className="text-sm text-[#bfeee0]">Paper fades and degrades over years</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-green-900/20 border-2 border-green-500/50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-green-400">✅ Steel Backup Benefits</h3>
            <ul className="space-y-3">
              {keystoneFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <Icon className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white">{feature.title}</p>
                      <p className="text-sm text-[#bfeee0]">{feature.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Choose Your <span className="text-blue-400">Steel Backup</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KEYSTONE_PRODUCTS.map((product, index) => {
              const isPlus = product.name?.includes("Plus");
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`glass-card hover:glow-effect transition-all duration-300 h-full flex flex-col ${
                    isPlus ? 'border-2 border-blue-400 shadow-lg shadow-blue-400/20' : 'border-[#00ffc6]/20'
                  }`}>
                    {isPlus && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-blue-400 text-[#071018] font-bold px-6 py-1.5">
                          ⭐ MAXIMUM SECURITY
                        </Badge>
                      </div>
                    )}
                    <CardHeader className={isPlus ? 'pt-8' : ''}>
                      <div className="aspect-video bg-gradient-to-br from-[#0b2221] to-[#021213] rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Shield className="w-16 h-16 text-blue-400 opacity-50" />
                        )}
                      </div>
                      <CardTitle className="text-xl text-white">{product.name}</CardTitle>
                      <p className="text-[#bfeee0] text-sm mt-2">{product.description}</p>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {product.features && product.features.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {product.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[#c6fff0]">
                              <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl font-bold text-blue-400">
                            RM {product.price?.toFixed(2)}
                          </span>
                          <Badge variant="outline" className={
                            (product.stock ?? 0) > 0 
                              ? "border-green-500 text-green-400" 
                              : "border-red-500 text-red-400"
                          }>
                            {(product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <Button
                            onClick={() => addToCart(product)}
                            className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-3"
                            disabled={(product.stock ?? 0) <= 0}
                          >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add to Cart
                          </Button>
                          <Button
                            onClick={() => handleOrderClick(product)}
                            variant="ghost"
                            className="w-full text-[#00ffc6] hover:bg-[#00ffc6]/10 font-bold py-3"
                            disabled={(product.stock ?? 0) <= 0}
                          >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            WhatsApp Order
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </div>
      </motion.div>

      {/* Compatible with All Wallets */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-8 mb-12 border-[#00ffc6]/20"
      >
        <h3 className="text-2xl font-bold mb-6 text-center text-white">
          ✅ Compatible with <span className="text-[#00ffc6]">All Crypto Wallets</span>
        </h3>
        <p className="text-center text-[#c6fff0] mb-6 max-w-2xl mx-auto">
          Keystone steel backup works with any crypto wallet that uses BIP39 seed phrases — Tangem, Ledger, Trezor, MetaMask, Trust Wallet, and more.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#0b2221] rounded-lg p-4 text-center">
            <CheckCircle className="w-8 h-8 text-[#00ffc6] mx-auto mb-2" />
            <p className="font-bold text-white mb-1">Hardware Wallets</p>
            <p className="text-sm text-[#bfeee0]">Tangem, Ledger, Trezor, KeepKey</p>
          </div>
          <div className="bg-[#0b2221] rounded-lg p-4 text-center">
            <CheckCircle className="w-8 h-8 text-[#00ffc6] mx-auto mb-2" />
            <p className="font-bold text-white mb-1">Software Wallets</p>
            <p className="text-sm text-[#bfeee0]">MetaMask, Trust Wallet, Exodus</p>
          </div>
          <div className="bg-[#0b2221] rounded-lg p-4 text-center">
            <CheckCircle className="w-8 h-8 text-[#00ffc6] mx-auto mb-2" />
            <p className="font-bold text-white mb-1">All Cryptocurrencies</p>
            <p className="text-sm text-[#bfeee0]">Bitcoin, Ethereum, and 6000+ tokens</p>
          </div>
        </div>
      </motion.div>

      {/* Bundle Suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-green-500/30 glow-effect"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">💰 Save with Bundle Packages</h3>
          <p className="text-[#c6fff0] mb-6 max-w-2xl mx-auto">
            Get complete crypto security — cold wallet + steel backup together at a discounted price. Protect both your access and your recovery.
          </p>
          <Link to={createPageUrl("Shop")}>
            <Button className="bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold px-8 py-4 text-lg">
              <Package className="w-5 h-5 mr-2" />
              View Bundle Deals
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Why Buy from CrypSafe */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-8 mb-12 glow-effect"
      >
        <h3 className="text-2xl font-bold mb-4 text-blue-400">Why Buy from CrypSafe?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold mb-2 text-white">✅ Official Keystone Reseller</h4>
            <p className="text-sm text-[#bfeee0]">Authentic products sold directly with full manufacturer warranty</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-white">🚀 Local Support & Fast Delivery</h4>
            <p className="text-sm text-[#bfeee0]">Support in Bahasa Malaysia & English. Ships from Malaysia (2-6 business days)</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-white">💳 Flexible Payment</h4>
            <p className="text-sm text-[#bfeee0]">FPX, Credit Card, or Crypto payments accepted</p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="text-center"
      >
        <p className="text-[#bfeee0] mb-4">Have questions about steel backup?</p>
        <a href="https://wa.me/601166736549" target="_blank" rel="noopener noreferrer">
          <Button className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-4">
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </a>
      </motion.div>

      {/* Shopping Cart */}
      <ShoppingCartComponent
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        isOpen={cartOpen}
        setIsOpen={setCartOpen}
      />
    </div>
  );
}