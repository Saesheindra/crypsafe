import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Minus, AlertCircle, Loader2, Edit2, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminInventory() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [stockChanges, setStockChanges] = useState({});
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date'),
    initialData: [],
  });

  const updateStockMutation = useMutation({
    mutationFn: async ({ productId, updates }) => {
      await base44.entities.Product.update(productId, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success("Stock updated successfully");
      setEditingProduct(null);
      setStockChanges({});
    },
    onError: (error) => {
      toast.error(`Failed to update stock: ${error.message}`);
    },
  });

  const handleStockChange = (productId, variantIndex, newStock) => {
    setStockChanges(prev => ({
      ...prev,
      [`${productId}-${variantIndex}`]: parseInt(newStock) || 0
    }));
  };

  const handleSaveStock = (product) => {
    if (product.has_variants) {
      const updatedVariants = product.variants.map((variant, index) => ({
        ...variant,
        stock: stockChanges[`${product.id}-${index}`] ?? variant.stock
      }));
      updateStockMutation.mutate({
        productId: product.id,
        updates: { variants: updatedVariants }
      });
    } else {
      const newStock = stockChanges[`${product.id}-simple`] ?? product.stock;
      updateStockMutation.mutate({
        productId: product.id,
        updates: { stock: newStock }
      });
    }
  };

  const quickAdjust = (product, variantIndex, amount) => {
    if (product.has_variants) {
      const currentStock = stockChanges[`${product.id}-${variantIndex}`] ?? product.variants[variantIndex].stock;
      const newStock = Math.max(0, currentStock + amount);
      handleStockChange(product.id, variantIndex, newStock);
    } else {
      const currentStock = stockChanges[`${product.id}-simple`] ?? product.stock;
      const newStock = Math.max(0, currentStock + amount);
      setStockChanges(prev => ({
        ...prev,
        [`${product.id}-simple`]: newStock
      }));
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#00ffc6]" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
        <h1 className="text-2xl font-bold mb-2 text-white">Access Denied</h1>
        <p className="text-[#bfeee0]">This page is only accessible to administrators.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-8 h-8 text-[#00ffc6]" />
          <h1 className="text-4xl font-bold text-white">Inventory Management</h1>
        </div>
        <p className="text-[#c6fff0]">Manage stock levels for all products and variants</p>
      </motion.div>

      {productsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#00ffc6]" />
        </div>
      ) : (
        <div className="grid gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass-card border-[#00ffc6]/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-20 h-20 rounded-lg bg-[#0b2221] flex items-center justify-center overflow-hidden">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-8 h-8 text-[#00ffc6] opacity-50" />
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white mb-2">{product.name}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-[#00ffc6] text-[#00ffc6]">
                            {product.category}
                          </Badge>
                          <Badge variant="outline" className="border-blue-400 text-blue-400">
                            RM {product.price.toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {product.has_variants && product.variants && product.variants.length > 0 ? (
                    <div className="space-y-4">
                      <h4 className="font-bold text-white mb-3">Variants:</h4>
                      {product.variants.map((variant, variantIndex) => {
                        const key = `${product.id}-${variantIndex}`;
                        const currentStock = stockChanges[key] ?? variant.stock;
                        const hasChanges = stockChanges[key] !== undefined;
                        
                        return (
                          <div key={variantIndex} className="flex items-center gap-4 p-4 rounded-lg bg-[#0b2221]">
                            <div className="flex-1">
                              <p className="font-semibold text-white">{variant.name}</p>
                              <p className="text-xs text-[#bfeee0]">SKU: {variant.sku || 'N/A'}</p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => quickAdjust(product, variantIndex, -1)}
                                className="border-red-400 text-red-400 hover:bg-red-400/10"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              
                              <Input
                                type="number"
                                value={currentStock}
                                onChange={(e) => handleStockChange(product.id, variantIndex, e.target.value)}
                                className="w-20 text-center bg-[#071018] border-[#00ffc6]/30 text-white"
                                min="0"
                              />
                              
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => quickAdjust(product, variantIndex, 1)}
                                className="border-green-400 text-green-400 hover:bg-green-400/10"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>

                              <Badge className={currentStock > 5 ? "bg-green-500" : currentStock > 0 ? "bg-yellow-500" : "bg-red-500"}>
                                {currentStock} {hasChanges && "→"} in stock
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                      {Object.keys(stockChanges).some(k => k.startsWith(product.id)) && (
                        <div className="flex gap-2 justify-end pt-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              const keys = Object.keys(stockChanges).filter(k => k.startsWith(product.id));
                              const newChanges = {...stockChanges};
                              keys.forEach(k => delete newChanges[k]);
                              setStockChanges(newChanges);
                            }}
                            className="border-[#00ffc6] text-[#00ffc6]"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleSaveStock(product)}
                            className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-[#0b2221]">
                      <div className="flex-1">
                        <p className="font-semibold text-white">Total Stock</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => quickAdjust(product, 'simple', -1)}
                          className="border-red-400 text-red-400 hover:bg-red-400/10"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <Input
                          type="number"
                          value={stockChanges[`${product.id}-simple`] ?? product.stock}
                          onChange={(e) => setStockChanges(prev => ({
                            ...prev,
                            [`${product.id}-simple`]: parseInt(e.target.value) || 0
                          }))}
                          className="w-20 text-center bg-[#071018] border-[#00ffc6]/30 text-white"
                          min="0"
                        />
                        
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => quickAdjust(product, 'simple', 1)}
                          className="border-green-400 text-green-400 hover:bg-green-400/10"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>

                        <Badge className={(stockChanges[`${product.id}-simple`] ?? product.stock) > 5 ? "bg-green-500" : (stockChanges[`${product.id}-simple`] ?? product.stock) > 0 ? "bg-yellow-500" : "bg-red-500"}>
                          {stockChanges[`${product.id}-simple`] ?? product.stock} in stock
                        </Badge>

                        {stockChanges[`${product.id}-simple`] !== undefined && (
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => {
                                const newChanges = {...stockChanges};
                                delete newChanges[`${product.id}-simple`];
                                setStockChanges(newChanges);
                              }}
                              className="border-[#00ffc6] text-[#00ffc6]"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              onClick={() => handleSaveStock(product)}
                              className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018]"
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}