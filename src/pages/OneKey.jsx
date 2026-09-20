import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CheckCircle, Star, Package, Shield, Code, Globe, Zap, MessageCircle, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import ShoppingCartComponent from "../components/shop/ShoppingCart";

const onekeyFeatures = [
  {
    icon: Code,
    title: "100% Open Source",
    description: "Fully auditable code. Anyone can verify the security and transparency of OneKey wallets.",
    color: "from-green-400 to-green-600"
  },
  {
    icon: Shield,
    title: "Multi-Chain Support",
    description: "Support for Bitcoin, Ethereum, Solana, and 50+ blockchains in one device.",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Globe,
    title: "Cross-Platform",
    description: "Works seamlessly across desktop, mobile, and web with intuitive interfaces.",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Zap,
    title: "Secure Element Chip",
    description: "Bank-grade security chip (CC EAL6+) protects your private keys offline.",
    color: "from-[#00ffc6] to-[#00d9a8]"
  }
];

const idealFor = [
  "Open-source enthusiasts who value transparency",
  "Multi-chain users managing diverse portfolios",
  "Tech-savvy users who want full control",
  "Privacy-conscious individuals",
  "Users who prefer desktop + mobile flexibility"
];

// Hardcoded OneKey products
const ONEKEY_PRODUCTS = [
  {
    id: "onekey-classic-1s-pure",
    name: "OneKey Classic 1S Pure",
    description: "Ultra-affordable entry-level hardware wallet with essential security for crypto beginners.",
    price: 310,
    stock: 10,
    popular: false,
    image_url: "https://i.imgur.com/KzoBv6J.png",
    features: [
      "EAL 6+ Secure Element Chip",
      "Bluetooth & USB-C connectivity",
      "Security Key functionality"
    ]
  },
  {
    id: "onekey-pro-white",
    name: "OneKey Pro - White",
    description: "Premium open-source hardware wallet with 3.5\" touchscreen, multi-chain support, and air-gapped security.",
    price: 1100,
    stock: 5,
    popular: false,
    image_url: "https://i.imgur.com/Eeq97cA.png",
    features: [
      "EAL 6+ Secure Element Chip",
      "Air-gapped Signing",
      "Fingerprint sensor"
    ]
  },
  {
    id: "onekey-pro-black",
    name: "OneKey Pro - Black",
    description: "Premium open-source hardware wallet with 3.5\" touchscreen, multi-chain support, and air-gapped security.",
    price: 1100,
    stock: 5,
    popular: false,
    image_url: "https://i.imgur.com/5aN1PSF.png",
    features: [
      "EAL 6+ Secure Element Chip",
      "Air-gapped Signing",
      "Fingerprint sensor"
    ]
  },
  {
    id: "onekey-classic-1s",
    name: "OneKey Classic 1S",
    description: "Affordable open-source hardware wallet with essential security features and wide crypto support.",
    price: 400,
    stock: 10,
    popular: true,
    image_url: "https://i.imgur.com/J0NoiXJ.jpeg",
    features: [
      "EAL 6+ Secure Element Chip",
      "Bluetooth & USB-C connectivity",
      "Security Key functionality"
    ]
  }
];

const ProductCard = ({ product, index, addToCart }) => {
  const [selectedVariantId, setSelectedVariantId] = useState(() => {
    return product.variants && product.variants.length > 0 ? product.variants[0].id : null;
  });

  const selectedVariant = product.variants ? product.variants.find(v => v.id === selectedVariantId) : null;

  const currentPrice = selectedVariant?.price ?? product.price ?? 0;
  const currentStock = selectedVariant?.stock ?? product.stock ?? 0;
  const currentProductName = selectedVariant?.name ?? product.name ?? 'Product';
  const currentProductDescription = selectedVariant?.description ?? product.description ?? '';
  const currentProductFeatures = selectedVariant?.features ?? product.features ?? [];

  const getProductImage = (product, variant) => {
    if (variant && variant.image_url) {
      return variant.image_url;
    }
    if (product.image_url) return product.image_url;
    return "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop";
  };

  const isOutOfStock = currentStock <= 0;


  const handleOrderClick = () => {
    const message = encodeURIComponent(`Hi! I'd like to order: ${currentProductName} (RM ${currentPrice.toFixed(2)})`);
    window.open(`https://wa.me/601166736549?text=${message}`, '_blank');
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
          {product.popular && (
            <Badge className="absolute top-4 right-4 bg-[#00ffc6] text-[#071018] font-bold">
              <Star className="w-3 h-3 mr-1" />
              Popular
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
                  if (parent && !parent.querySelector('svg')) {
                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg.setAttribute("class", "w-16 h-16 text-[#00ffc6] opacity-50");
                    svg.setAttribute("fill", "none");
                    svg.setAttribute("stroke", "currentColor");
                    svg.setAttribute("viewBox", "0 0 24 24");
                    svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>';
                    parent.appendChild(svg);
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

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-[#00ffc6]">
                RM {currentPrice.toFixed(2)}
              </span>
              <Badge variant="outline" className={isOutOfStock ? "border-red-500 text-red-400" : "border-green-500 text-green-400"}>
                {isOutOfStock ? "Out of Stock" : "In Stock"}
              </Badge>
            </div>

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
                onClick={handleOrderClick}
                variant="ghost"
                className="w-full text-[#00ffc6] hover:bg-[#00ffc6]/10 font-bold py-3"
                disabled={isOutOfStock}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Order
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function OneKey() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

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

  React.useEffect(() => {
    localStorage.setItem('crypsafe_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.variantId === item.variantId
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        const newQuantity = newCart[existingItemIndex].quantity + item.quantity;

        if (newQuantity <= item.stock) {
          newCart[existingItemIndex].quantity = newQuantity;
          return newCart;
        } else {
          alert(`Only ${item.stock} items available in stock for ${item.name}`);
          return prevCart;
        }
      } else {
        return [...prevCart, item];
      }
    });

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

  // Use hardcoded products
  const products = ONEKEY_PRODUCTS;
  const isLoading = false;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Shop <span className="text-[#00ffc6]">OneKey Wallets</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto mb-3">
          <strong className="text-[#00ffc6]">Authorized OneKey Reseller</strong> in Malaysia. Open-source hardware wallets with multi-chain support and bank-grade security.
        </p>
        <div className="inline-block px-4 py-2 rounded-lg bg-green-500/20 border border-green-400/50">
          <p className="text-sm text-green-300">
            <strong className="text-green-400">✅ Official OneKey Reseller</strong> — Verified on OneKey's reseller network
          </p>
        </div>
        <p className="text-xs text-[#bfeee0] mt-3">
          <a 
            href="https://help.onekey.so/en/articles/11461258-onekey-reseller-network" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-400 hover:underline"
          >
            Verify our reseller status on OneKey.so →
          </a>
        </p>
      </motion.div>

      {/* OneKey Product Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <div className="flex items-center gap-3 mb-4">
          <Play className="w-8 h-8 text-[#00ffc6]" />
          <h2 className="text-2xl font-bold text-white">See OneKey in Action</h2>
        </div>
        <p className="text-[#c6fff0] mb-6">Watch how OneKey's open-source hardware wallet provides bank-grade security with multi-chain support and seamless cross-platform compatibility.</p>

        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black">
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay={false}
            muted={true}
            loop={false}
            preload="metadata"
          >
            <source src="https://i.imgur.com/GbA0r1E.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>

      {/* OneKey Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Why Choose <span className="text-[#00ffc6]">OneKey?</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {onekeyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="glass-card h-full hover:glow-effect transition-all duration-300 border-[#00ffc6]/20">
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
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-8 mb-12 border-2 border-[#00ffc6]/30 glow-effect"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          <span className="text-[#00ffc6]">Ideal For</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {idealFor.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-[#0b2221]">
              <CheckCircle className="w-5 h-5 text-[#00ffc6] mt-0.5 flex-shrink-0" />
              <p className="text-[#c6fff0]">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Available <span className="text-[#00ffc6]">Products</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ONEKEY_PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              addToCart={addToCart}
            />
          ))}
        </div>
      </motion.div>

      {/* Why Buy from CrypSafe */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-8 glow-effect"
      >
        <h3 className="text-2xl font-bold mb-4 text-[#00ffc6]">Why Buy from CrypSafe?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold mb-2 text-white">✅ Official OneKey Reseller</h4>
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