import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminInventory() {
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

      <Card className="glass-card border-[#00ffc6]/20">
        <CardContent className="p-12 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white mb-2">Admin Backend Removed</h2>
          <p className="text-[#bfeee0] mb-4">
            The inventory management functionality has been removed.
          </p>
          <p className="text-sm text-[#bfeee0]">
            Contact the development team to set up a new backend solution.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
