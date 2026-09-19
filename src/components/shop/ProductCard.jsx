import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CheckCircle, Star, Package } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import CoinbaseButton from "./CoinbaseButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProductCard({ product, onPaymentSuccess, index = 0 }) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.has_variants && product.variants?.length > 0 ? product.variants[0].id : null
  );

  const selectedVariant = product.variants?.find(v => v.id === selectedVariantId);

  // Get current values with proper fallbacks
  const currentPrice = selectedVariant?.price ?? product.price ?? 0;
  const currentStock = selectedVariant?.stock ?? product.stock ?? 0;
  const currentCoinbaseProductId = selectedVariant?.coinbase_product_id ?? product.coinbase_product_id;
  const currentProductName = selectedVariant?.name ? `${product.name} - ${selectedVariant.name}` : product.name;
  const currentImage = selectedVariant?.image_url ?? product.image_url;

  const isOutOfStock = currentStock <= 0;

  const getProductImage = (imgUrl) => {
    if (imgUrl) return imgUrl;
    
    if (product.category === "tangem") {
      return "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop";
    }
    if (product.category === "ledger") {
      return "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop";
    }
    if (product.category === "bundle") {
      return "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=300&fit=crop";
    }
    return null;
  };

  const handleLedgerClick = () => {
    window.open('https://shop.ledger.com/?r=36f598aa14f9', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="glass-card hover:glow-effect transition-all duration-300 h-full flex flex-col border-[#00ffc6]/20 group">
        <CardHeader>
          {product.popular && (
            <Badge className="absolute top-4 right-4 bg-[#00ffc6] text-[#071018] font-bold z-10">
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          <div className="aspect-video bg-gradient-to-br from-[#0b2221] to-[#021213] rounded-lg flex items-center justify-center mb-4 overflow-hidden">
            {getProductImage(currentImage) ? (
              <img 
                src={getProductImage(currentImage)} 
                alt={product.name}
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
          <CardTitle className="text-xl group-hover:text-[#00ffc6] transition-colors text-white">
            {product.name}
          </CardTitle>
          <p className="text-[#bfeee0] text-sm mt-2">{product.description}</p>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {product.has_variants && product.variants && product.variants.length > 0 && (
            <div className="mb-4">
              <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
                <SelectTrigger className="w-full bg-[#0b2221] border-[#00ffc6]/50 text-white hover:border-[#00ffc6] transition-colors">
                  <SelectValue placeholder="Select a variant" />
                </SelectTrigger>
                <SelectContent className="bg-[#071018] border-[#00ffc6]/50 text-white">
                  {product.variants.map((variant) => (
                    <SelectItem 
                      key={variant.id} 
                      value={variant.id}
                      disabled={(variant.stock ?? 0) <= 0}
                    >
                      {variant.name} - RM {(variant.price ?? product.price ?? 0).toFixed(2)}{' '}
                      {(variant.stock ?? 0) <= 0 ? "(Out of Stock)" : `(${variant.stock} in stock)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <ul className="space-y-2 mb-4">
              {product.features.slice(0, 3).map((feature, i) => (
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
              <Badge 
                variant="outline" 
                className={isOutOfStock ? "border-red-500 text-red-400" : "border-green-500 text-green-400"}
              >
                {isOutOfStock ? "Out of Stock" : `${currentStock} in stock`}
              </Badge>
            </div>

            {product.category === "ledger" ? (
              <Button
                onClick={handleLedgerClick}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-3 shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy on Ledger Official Store
              </Button>
            ) : (
              <div className="space-y-3">
                <CoinbaseButton
                  productId={currentCoinbaseProductId || 'SETUP_REQUIRED'}
                  productName={currentProductName}
                  price={currentPrice}
                  onPaymentSuccess={onPaymentSuccess}
                  disabled={isOutOfStock}
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#00ffc6]/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-[#071018] px-2 text-[#bfeee0]">or</span>
                  </div>
                </div>

                <Link to={createPageUrl("Payment")} className="block">
                  <Button
                    variant="outline"
                    className="w-full border-[#00ffc6] text-[#00ffc6] hover:bg-[#00ffc6] hover:text-[#071018] font-bold"
                    disabled={isOutOfStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Other Payment Methods
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}