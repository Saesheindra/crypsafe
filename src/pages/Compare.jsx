import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, X, Star, ShoppingCart, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";


export default function Compare() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['compare-products'],
    queryFn: () => base44.entities.Product.list('-created_date'),
    initialData: [],
  });



  // Filter only main wallet products (exclude accessories and variants)
  const walletProducts = products.filter(p => 
    ['tangem', 'onekey', 'keystone'].includes(p.category) &&
    !p.name?.toLowerCase().includes('bundle') &&
    !p.name?.toLowerCase().includes('backup')
  );

  // Group products by brand
  const productsByBrand = {
    tangem: walletProducts.filter(p => p.category === 'tangem'),
    onekey: walletProducts.filter(p => p.category === 'onekey'),
    keystone: walletProducts.filter(p => p.category === 'keystone')
  };

  const toggleProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else if (selectedProducts.length < 4) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };



  const compareProducts = selectedProducts
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  const comparisonFeatures = [
    { key: 'price', label: 'Price', format: (val) => `RM ${val?.toFixed(2) || 'N/A'}` },
    { key: 'category', label: 'Brand', format: (val) => val?.toUpperCase() || 'N/A' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Compare <span className="text-[#00ffc6]">Hardware Wallets</span>
        </h1>
        <p className="text-lg text-[#c6fff0] max-w-2xl mx-auto">
          Select up to 4 wallets to compare features, prices, and real user ratings side-by-side
        </p>
      </motion.div>

      {/* Product Selection */}
      {!productsLoading && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Select Wallets to Compare</h2>
          
          {Object.entries(productsByBrand).map(([brand, brandProducts]) => (
            brandProducts.length > 0 && (
              <div key={brand} className="mb-6">
                <h3 className="text-xl font-bold text-[#00ffc6] mb-3 capitalize">{brand}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {brandProducts.map((product) => {
                    const isSelected = selectedProducts.includes(product.id);

                    return (
                      <Card
                        key={product.id}
                        className={`glass-card cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#00ffc6] border-2 glow-effect'
                            : 'border-[#00ffc6]/20 hover:border-[#00ffc6]/50'
                        }`}
                        onClick={() => toggleProduct(product.id)}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleProduct(product.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <h4 className="font-bold text-white mb-2">{product.name}</h4>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl font-bold text-[#00ffc6]">
                                  RM {product.price?.toFixed(2)}
                                </span>
                              </div>

                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Comparison Table */}
      {compareProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Comparison</h2>
          
          <div className="overflow-x-auto">
            <div className="glass-card rounded-xl border-[#00ffc6]/20 p-6">
              <div className="grid gap-6" style={{ gridTemplateColumns: `200px repeat(${compareProducts.length}, 1fr)` }}>
                {/* Header Row - Product Names */}
                <div></div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="text-center">
                    <h3 className="font-bold text-white mb-2">{product.name}</h3>
                    <Button
                      onClick={() => toggleProduct(product.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                {/* Product Images */}
                <div className="font-bold text-[#00ffc6]">Product</div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="bg-[#0b2221] rounded-lg p-3 flex items-center justify-center min-h-[120px]">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="max-h-24 object-contain" />
                    ) : (
                      <Shield className="w-12 h-12 text-[#00ffc6] opacity-50" />
                    )}
                  </div>
                ))}

                {/* Basic Comparison Fields */}
                {comparisonFeatures.map((feature) => (
                  <React.Fragment key={feature.key}>
                    <div className="font-bold text-[#00ffc6] py-3">{feature.label}</div>
                    {compareProducts.map((product) => {
                      const value = product[feature.key];
                      return (
                        <div key={product.id} className="bg-[#0b2221] rounded-lg p-3 text-center text-white py-3">
                          {feature.format(value)}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}

                {/* Features Comparison */}
                <div className="font-bold text-[#00ffc6] py-3">Key Features</div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="bg-[#0b2221] rounded-lg p-3">
                    {product.features && product.features.length > 0 ? (
                      <ul className="space-y-2">
                        {product.features.slice(0, 5).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-[#c6fff0]">
                            <CheckCircle className="w-4 h-4 text-[#00ffc6] mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[#bfeee0]">No features listed</p>
                    )}
                  </div>
                ))}

                {/* Stock Status */}
                <div className="font-bold text-[#00ffc6] py-3">Availability</div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="bg-[#0b2221] rounded-lg p-3 text-center py-3">
                    <Badge className={product.stock > 0 ? "bg-green-500/20 text-green-400 border-green-500/50" : "bg-red-500/20 text-red-400 border-red-500/50"}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="font-bold text-[#00ffc6] py-3">Action</div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="bg-[#0b2221] rounded-lg p-3 text-center py-3">
                    {product.category === 'tangem' ? (
                      <Link to={createPageUrl("Shop")}>
                        <Button className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] w-full">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    ) : product.category === 'onekey' ? (
                      <Link to={createPageUrl("OneKey")}>
                        <Button className="bg-green-500 hover:bg-green-600 text-white w-full">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    ) : (
                      <Link to={createPageUrl("Keystone")}>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {compareProducts.length === 0 && (
        <Card className="glass-card border-[#00ffc6]/20">
          <CardContent className="pt-6 text-center py-12">
            <Shield className="w-16 h-16 mx-auto mb-4 text-[#00ffc6] opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">Start Comparing</h3>
            <p className="text-[#c6fff0]">Select 2-4 wallets above to see a detailed comparison</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Comparison Summary */}
      {compareProducts.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-8 border-[#00ffc6]/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Quick Summary</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-[#00ffc6] mb-3">💰 Best Value</h4>
              <p className="text-white">
                {compareProducts.sort((a, b) => (a.price || 0) - (b.price || 0))[0]?.name}
                <span className="text-[#bfeee0] ml-2">
                  (RM {compareProducts.sort((a, b) => (a.price || 0) - (b.price || 0))[0]?.price?.toFixed(2)})
                </span>
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#00ffc6] mb-3">📦 Most Features</h4>
              <p className="text-white">
                {compareProducts.sort((a, b) => (b.features?.length || 0) - (a.features?.length || 0))[0]?.name}
                <span className="text-[#bfeee0] ml-2">
                  ({compareProducts.sort((a, b) => (b.features?.length || 0) - (a.features?.length || 0))[0]?.features?.length || 0} features)
                </span>
              </p>
            </div>

          </div>
        </motion.div>
      )}


    </div>
  );
}