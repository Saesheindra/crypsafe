import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, ShoppingCart, Flame, Droplet, Clock, Zap, MessageCircle, AlertTriangle, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ShoppingCartComponent from "../components/shop/ShoppingCart";

// Hardcoded Keystone products with updated features from screenshots
const KEYSTONE_PRODUCTS = [
  {
    id: "keystone-3-pro",
    name: "Keystone 3 Pro",
    description: "Keystone 3 Pro is the only hardware wallet equipped with three security chips to securely manage multiple crypto accounts. Its Air-Gapped Mode eliminates all connectivity risks, ensuring maximum security for your assets.",
    price: 500,
    stock: 5,
    popular: false,
    image_url: "https://cdn.shopify.com/s/files/1/0029/3175/3060/files/3pro.png?v=1728372157",
    features: [
      "100% Open Source",
      "Air-Gapped QR Code",
      "4-Inch Touchscreen",
      "Full Transaction Display",
      "3 Secure Element Chips",
      "Shamir Backup",
      "Support 3 Wallets",
      "Fingerprint & Passphrase",
      "Anti-tamper self-destruction"
    ]
  },
  {
    id: "keystone-tablet",
    name: "Keystone Tablet",
    description: "Professional-grade steel seed phrase backup solution. Corrosion, fire, and water resistant storage for your crypto recovery words.",
    price: 199,
    stock: 10,
    popular: false,
    image_url: "https://cdn.shopify.com/s/files/1/0029/3175/3060/products/Tablet1.jpg?v=1677056166",
    features: [
      "Supports 12/18/24 word seed phrases",
      "Fire resistant up to 1399°C",
      "Waterproof and corrosion resistant",
      "304 stainless steel construction",
      "Only 4 letters needed per word",
      "5 secure screws included",
      "Compatible with all crypto wallets",
      "Dimensions: 60 x 105 x 6.5mm"
    ]
  },
  {
    id: "keystone-tablet-plus",
    name: "Keystone Tablet Plus",
    description: "Premium steel backup solution with individual letter slots for maximum security. The ultimate seed phrase protection for serious crypto holders.",
    price: 280,
    stock: 8,
    popular: true,
    image_url: "https://cdn.shopify.com/s/files/1/0029/3175/3060/products/Plus1.jpg?v=1677056227",
    features: [
      "Supports 12/18/24 word seed phrases",
      "Individual slot for each letter (most secure)",
      "Fire resistant up to 1399°C",
      "Waterproof and corrosion resistant",
      "304 stainless steel construction",
      "17 secure screws for maximum protection",
      "Compatible with all crypto wallets",
      "Dimensions: 70 x 105 x 6mm",
      "Recommended for high-value portfolios"
    ]
  }
];

export default function Keystone() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

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

  const handleBuyNow = (product) => {
    addToCart(product);
    // Navigate to checkout
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-4"
      >
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-16 h-16 text-blue-500" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          <span className="text-white">Keystone</span> <span className="text-[#00ffc6]">Steel Backup</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
          Official Keystone Reseller — Protect your seed phrase with indestructible steel backup. Compatible with ANY crypto wallet.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ffc6]/10 border border-[#00ffc6]/30">
          <span className="text-[#00ffc6]">✅</span>
          <span className="text-[#00ffc6] text-sm font-medium">
            Official Keystone Reseller — Fire, water & corrosion resistant
          </span>
        </div>
      </motion.div>

      {/* Important: Seed Phrase Security Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="container mx-auto px-4 mb-16"
      >
        <div className="bg-[#0a1a1f] rounded-2xl p-8 border border-[#1a3a3f]">
          <div className="text-center mb-8">
            <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Important: <span className="text-yellow-400">Seed Phrase Security</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Losing your seed phrase typically means permanent loss of access to your crypto. Steel backup provides a more durable storage option than paper for long-term security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Paper Backup Risks */}
            <div className="bg-[#0d1f24] rounded-xl p-6 border-2 border-red-500/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-400 text-xl">✗</span>
                <h3 className="text-xl font-bold text-red-400">Paper Backup Risks</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl">🔥</span>
                  <div>
                    <p className="font-bold text-white">Fire Damage</p>
                    <p className="text-sm text-gray-400">Paper burns at 233°C — house fires easily exceed this</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">💧</span>
                  <div>
                    <p className="font-bold text-white">Water Damage</p>
                    <p className="text-sm text-gray-400">Floods, spills, or humidity can make ink unreadable</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 text-xl">📄</span>
                  <div>
                    <p className="font-bold text-white">Paper Deterioration</p>
                    <p className="text-sm text-gray-400">Paper fades and degrades over years</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Steel Backup Benefits */}
            <div className="bg-[#0d1f24] rounded-xl p-6 border-2 border-green-500/50">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-400 text-xl">✓</span>
                <h3 className="text-xl font-bold text-green-400">Steel Backup Benefits</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Fire Resistant</p>
                    <p className="text-sm text-gray-400">Survives up to 1399°C — paper burns at 233°C</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Droplet className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Waterproof</p>
                    <p className="text-sm text-gray-400">Stainless steel resists water and humidity damage</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Long-lasting</p>
                    <p className="text-sm text-gray-400">304 stainless steel — designed for long-term durability</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">Universal Compatibility</p>
                    <p className="text-sm text-gray-400">Works with all crypto wallets (Tangem, Ledger, MetaMask, etc.)</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Choose Your Steel Backup Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold mb-10 text-center text-white">
          Choose Your <span className="text-[#00ffc6]">Steel Backup</span>
        </h2>

        {/* First row: Keystone 3 Pro and Keystone Tablet */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Keystone 3 Pro */}
          <div className="bg-[#0a1a1f] rounded-2xl p-6 border border-[#1a3a3f] hover:border-[#00ffc6]/30 transition-all duration-300">
            <div className="aspect-[4/3] bg-gradient-to-br from-[#0d2429] to-[#071015] rounded-xl flex items-center justify-center mb-6 overflow-hidden">
              <img
                src={KEYSTONE_PRODUCTS[0].image_url}
                alt={KEYSTONE_PRODUCTS[0].name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{KEYSTONE_PRODUCTS[0].name}</h3>
            <p className="text-gray-400 text-sm mb-4">{KEYSTONE_PRODUCTS[0].description}</p>

            <ul className="space-y-2 mb-6">
              {KEYSTONE_PRODUCTS[0].features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-[#00ffc6]">
                RM {KEYSTONE_PRODUCTS[0].price.toFixed(2)}
              </span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                In Stock
              </Badge>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => addToCart(KEYSTONE_PRODUCTS[0])}
                className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => handleBuyNow(KEYSTONE_PRODUCTS[0])}
                variant="outline"
                className="w-full border-[#1a3a3f] text-[#00ffc6] hover:bg-[#00ffc6]/10 font-medium py-3"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Buy Now
              </Button>
              <button
                onClick={() => handleOrderClick(KEYSTONE_PRODUCTS[0])}
                className="w-full text-center text-[#00ffc6] hover:text-[#00d9a8] font-medium py-2 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Order
              </button>
            </div>
          </div>

          {/* Keystone Tablet */}
          <div className="bg-[#0a1a1f] rounded-2xl p-6 border border-[#1a3a3f] hover:border-[#00ffc6]/30 transition-all duration-300">
            <div className="aspect-[4/3] bg-gradient-to-br from-[#0d2429] to-[#071015] rounded-xl flex items-center justify-center mb-6 overflow-hidden">
              <img
                src={KEYSTONE_PRODUCTS[1].image_url}
                alt={KEYSTONE_PRODUCTS[1].name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{KEYSTONE_PRODUCTS[1].name}</h3>
            <p className="text-gray-400 text-sm mb-4">{KEYSTONE_PRODUCTS[1].description}</p>

            <ul className="space-y-2 mb-6">
              {KEYSTONE_PRODUCTS[1].features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-[#00ffc6]">
                RM {KEYSTONE_PRODUCTS[1].price.toFixed(2)}
              </span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                In Stock
              </Badge>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => addToCart(KEYSTONE_PRODUCTS[1])}
                className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => handleBuyNow(KEYSTONE_PRODUCTS[1])}
                variant="outline"
                className="w-full border-[#1a3a3f] text-[#00ffc6] hover:bg-[#00ffc6]/10 font-medium py-3"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Buy Now
              </Button>
              <button
                onClick={() => handleOrderClick(KEYSTONE_PRODUCTS[1])}
                className="w-full text-center text-[#00ffc6] hover:text-[#00d9a8] font-medium py-2 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Order
              </button>
            </div>
          </div>
        </div>

        {/* Second row: Keystone Tablet Plus (wider card) */}
        <div className="max-w-lg mx-auto">
          <div className="bg-[#0a1a1f] rounded-2xl p-6 border-2 border-[#00ffc6]/30 hover:border-[#00ffc6]/50 transition-all duration-300 relative">
            {/* Maximum Security Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <Badge className="bg-yellow-500 text-black font-bold px-4 py-1">
                ⭐ MAXIMUM SECURITY
              </Badge>
            </div>

            <div className="aspect-[4/3] bg-gradient-to-br from-[#0d2429] to-[#071015] rounded-xl flex items-center justify-center mb-6 overflow-hidden mt-2">
              <img
                src={KEYSTONE_PRODUCTS[2].image_url}
                alt={KEYSTONE_PRODUCTS[2].name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{KEYSTONE_PRODUCTS[2].name}</h3>
            <p className="text-gray-400 text-sm mb-4">{KEYSTONE_PRODUCTS[2].description}</p>

            <ul className="space-y-2 mb-6">
              {KEYSTONE_PRODUCTS[2].features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-[#00ffc6]">
                RM {KEYSTONE_PRODUCTS[2].price.toFixed(2)}
              </span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                In Stock
              </Badge>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => addToCart(KEYSTONE_PRODUCTS[2])}
                className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => handleBuyNow(KEYSTONE_PRODUCTS[2])}
                variant="outline"
                className="w-full border-[#1a3a3f] text-[#00ffc6] hover:bg-[#00ffc6]/10 font-medium py-3"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Buy Now
              </Button>
              <button
                onClick={() => handleOrderClick(KEYSTONE_PRODUCTS[2])}
                className="w-full text-center text-[#00ffc6] hover:text-[#00d9a8] font-medium py-2 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Order
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Compatible with All Crypto Wallets Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4 mb-16"
      >
        <div className="bg-[#0a1a1f] rounded-2xl p-8 border border-[#1a3a3f]">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#00ffc6] text-2xl">✓</span>
              <h2 className="text-2xl font-bold text-white">
                Compatible with <span className="text-[#00ffc6]">All Crypto Wallets</span>
              </h2>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Keystone steel backup works with any crypto wallet that uses BIP39 seed phrases — Tangem, Ledger, Trezor, MetaMask, Trust Wallet, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#0d2429] rounded-xl p-6 text-center border border-[#1a3a3f]">
              <CheckCircle className="w-10 h-10 text-[#00ffc6] mx-auto mb-3" />
              <p className="font-bold text-white mb-1">Hardware Wallets</p>
              <p className="text-sm text-gray-400">Tangem, Ledger, Trezor, KeepKey</p>
            </div>
            <div className="bg-[#0d2429] rounded-xl p-6 text-center border border-[#1a3a3f]">
              <CheckCircle className="w-10 h-10 text-[#00ffc6] mx-auto mb-3" />
              <p className="font-bold text-white mb-1">Software Wallets</p>
              <p className="text-sm text-gray-400">MetaMask, Trust Wallet, Exodus</p>
            </div>
            <div className="bg-[#0d2429] rounded-xl p-6 text-center border border-[#1a3a3f]">
              <CheckCircle className="w-10 h-10 text-[#00ffc6] mx-auto mb-3" />
              <p className="font-bold text-white mb-1">All Cryptocurrencies</p>
              <p className="text-sm text-gray-400">Bitcoin, Ethereum, and 6000+ tokens</p>
            </div>
          </div>
        </div>
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
