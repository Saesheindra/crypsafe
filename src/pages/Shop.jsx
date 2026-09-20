import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CheckCircle, Star, Package, Bot, ShoppingBag, Shield, Users, MessageCircle, Play, Gift, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ShippingInfo from "../components/shop/ShippingInfo";
import WhyChooseTangem from "../components/tangem/WhyChooseTangem";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ShoppingCartComponent from "../components/shop/ShoppingCart"; // Renamed to avoid conflict with lucide-react icon
import ProductFilters from "../components/shop/ProductFilters";

// Static product data - sourced from crypsafe.com.my (ordered to match production site exactly)
const STATIC_PRODUCTS = [
  // Row 1: Keystone 3 Pro | OneKey Classic 1S Pure
  {
    id: "keystone-3-pro",
    name: "Keystone 3 Pro",
    description: "Keystone 3 Pro is the only hardware wallet equipped with three security chips to securely manage multiple crypto accounts. Its Air-Gapped Mode eliminates all connectivity risks, ensuring maximum security for your assets.",
    price: 500,
    stock: 10,
    category: "keystone",
    image_url: "https://media.base44.com/images/public/68f88f2cb7165a70a22ee871/e7ca46336_Screenshot2026-09-07211819.png",
    features: ["100% Open Source", "Air-Gapped QR Code", "4-Inch Touchscreen"]
  },
  {
    id: "onekey-classic-1s-pure",
    name: "OneKey Classic 1S Pure",
    description: "Ultra-affordable entry-level hardware wallet with essential security for crypto beginners",
    price: 310,
    stock: 8,
    category: "onekey",
    image_url: "https://i.imgur.com/KzoBv6J.png",
    features: ["EAL 6+ Secure Element Chip", "Bluetooth & USB-C connectivity", "Security Key functionality"]
  },
  // Row 2: OneKey Pro - Black | OneKey Classic 1S
  {
    id: "onekey-pro-black",
    name: "OneKey Pro - Black",
    description: "Premium open-source hardware wallet with 3.5\" touchscreen, multi-chain support, and air-gapped security",
    price: 1100,
    stock: 3,
    category: "onekey",
    image_url: "https://i.imgur.com/5aN1PSF.png",
    features: ["EAL 6+ Secure Element Chip", "Air-gapped Signing", "Fingerprint sensor"]
  },
  {
    id: "onekey-classic-1s",
    name: "OneKey Classic 1S",
    description: "Affordable open-source hardware wallet with essential security features and wide crypto support",
    price: 400,
    stock: 5,
    category: "onekey",
    popular: true,
    image_url: "https://i.imgur.com/J0NoiXJ.jpeg",
    features: ["EAL 6+ Secure Element Chip", "Bluetooth & USB-C connectivity", "Security Key functionality"]
  },
  // Row 3: OneKey Pro - White | Tangem Electra Sea
  {
    id: "onekey-pro-white",
    name: "OneKey Pro - White",
    description: "Premium open-source hardware wallet with 3.5\" touchscreen, multi-chain support, and air-gapped security",
    price: 1100,
    stock: 3,
    category: "onekey",
    image_url: "https://i.imgur.com/Eeq97cA.png",
    features: ["EAL 6+ Secure Element Chip", "Air-gapped Signing", "Fingerprint sensor"]
  },
  {
    id: "tangem-3-card-electra-sea",
    name: "Tangem Wallet (3-Card Set) - Electra Sea- Limited Edition",
    description: "Premium 3-card backup set in stunning Electra Sea color. Mesmerizing turquoise and electric blue tones inspired by tropical waters. Each set includes 3 NFC cards that work together - if you lose one card, you still have 2 backups.",
    price: 350,
    stock: 0,
    category: "tangem",
    popular: true,
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f88f2cb7165a70a22ee871/3de70dd7c_Screenshot2025-11-06225407sealimited.png",
    features: ["3 backup cards included - lose 1, still have 2", "Electra Sea color - vibrant turquoise and electric blue", "No seed phrases to write down or remember"]
  },
  // Row 4: Spring Bloom | Stealth
  {
    id: "tangem-3-card-spring-bloom",
    name: "Tangem Wallet (3-Card Set) - Spring Bloom -Limited Edition",
    description: "Premium 3-card backup set in vibrant Spring Bloom color. Fresh green and floral design that brings life and energy. Each set includes 3 NFC cards that work together - if you lose one card, you still have 2 backups.",
    price: 350,
    stock: 10,
    category: "tangem",
    popular: true,
    image_url: "https://i.imgur.com/K84hmfI.png",
    features: ["3 backup cards included - lose 1, still have 2", "Spring Bloom color - fresh green and floral design", "No seed phrases to write down or remember"]
  },
  {
    id: "tangem-3-card-stealth",
    name: "Tangem Wallet (3-Card Set) - Stealth",
    description: "Premium 3-card backup set in sleek Stealth color. All-black design for discreet carry and maximum sophistication. Total anonymity. Each set includes 3 NFC cards that work together - if you lose one card, you still have 2 backups.",
    price: 350,
    stock: 10,
    category: "tangem",
    popular: true,
    image_url: "https://i.imgur.com/vF4uVLt.png",
    features: ["3 backup cards included - lose 1, still have 2", "Stealth color - sleek all-black design", "NFC tap technology - works with any smartphone"]
  },
  // Row 5: Blush Sky | Sun Drop
  {
    id: "tangem-3-card-blush-sky",
    name: "Tangem Wallet (3-Card Set) - Blush Sky-Limited Edition",
    description: "Premium 3-card backup set in elegant Blush Sky color. Beautiful pink and blue gradient design. Each set includes 3 NFC cards that work together - if you lose one card, you still have 2 backups.",
    price: 350,
    stock: 10,
    category: "tangem",
    popular: true,
    image_url: "https://i.imgur.com/s5JAdUP.png",
    features: ["3 backup cards included - lose 1, still have 2", "Elegant Blush Sky color - pink and blue gradient", "No seed phrases to write down or remember"]
  },
  {
    id: "tangem-3-card-sundrop",
    name: "Tangem Wallet (3-Card Set) - Sun Drop -Limited Edition",
    description: "Premium 3-card backup set in vibrant Sun Drop color. Warm golden and yellow tones that radiate confidence. Each set includes 3 NFC cards that work together - if you lose one card, you still have 2 backups.",
    price: 350,
    stock: 10,
    category: "tangem",
    popular: true,
    image_url: "https://i.imgur.com/BuMCY2L.png",
    features: ["3 backup cards included - lose 1, still have 2", "Vibrant Sun Drop color - golden yellow design", "No seed phrases to write down or remember"]
  },
  // Row 6: Hyperblue | Ledger Nano Gen5
  {
    id: "tangem-3-card-hyperblue",
    name: "Tangem Wallet (3-Card Set) - Hyperblue-Limited Edition",
    description: "Premium 3-card backup set in elegant shades of blue collection color. Cool blue tones for a sophisticated look. Each set includes 3 NFC cards that work together - if you lose one card, you still have 2 backups.",
    price: 350,
    stock: 10,
    category: "tangem",
    popular: true,
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f88f2cb7165a70a22ee871/1e15818a4_Screenshot2025-11-06225427limblue.png",
    features: ["3 backup cards included - lose 1, still have 2", "Winter Collection color - silver and icy blue design", "NFC tap technology - works with any smartphone"]
  },
  {
    id: "ledger-nano-gen5",
    name: "Ledger Nano™ Gen5",
    description: "",
    price: 999,
    stock: 5,
    category: "ledger",
    image_url: "https://i.imgur.com/YHytEgr.png",
    features: ["Monochrome E Ink® touchscreen", "Scratch-resistant glass Anti-glare coating", "Connectivity Bluetooth® (BLE 5.2) for any smartphone (iOS or Android)"]
  },
  // Row 7: Ultimate Protection Bundle | Complete Security Bundle
  {
    id: "bundle-tangem-keystone-plus",
    name: "Ultimate Protection Bundle - Tangem + Keystone Tablet Plus",
    description: "Maximum security setup for serious crypto investors. Premium Tangem wallet + Keystone Tablet Plus with individual letter slots for ultimate seed phrase protection.",
    price: 600,
    stock: 5,
    category: "bundle",
    popular: true,
    image_url: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=300&fit=crop",
    features: ["Most secure backup option available", "Fire resistant up to 1399°C", "Save RM 30 vs buying separately"]
  },
  {
    id: "bundle-tangem-keystone",
    name: "Complete Security Bundle - Tangem + Keystone Tablet",
    description: "The ultimate crypto security combo! Tangem wallet for daily use + Keystone steel backup for seed phrase protection. Everything you need to secure and backup your crypto.",
    price: 529,
    stock: 8,
    category: "bundle",
    popular: true,
    image_url: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=300&fit=crop",
    features: ["Complete security + backup solution", "Indestructible seed phrase storage", "save RM 20 vs buying separately"]
  },
  // Row 8: Ledger Flex | Tangem 2-Card
  {
    id: "ledger-flex",
    name: "Ledger Flex",
    description: "Mid-range E Ink touchscreen wallet - perfect balance of features and affordability.",
    price: 1266,
    stock: 5,
    category: "ledger",
    image_url: "https://i.imgur.com/0QIR5Mv.png",
    features: ["E Ink touchscreen display", "USB-C connectivity", "More affordable than Stax"]
  },
  {
    id: "tangem-2-card",
    name: "Tangem Wallet (2-Card Set) \"Classic Black\"",
    description: "Perfect starter pack with 2 cards for backup. NFC-enabled, supports 6000+ cryptocurrencies.",
    price: 290,
    stock: 25,
    category: "tangem",
    image_url: "https://i.imgur.com/9V8VMrK.png",
    features: ["NFC tap-and-go technology", "Support for 6000+ tokens", "Easy-to-use."]
  },
  // Row 9: Ledger Nano X | Ledger Stax
  {
    id: "ledger-nano-x",
    name: "Ledger Nano X",
    description: "Premium Bluetooth hardware wallet with large screen and mobile app support. Manage 100+ apps simultaneously.",
    price: 779,
    stock: 5,
    category: "ledger",
    image_url: "https://i.imgur.com/risjnYg.png",
    features: ["Bluetooth connectivity for mobile", "Manage 100+ crypto apps simultaneously", "USB-C charging"]
  },
  {
    id: "ledger-stax",
    name: "Ledger Stax",
    description: "Next-gen hardware wallet with E Ink touchscreen. Designed by iPod creator Tony Fadell.",
    price: 2037,
    stock: 5,
    category: "ledger",
    image_url: "https://i.imgur.com/mkOIZgr.png",
    features: ["E Ink curved touchscreen", "Wireless charging with Qi", "Bluetooth and USB-C connectivity"]
  },
  // Remaining Keystone Products
  {
    id: "keystone-tablet",
    name: "Keystone Tablet",
    description: "Professional-grade steel seed phrase backup solution. Corrosion, fire, and water resistant storage for your crypto recovery words.",
    price: 199,
    stock: 15,
    category: "keystone",
    popular: true,
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f88f2cb7165a70a22ee871/579f4a49a_ketstonetabletimage.png",
    features: ["Supports 12/18/24 word seed phrases", "Fire resistant up to 1399°C", "Waterproof and corrosion resistant"]
  },
  {
    id: "keystone-tablet-plus",
    name: "Keystone Tablet Plus",
    description: "Premium steel backup solution with individual letter slots for maximum security. The ultimate seed phrase protection for serious crypto holders.",
    price: 280,
    stock: 10,
    category: "keystone",
    popular: true,
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f88f2cb7165a70a22ee871/ab8ce4ea1_ketstonetabletplusimage.png",
    features: ["Supports 12/18/24 word seed phrases", "Individual slot for each letter (most secure)", "Fire resistant up to 1399°C"]
  },
  // Remaining Tangem Products
  {
    id: "tangem-3-card-black",
    name: "Tangem Wallet (3-Card Set) \"Classic Black\"",
    description: "Most popular choice. Three backup cards for maximum security and convenience. Ultimate security with 3 backup cards. Perfect for serious crypto holders.",
    price: 350,
    stock: 20,
    category: "tangem",
    image_url: "https://i.imgur.com/DWlY7YJ.png",
    features: ["Easy-to-use. No pesky buttons, cables or battery charging", "Multi-currency support Thousands of coins and tokens on 80+ networks", "Top security EAL6+ certified secure element will the cards and ring from any attack"]
  },
  {
    id: "tangem-3-card-white",
    name: "Tangem Wallet 3-Card Set (White)",
    description: "NFC-powered crypto wallet cards. No batteries, no charging. Just tap to sign transactions.",
    price: 350,
    stock: 15,
    category: "tangem",
    image_url: "https://shop.tangem.com/cdn/shop/files/wallet_3_card_en.png?v=1699356965&width=600",
    features: ["NFC technology", "No battery needed", "Backup cards included", "25-year lifespan"]
  },
  {
    id: "tangem-3-card-orange",
    name: "Tangem Wallet 3-Card Set (Orange)",
    description: "NFC-powered crypto wallet cards. No batteries, no charging. Just tap to sign transactions.",
    price: 350,
    stock: 12,
    category: "tangem",
    image_url: "https://shop.tangem.com/cdn/shop/files/wallet_3_card_en.png?v=1699356965&width=600",
    features: ["NFC technology", "No battery needed", "Backup cards included", "25-year lifespan"]
  },
  {
    id: "tangem-3-card-ring-combo",
    name: "Tangem 3-Card + Ring Combo Set",
    description: "Ultimate Tangem bundle with 3-card wallet and matching ring. Complete NFC security solution with wearable convenience.",
    price: 350,
    stock: 8,
    category: "tangem",
    image_url: "https://shop.tangem.com/cdn/shop/files/ring_silver.png?v=1714047915&width=600",
    features: ["3 backup cards + Ring", "NFC technology", "Wearable option", "Top security EAL6+ certified"]
  },
  {
    id: "tangem-ring",
    name: "Tangem (Ring + 2 Cards)",
    description: "Wearable crypto security. Your private key on your finger. Introducing the world's first ring-shaped hardware wallet",
    price: 0,
    stock: 0,
    category: "tangem",
    popular: true,
    image_url: "https://i.imgur.com/mms7jCX.png",
    features: ["Wearable NFC ring", "Water-resistant", "Premium titanium"]
  },
  // Remaining Ledger Products (Affiliate)
  {
    id: "ledger-nano-s-plus",
    name: "Ledger Nano S Plus",
    description: "Keep your private keys securely offline and far from hackers' reach with Ledger's classic self-custody solution, powered by the Secure Element chip and Ledger OS™. Pair this signer with the Ledger Wallet™",
    price: 279,
    stock: 5,
    category: "ledger",
    popular: true,
    image_url: "https://i.imgur.com/pNhT5x7.png",
    features: ["Supports 5,500+ coins and tokens", "Monochrome OLED display", "Secure Element Chip: ST33K1M5"]
  }
];

// ProductCard component for individual product display, including variants and stock management
const ProductCard = ({ product, onPaymentSuccess, index, handleLedgerClick, addToCart }) => {
  // State to manage the currently selected variant
  const [selectedVariantId, setSelectedVariantId] = useState(() => {
    // Initialize to the first variant's ID if variants exist, otherwise null
    return product.variants && product.variants.length > 0 ? product.variants[0].id : null;
  });




  // Find the selected variant object
  const selectedVariant = product.variants ? product.variants.find(v => v.id === selectedVariantId) : null;

  // Derive current product details based on selected variant or base product
  const currentPrice = selectedVariant?.price ?? product.price ?? 0;
  const currentStock = selectedVariant?.stock ?? product.stock ?? 0;
  const currentProductName = selectedVariant?.name ?? product.name ?? 'Product';
  const currentProductDescription = selectedVariant?.description ?? product.description ?? '';
  const currentProductFeatures = selectedVariant?.features ?? product.features ?? [];

  const totalPrice = currentPrice;
  const totalDescription = currentProductName;

  // Check if this is a Tangem product or Bundle
  const isTangemProduct = product.category === "tangem";
  const isBundleProduct = product.category === "bundle";
  // Only match products that specifically have "Ring" in the product name (for affiliate link)
  const isTangemRing = product.name?.includes("(Ring") || product.name?.includes("Ring +");

  // Determine the image to display
  const getProductImage = (product, variant) => {
    // Prioritize variant image if available
    if (variant && variant.image_url) {
      return variant.image_url;
    }
    // Fallback to product image
    if (product.image_url) return product.image_url;

    // Fallback images based on product name/category
    if (product.category === "tangem") {
      if (product.name?.includes("3-Card")) {
        return "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop";
      }
      return "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop";
    }

    if (product.category === "ledger") {
      if (product.name?.includes("Nano X")) {
        return "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop";
      }
      if (product.name?.includes("Stax")) {
        return "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop";
      }
      return "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop";
    }

    if (product.category === "keystone") {
      if (product.name?.includes("Essential")) {
        return "https://i.ibb.co/C0f9W1G/keystone-essential.webp";
      }
      if (product.name?.includes("Pro")) {
        return "https://i.ibb.co/y4YmX4M/keystone-pro.webp";
      }
      return "https://i.ibb.co/C0f9W1G/keystone-essential.webp";
    }

    if (product.category === "bundle") {
      return "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=300&fit=crop";
    }

    return null;
  };

  const isOutOfStock = currentStock <= 0;

  const handleStripeCheckout = async () => {
    // For now, redirect to WhatsApp order since Stripe requires backend
    const message = encodeURIComponent(`Hi! I'd like to purchase: ${currentProductName} (RM ${currentPrice.toFixed(2)}) - Card Payment`);
    window.open(`https://wa.me/601166736549?text=${message}`, '_blank');
  };

  const handleOrderClick = () => {
    const message = encodeURIComponent(`Hi! I'd like to order: ${currentProductName} (RM ${currentPrice.toFixed(2)})`);
    window.open(`https://wa.me/601166736549?text=${message}`, '_blank');
  };

  const handleTangemRingClick = () => {
    window.open('https://tangem.com/invite/9WE9AP', '_blank');
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      variantId: selectedVariantId,
      name: currentProductName,
      description: currentProductDescription,
      price: currentPrice,
      quantity: 1,
      stock: currentStock,
      image_url: getProductImage(product, selectedVariant)
    };

    addToCart(cartItem);
  };


  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="glass-card hover:glow-effect transition-all duration-300 h-full flex flex-col border-[#00ffc6]/20 group">
        <CardHeader>
          {product.popular && !isTangemRing && (
            <Badge className="absolute top-4 right-4 bg-[#00ffc6] text-[#071018] font-bold">
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          {isTangemRing && (
            <Badge className="absolute top-4 right-4 bg-purple-500 text-white font-bold">
              <Gift className="w-3 h-3 mr-1" />
              10% OFF
            </Badge>
          )}
          <div className="aspect-video bg-gradient-to-br from-[#0b2221] to-[#021213] rounded-lg flex items-center justify-center mb-4 overflow-hidden">
            {getProductImage(product, selectedVariant) ? (
              <img
                src={getProductImage(product, selectedVariant)}
                alt={currentProductName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const parent = e.target.parentElement;
                  if (parent) {
                    if (!parent.querySelector('svg')) {
                      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                      svg.setAttribute("class", "w-16 h-16 text-[#00ffc6] opacity-50");
                      svg.setAttribute("fill", "none");
                      svg.setAttribute("stroke", "currentColor");
                      svg.setAttribute("viewBox", "0 0 24 24");
                      svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>';
                      parent.appendChild(svg);
                    }
                  }
                }}
              />
            ) : (
              <Package className="w-16 h-16 text-[#00ffc6] opacity-50" />
            )}
          </div>
          <CardTitle className="text-xl group-hover:text-[#00ffc6] transition-colors text-white">{currentProductName}</CardTitle>
          <p className="text-[#bfeee0] text-sm mt-2">{currentProductDescription}</p>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {product.variants && product.variants.length > 0 && (
            <div className="mb-4">
              <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
                <SelectTrigger className="w-full bg-[#0b2221] border-[#00ffc6]/50 text-white hover:border-[#00ffc6] transition-colors">
                  <SelectValue placeholder="Select a variant" />
                </SelectTrigger>
                <SelectContent className="bg-[#071018] border-[#00ffc6]/50 text-white">
                  {product.variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id} disabled={(variant.stock ?? 0) <= 0}>
                      {variant.name} - RM {(variant.price ?? product.price ?? 0).toFixed(2)}{' '}
                      {(variant.stock ?? 0) <= 0 ? "(Out of Stock)" : `(${variant.stock} in stock)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {currentProductFeatures && currentProductFeatures.length > 0 && (
            <ul className="space-y-2 mb-4">
              {currentProductFeatures.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#c6fff0]">
                  <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Special banner for Tangem Ring */}
          {isTangemRing && (
            <div className="mb-4 p-3 rounded-lg bg-purple-500/10 border border-purple-400/30">
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-white mb-1">🎁 Exclusive Referral Offer</p>
                  <p className="text-xs text-[#bfeee0] mb-2">
                    Purchase directly from Tangem with our affiliate link and get <strong className="text-purple-400">10% discount</strong>
                  </p>
                  <p className="text-xs text-purple-300">
                    ✓ Official Tangem store ✓ 10% OFF ✓ Worldwide shipping
                  </p>
                </div>
              </div>
            </div>
          )}



          <div className="mt-auto">
            {/* Only show price section if not Tangem Ring */}
            {!isTangemRing && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-[#00ffc6]">
                  RM {currentPrice.toFixed(2)}
                </span>
                <Badge variant="outline" className={isOutOfStock ? "border-red-500 text-red-400" : "border-green-500 text-green-400"}>
                  {isOutOfStock ? "Out of Stock" : "In Stock"}
                </Badge>
              </div>
            )}

            {/* Updated Button logic with Add to Cart */}
            {isTangemRing ? (
              <Button
                onClick={handleTangemRingClick}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-3 shadow-lg hover:shadow-xl transition-all"
              >
                <Gift className="w-5 h-5 mr-2" />
                Get 10% OFF on Tangem Store
              </Button>
            ) : product.category === "ledger" ? (
              <Button
                onClick={handleLedgerClick}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-3 shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy on Ledger Official Store
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-3"
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleStripeCheckout}
                  variant="outline"
                  className="w-full border-2 border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white font-bold py-3"
                  disabled={isOutOfStock}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
                <Button
                  onClick={handleOrderClick}
                  variant="ghost"
                  className="w-full text-[#00ffc6] hover:bg-[#00ffc6]/10 font-bold py-3"
                  disabled={isOutOfStock}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Order
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 10000],
    availability: 'all'
  });

  // Load cart from localStorage on mount
  React.useEffect(() => {
    const savedCart = localStorage.getItem('crypsafe_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('crypsafe_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.variantId === item.variantId
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const newCart = [...prevCart];
        const newQuantity = newCart[existingItemIndex].quantity + item.quantity;

        // Check stock limit
        if (newQuantity <= item.stock) {
          newCart[existingItemIndex].quantity = newQuantity;
          return newCart;
        } else {
          alert(`Only ${item.stock} items available in stock for ${item.name}`);
          return prevCart;
        }
      } else {
        // New item, add to cart
        return [...prevCart, item];
      }
    });

    // Show cart
    setCartOpen(true);
  };

  const updateQuantity = (itemId, variantId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, variantId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === itemId && item.variantId === variantId) {
          if (newQuantity <= item.stock) {
            return { ...item, quantity: newQuantity };
          } else {
            alert(`Only ${item.stock} items available in stock for ${item.name}`);
            return item;
          }
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId, variantId) => {
    setCart(prevCart =>
      prevCart.filter(item =>
        !(item.id === itemId && item.variantId === variantId)
      )
    );
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
    }
  };

  // Use static products data instead of API fetch
  const products = STATIC_PRODUCTS;
  const isLoading = false;

  const categories = [
    { id: "all", label: "All Products" },
    { id: "tangem", label: "Tangem Wallets" },
    { id: "onekey", label: "OneKey Wallets" },
    { id: "keystone", label: "Keystone Products" },
    { id: "ledger", label: "Ledger Wallets" },
    { id: "bundle", label: "Bundle Packages" }
  ];

  // Filter out gold-related products only
  const filteredProducts = React.useMemo(() => {
    let filtered = products.filter(p => {
      // Exclude gold category
      if (p.category === "gold") return false;

      // Exclude any product with "gold" in the name (case insensitive)
      if (p.name && p.name.toLowerCase().includes("gold")) return false;

      // Exclude specific gold products (10g, 50g)
      if (p.name && (p.name.includes("10g") || p.name.includes("50g") || p.name.includes("10 g") || p.name.includes("50 g"))) {
        return false;
      }

      return true;
    });

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.category));
    }

    // Apply price range filter
    filtered = filtered.filter(p => {
      const price = p.price || 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Apply availability filter
    if (filters.availability === 'in-stock') {
      filtered = filtered.filter(p => (p.stock || 0) > 0);
    } else if (filters.availability === 'out-of-stock') {
      filtered = filtered.filter(p => (p.stock || 0) <= 0);
    }

    return filtered;
  }, [products, selectedCategory, filters]);

  // onPaymentSuccess is now unused as CoinbaseButton was removed from ProductCard
  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData);
    alert('Payment successful! We will contact you shortly via WhatsApp.');
  };

  const handleLedgerClick = () => {
    window.open('https://shop.ledger.com/?r=36f598aa14f9', '_blank');
  };

  // Function to send context to WhatsApp
  const openWhatsAppWithContext = (context) => {
    const message = encodeURIComponent("Hi! I'm interested in your crypto hardware wallets. Can you help me choose the right one?");
    window.open(`https://wa.me/601166736549?text=${message}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Shop <span className="text-[#00ffc6]">Crypto Security</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto mb-3">
          <strong className="text-[#00ffc6]">Authorized Tangem Reseller</strong> in Malaysia. Verified on Tangem's official partnership page. Complete crypto security solutions - cold wallets and backup systems.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <a 
            href="https://tangem.com/en/partnership/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] text-xs font-bold border border-[#00ffc6]/50 hover:bg-[#00ffc6]/30 transition-all cursor-pointer"
          >
            ✅ Verified Tangem Reseller
          </a>
          <a 
            href="https://help.onekey.so/en/articles/11461258-onekey-reseller-network" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-400/50 hover:bg-green-500/30 transition-all cursor-pointer"
          >
            ✅ Verified OneKey Reseller
          </a>
          <a 
            href="https://keyst.one/resellers" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-400/50 hover:bg-blue-500/30 transition-all cursor-pointer"
          >
            ✅ Verified Keystone Reseller
          </a>
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-400/50">
            🤝 Ledger Affiliate Partner
          </span>
        </div>
        <p className="text-xs text-[#bfeee0] mt-3">
          Verify us: <a 
            href="https://tangem.com/en/partnership/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#00ffc6] hover:underline"
          >
            Tangem
          </a> • <a 
            href="https://help.onekey.so/en/articles/11461258-onekey-reseller-network" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-400 hover:underline"
          >
            OneKey
          </a> • <a 
            href="https://keyst.one/resellers" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Keystone
          </a>
        </p>
      </motion.div>

      {/* Official Reseller Verification Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass-card rounded-2xl p-6 mb-8 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center flex-shrink-0">
            <Shield className="w-7 h-7 text-[#071018]" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xl font-bold mb-1 text-white">🎖️ Verified Official Reseller - Tangem, OneKey & Keystone</h3>
            <p className="text-[#c6fff0] text-sm mb-2">
              <strong className="text-[#00ffc6]">CrypSafe Malaysia</strong> is officially listed on Tangem's, OneKey's, and Keystone's partnership pages. 
              100% authentic products with full manufacturer warranty and official support.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] border border-[#00ffc6]/50">
                ✅ Listed on Tangem.com
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-400/50">
                ✅ Listed on OneKey
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/50">
                ✅ Listed on Keystone
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] border border-[#00ffc6]/50">
                🎯 Direct from Manufacturer
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] border border-[#00ffc6]/50">
                📜 Full Warranty Coverage
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://tangem.com/en/partnership/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold px-6 py-3">
                <Shield className="w-5 h-5 mr-2" />
                Verify Tangem
              </Button>
            </a>
            <a href="https://help.onekey.so/en/articles/11461258-onekey-reseller-network" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold px-6 py-3">
                <Shield className="w-5 h-5 mr-2" />
                Verify OneKey
              </Button>
            </a>
            <a href="https://keyst.one/resellers" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold px-6 py-3">
                <Shield className="w-5 h-5 mr-2" />
                Verify Keystone
              </Button>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Tangem Product Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <div className="flex items-center gap-3 mb-4">
          <Play className="w-8 h-8 text-[#00ffc6]" />
          <h2 className="text-2xl font-bold text-white">See Tangem in Action</h2>
        </div>
        <p className="text-[#c6fff0] mb-6">Watch how easy it is to use your Tangem wallet - simple NFC tap technology that works with any smartphone.</p>

        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black">
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay={true}
            muted={true}
            loop={false}
            preload="metadata"
          >
            <source src="https://i.imgur.com/SbZcdHi.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>



      {/* Bundle Highlight Banner */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass-card rounded-2xl p-6 mb-8 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center flex-shrink-0">
            <Package className="w-7 h-7 text-[#071018]" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xl font-bold mb-1 text-white">💰 Save with Bundle Packages!</h3>
            <p className="text-[#c6fff0] text-sm">Get complete security solutions at discounted prices. Wallet + Backup bundles and Family packages available!</p>
          </div>
          <Button
            onClick={() => setSelectedCategory("bundle")}
            className="bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold px-6 py-3"
          >
            <Package className="w-5 h-5 mr-2" />
            View Bundles
          </Button>
        </div>
      </motion.div> */}

      {/* Shopee Store Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-8 border-2 border-[#EE4D2D]/30 glow-effect"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-full bg-[#EE4D2D] flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xl font-bold mb-1 text-white">Prefer Shopping on Shopee?</h3>
            <p className="text-[#c6fff0] text-sm">Visit our official Shopee store! Enjoy buyer protection, reviews, and fast checkout with your Shopee account.</p>
          </div>
          <a href="https://shopee.com.my/harvin5979" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#EE4D2D] hover:bg-[#d43d1f] text-white font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop on Shopee
            </Button>
          </a>
        </div>
      </motion.div>

      {/* Enhanced AI Assistant Banner with Smart Context */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-2xl p-6 mb-8 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00ffc6] to-[#00d9a8] flex items-center justify-center flex-shrink-0">
            <Bot className="w-7 h-7 text-[#071018]" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xl font-bold mb-1">🤖 AI Shopping Assistant - Now Smarter!</h3>
            <p className="text-[#c6fff0] text-sm mb-2">Get instant help with product recommendations, price comparisons, checkout assistance, and real-time order tracking!</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] border border-[#00ffc6]/50">
                ✨ Product Expert
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] border border-[#00ffc6]/50">
                📦 Order Tracking
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-[#00ffc6]/20 text-[#00ffc6] border border-[#00ffc6]/50">
                💡 Smart Recommendations
              </span>
            </div>
          </div>
          <Button
            onClick={() => openWhatsAppWithContext('shopping')}
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            className={selectedCategory === cat.id
              ? "bg-[#00ffc6] text-[#071018] font-bold hover:bg-[#00d9a8]"
              : "border-[#00ffc6] text-[#00ffc6] hover:bg-[#00ffc6] hover:text-[#071018]"}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Products Grid with Filters */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilters 
            filters={filters}
            setFilters={setFilters}
            products={products}
          />
        </div>

        {/* Products List */}
        <div className="lg:col-span-3">

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass-card border-[#00ffc6]/20">
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
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 mx-auto mb-4 text-[#00ffc6] opacity-50" />
          <p className="text-xl text-[#bfeee0]">No products match your filters</p>
          <p className="text-sm text-[#bfeee0] mt-2">Try adjusting your filter criteria</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              handleLedgerClick={handleLedgerClick}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
        </div>
      </div>

      {/* Bundle Benefits Section */}
      {/* {selectedCategory === "bundle" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass-card rounded-2xl p-8 glow-effect"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-[#00ffc6]">Why Choose Our Bundles?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="font-bold mb-2 text-white">Save Money</h4>
              <p className="text-sm text-[#bfeee0]">Get up to RM 100 off compared to buying items separately</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="font-bold mb-2 text-white">Complete Protection</h4>
              <p className="text-sm text-[#bfeee0]">Wallet + backup solution for total crypto security</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="font-bold mb-2 text-white">Priority Support</h4>
              <p className="text-sm text-[#bfeee0]">Extended consultation and premium customer service</p>
            </div>
          </div>
        </motion.div>
      )} */}

      {/* Keystone Steel Backup Section - Complete Security Add-on */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-16 glass-card rounded-2xl p-8 md:p-12 glow-effect border-2 border-blue-500/30"
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
            Your cold wallet protects you from hacks — but what protects your seed phrase? Add indestructible steel backup for complete peace of mind.
          </p>
          <div className="inline-block px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/50">
            <p className="text-sm text-blue-300">
              <strong className="text-blue-400">✅ Official Keystone Reseller</strong> — Essential security layer for ANY wallet
            </p>
          </div>
        </div> */}

        {/* Why You Need Both */}
        {/* <div className="bg-blue-900/20 border-2 border-blue-500/50 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-400 text-center">⚠️ Cold Wallet + Steel Backup = Complete Security</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-4 rounded-lg bg-[#021213]">
              <p className="text-lg font-bold mb-2 text-white">✅ Your Wallet Protects Against:</p>
              <ul className="text-sm text-[#bfeee0] space-y-1 text-left">
                <li>• Exchange hacks & bankruptcy</li>
                <li>• Online theft & malware</li>
                <li>• Unauthorized access</li>
              </ul>
            </div>
            <div className="text-center p-4 rounded-lg bg-[#021213]">
              <p className="text-lg font-bold mb-2 text-white">✅ Steel Backup Protects Against:</p>
              <ul className="text-sm text-[#bfeee0] space-y-1 text-left">
                <li>• Lost or damaged seed phrase</li>
                <li>• Fire, water & natural disasters</li>
                <li>• Paper deterioration over time</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-[#c6fff0]">
              <strong className="text-red-400">Warning:</strong> If you lose your seed phrase, <strong className="text-white">your crypto is gone forever</strong> — no one can recover it. Steel backup is your insurance.
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
                  <p className="font-bold text-white">Last Forever</p>
                  <p className="text-sm text-[#bfeee0]">304 stainless steel — corrosion resistant for decades</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Universal Compatibility</p>
                  <p className="text-sm text-[#bfeee0]">Works with ALL crypto wallets (Tangem, Ledger, MetaMask, etc.)</p>
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
                  <Button
                    onClick={() => setSelectedCategory("keystone")}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    View Product
                  </Button>
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
                  <Button
                    onClick={() => setSelectedCategory("keystone")}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    View Product
                  </Button>
                </div>
              </div> */}

              {/* Bundle Suggestion */}
              {/* <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-400/30">
                <p className="text-sm text-green-300 text-center">
                  <strong>💰 Pro Tip:</strong> Buy wallet + steel backup together and save with our bundle packages!
                </p>
                <Button
                  onClick={() => setSelectedCategory("bundle")}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white"
                >
                  View Bundle Deals
                </Button>
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
      </motion.div> */}

      {/* Keystone Steel Backup Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-16 glass-card rounded-2xl p-8 md:p-12 glow-effect border-2 border-blue-500/30"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-16 h-16 text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Protect Your Seed Phrase: <span className="text-blue-400">Keystone Steel Backup</span>
          </h2>
          <p className="text-xl text-[#c6fff0] max-w-3xl mx-auto mb-4">
            Cold wallets reduce exposure to online threats — but seed phrases still need protection. Steel backup provides a more durable storage option than paper.
          </p>
          <div className="inline-block px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/50">
            <p className="text-sm text-blue-300">
              <strong className="text-blue-400">✅ Official Keystone Reseller</strong> — Compatible with any cold wallet
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
                  <p className="text-sm text-[#bfeee0]">Designed to withstand up to 1399°C — paper burns at 233°C</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Waterproof</p>
                  <p className="text-sm text-[#bfeee0]">Stainless steel resists water and humidity damage</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Long-lasting</p>
                  <p className="text-sm text-[#bfeee0]">304 stainless steel — designed for long-term durability</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg bg-[#021213]">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Universal Compatibility</p>
                  <p className="text-sm text-[#bfeee0]">Works with all crypto wallets (Tangem, Ledger, MetaMask, etc.)</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-blue-400">📦</span> Choose Your Backup
            </h3>
            <div className="space-y-4">
              {products.filter(p => p.category === "keystone").map((product) => (
                <div key={product.id} className="p-4 rounded-lg bg-[#021213] border-2 border-blue-400/30 hover:border-blue-400/50 transition-all">
                  <h4 className="font-bold text-xl mb-2 text-white">{product.name}</h4>
                  <p className="text-[#c6fff0] text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-400">RM {product.price?.toFixed(2)}</span>
                    <Button
                      onClick={() => {
                        setSelectedCategory("keystone");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      View Product
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-yellow-900/20 border-2 border-yellow-500/50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-yellow-400 text-center">⚠️ Important: Seed Phrase Security</h3>
          <p className="text-[#c6fff0] text-center">
            Losing your seed phrase typically means permanent loss of access to your crypto. Steel backup provides a more durable storage option than paper for long-term security.
          </p>
        </div>
      </motion.div>

      {/* Why Choose Tangem Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16"
      >
        <WhyChooseTangem />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <ShippingInfo />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 glass-card rounded-2xl p-8 glow-effect"
      >
        <h3 className="text-2xl font-bold mb-4 text-[#00ffc6]">Why Buy from CrypSafe?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold mb-2 text-white">✅ Official Tangem & Keystone Reseller</h4>
            <p className="text-sm text-[#bfeee0]">Authentic products sold directly by us with full manufacturer warranty and local stock</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-white">🚀 Local Support & Fast Delivery</h4>
            <p className="text-sm text-[#bfeee0]">Setup assistance in Bahasa Malaysia & English. Ships from Malaysia (2-6 business days)</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-white">💳 Flexible Payment</h4>
            <p className="text-sm text-[#bfeee0]">FPX, Credit Card, or Crypto payments accepted. Instant payment confirmation</p>
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