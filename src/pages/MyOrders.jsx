import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, ShoppingBag, Truck, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function MyOrders() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => base44.auth.me(),
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['my-orders', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      return await base44.entities.Shipment.filter(
        { customer_email: user.email },
        '-created_date'
      );
    },
    enabled: !!user?.email,
    initialData: [],
  });

  const reorderMutation = useMutation({
    mutationFn: async (order) => {
      // Add order items back to cart
      const cart = JSON.parse(localStorage.getItem('crypsafe_cart') || '[]');
      // For now, redirect to shop - in production, you'd parse order items
      navigate(createPageUrl("Shop"));
    },
  });

  if (userLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-[#c6fff0]">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="glass-card border-[#00ffc6]/20 max-w-md mx-auto">
          <CardContent className="pt-6 text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-[#00ffc6] opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">Sign In Required</h3>
            <p className="text-[#c6fff0] mb-4">Please sign in to view your orders</p>
            <Button
              onClick={() => base44.auth.redirectToLogin(window.location.href)}
              className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018]"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    label_generated: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    picked_up: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    in_transit: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    out_for_delivery: "bg-green-500/20 text-green-400 border-green-500/50",
    delivered: "bg-green-500/20 text-green-400 border-green-500/50",
    failed: "bg-red-500/20 text-red-400 border-red-500/50",
    returned: "bg-gray-500/20 text-gray-400 border-gray-500/50"
  };

  const statusIcons = {
    pending: Clock,
    label_generated: Package,
    picked_up: Truck,
    in_transit: Truck,
    out_for_delivery: Truck,
    delivered: CheckCircle,
    failed: Package,
    returned: Package
  };

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

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["all", "pending", "in_transit", "delivered"].map((status) => (
          <Button
            key={status}
            onClick={() => setFilterStatus(status)}
            variant={filterStatus === status ? "default" : "outline"}
            size="sm"
            className={filterStatus === status
              ? "bg-[#00ffc6] text-[#071018] font-bold"
              : "border-[#00ffc6]/50 text-[#00ffc6] hover:bg-[#00ffc6] hover:text-[#071018]"}
          >
            {status === "all" ? "All Orders" : status.replace(/_/g, " ")}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      {ordersLoading ? (
        <p className="text-center text-[#c6fff0]">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <Card className="glass-card border-[#00ffc6]/20">
          <CardContent className="pt-6 text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[#00ffc6] opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">No Orders Found</h3>
            <p className="text-[#c6fff0] mb-4">You haven't placed any orders yet</p>
            <Button
              onClick={() => navigate(createPageUrl("Shop"))}
              className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018]"
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => {
            const StatusIcon = statusIcons[order.status] || Package;
            
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card border-[#00ffc6]/20 hover:glow-effect transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-white mb-2">
                          Order #{order.order_id || order.id.slice(0, 8)}
                        </CardTitle>
                        <p className="text-sm text-[#bfeee0]">
                          Placed on {format(new Date(order.created_date), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                      <Badge className={statusColors[order.status]}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {order.status.replace(/_/g, " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Shipping Info */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-bold text-[#00ffc6] mb-1">Shipping Address</h4>
                          <p className="text-sm text-[#c6fff0]">
                            {order.shipping_address}<br />
                            {order.city}, {order.state} {order.postcode}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#00ffc6] mb-1">Contact</h4>
                          <p className="text-sm text-[#c6fff0]">
                            {order.customer_name}<br />
                            {order.customer_phone}
                          </p>
                        </div>
                      </div>

                      {/* Tracking Info */}
                      {order.tracking_number && (
                        <div className="p-3 rounded-lg bg-[#0b2221] border border-[#00ffc6]/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-[#bfeee0] mb-1">Tracking Number</p>
                              <p className="font-bold text-white">{order.tracking_number}</p>
                              <p className="text-xs text-[#bfeee0] mt-1">Courier: {order.courier?.toUpperCase()}</p>
                            </div>
                            {order.tracking_number && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-[#00ffc6] text-[#00ffc6]"
                                onClick={() => window.open(`https://www.google.com/search?q=${order.courier}+tracking+${order.tracking_number}`, '_blank')}
                              >
                                <Truck className="w-4 h-4 mr-2" />
                                Track
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Order Total */}
                      {order.declared_value && (
                        <div className="flex justify-between items-center pt-3 border-t border-[#00ffc6]/20">
                          <span className="text-[#bfeee0]">Order Total</span>
                          <span className="text-xl font-bold text-[#00ffc6]">RM {order.declared_value.toFixed(2)}</span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 pt-3">
                        <Button
                          onClick={() => reorderMutation.mutate(order)}
                          variant="outline"
                          className="border-[#00ffc6] text-[#00ffc6] hover:bg-[#00ffc6] hover:text-[#071018]"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Reorder
                        </Button>
                        <a
                          href={`https://wa.me/601166736549?text=${encodeURIComponent(`Hi, I have a question about my order #${order.order_id || order.id.slice(0, 8)}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="border-[#25D366] text-[#25D366]">
                            Contact Support
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}