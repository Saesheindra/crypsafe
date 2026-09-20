import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function MyOrders() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">My Orders</h1>
        <p className="text-[#c6fff0]">Track and manage your orders</p>
      </motion.div>

      <Card className="glass-card border-[#00ffc6]/20">
        <CardContent className="pt-6 text-center py-12">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[#00ffc6] opacity-50" />
          <h3 className="text-xl font-bold text-white mb-2">Order Tracking</h3>
          <p className="text-[#c6fff0] mb-4">
            To track your order, please contact us via WhatsApp with your order details.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => navigate(createPageUrl("Shop"))}
              className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018]"
            >
              <Package className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
            <a
              href="https://wa.me/601166736549?text=Hi,%20I'd%20like%20to%20check%20on%20my%20order%20status"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#25D366] hover:bg-[#20ba5a] text-white">
                Contact via WhatsApp
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
