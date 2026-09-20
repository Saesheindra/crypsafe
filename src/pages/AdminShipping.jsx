import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Package, Truck, Mail, CheckCircle, Clock, AlertCircle, Loader2, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AdminShipping() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Check if user is admin
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  // Fetch all shipments
  const { data: shipments = [], isLoading: shipmentsLoading } = useQuery({
    queryKey: ['shipments'],
    queryFn: async () => {
      try {
        const result = await base44.entities.Shipment.list('-created_date');
        return Array.isArray(result) ? result : [];
      } catch (error) {
        console.error('Failed to fetch shipments:', error);
        return [];
      }
    },
  });

  // Send tracking email mutation
  const sendTrackingEmailMutation = useMutation({
    mutationFn: async (shipmentId) => {
      const response = await base44.functions.invoke('sendTrackingEmail', {
        shipmentId: shipmentId
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Tracking email sent successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to send email: ${error.message}`);
    },
  });

  const handleSendTrackingEmail = (shipmentId) => {
    if (window.confirm('Send tracking email to customer?')) {
      sendTrackingEmailMutation.mutate(shipmentId);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending_payment: "bg-orange-500",
      pending: "bg-yellow-500",
      label_generated: "bg-blue-500",
      picked_up: "bg-purple-500",
      in_transit: "bg-indigo-500",
      out_for_delivery: "bg-orange-500",
      delivered: "bg-green-500",
      failed: "bg-red-500",
      returned: "bg-gray-500"
    };
    return colors[status] || "bg-gray-500";
  };

  const getStatusIcon = (status) => {
    if (status === 'delivered') return <CheckCircle className="w-4 h-4" />;
    if (status === 'failed' || status === 'returned') return <AlertCircle className="w-4 h-4" />;
    if (status === 'pending' || status === 'pending_payment') return <Clock className="w-4 h-4" />;
    return <Truck className="w-4 h-4" />;
  };

  // Filter shipments
  const shipmentsArray = Array.isArray(shipments) ? shipments : [];
  const filteredShipments = shipmentsArray.filter(shipment => {
    const matchesSearch = searchQuery === "" ||
      shipment.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.order_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.tracking_number?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Count by status
  const statusCounts = {
    all: shipmentsArray.length,
    pending_payment: shipmentsArray.filter(s => s.status === 'pending_payment').length,
    pending: shipmentsArray.filter(s => s.status === 'pending').length,
    in_transit: shipmentsArray.filter(s => s.status === 'in_transit').length,
    delivered: shipmentsArray.filter(s => s.status === 'delivered').length,
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
          <h1 className="text-4xl font-bold text-white">Order Tracking & Management</h1>
        </div>
        <p className="text-[#c6fff0]">View and manage customer orders and shipments</p>
      </motion.div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className={`glass-card cursor-pointer transition-all ${statusFilter === 'all' ? 'border-[#00ffc6] glow-effect' : 'border-[#00ffc6]/20'}`}
          onClick={() => setStatusFilter('all')}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{statusCounts.all}</div>
            <div className="text-sm text-[#bfeee0]">All Orders</div>
          </CardContent>
        </Card>
        <Card className={`glass-card cursor-pointer transition-all ${statusFilter === 'pending_payment' ? 'border-orange-500 glow-effect' : 'border-[#00ffc6]/20'}`}
          onClick={() => setStatusFilter('pending_payment')}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{statusCounts.pending_payment}</div>
            <div className="text-sm text-[#bfeee0]">Awaiting Payment</div>
          </CardContent>
        </Card>
        <Card className={`glass-card cursor-pointer transition-all ${statusFilter === 'pending' ? 'border-yellow-500 glow-effect' : 'border-[#00ffc6]/20'}`}
          onClick={() => setStatusFilter('pending')}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{statusCounts.pending}</div>
            <div className="text-sm text-[#bfeee0]">Pending Ship</div>
          </CardContent>
        </Card>
        <Card className={`glass-card cursor-pointer transition-all ${statusFilter === 'in_transit' ? 'border-blue-500 glow-effect' : 'border-[#00ffc6]/20'}`}
          onClick={() => setStatusFilter('in_transit')}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{statusCounts.in_transit}</div>
            <div className="text-sm text-[#bfeee0]">In Transit</div>
          </CardContent>
        </Card>
        <Card className={`glass-card cursor-pointer transition-all ${statusFilter === 'delivered' ? 'border-green-500 glow-effect' : 'border-[#00ffc6]/20'}`}
          onClick={() => setStatusFilter('delivered')}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{statusCounts.delivered}</div>
            <div className="text-sm text-[#bfeee0]">Delivered</div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#bfeee0]" />
          <Input
            placeholder="Search by customer name, order ID, or tracking number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#0b2221] border-[#00ffc6]/50 text-white"
          />
        </div>
      </div>

      <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
        <p className="text-blue-300 text-sm">
          <strong>📧 Email & 📱 WhatsApp Notifications:</strong> You'll receive instant notifications for all orders (Stripe, QR, WhatsApp). Check your email (crypsafe.my@gmail.com) and WhatsApp (+60 11 6673 6549) for new orders!
        </p>
      </div>

      {shipmentsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#00ffc6]" />
        </div>
      ) : filteredShipments.length === 0 ? (
        <Card className="glass-card border-[#00ffc6]/20 text-center py-12">
          <Package className="w-16 h-16 mx-auto mb-4 text-[#00ffc6] opacity-50" />
          <p className="text-xl text-[#bfeee0]">
            {searchQuery || statusFilter !== 'all' ? 'No matching orders found' : 'No orders yet'}
          </p>
          <p className="text-sm text-[#bfeee0] mt-2">
            {searchQuery || statusFilter !== 'all' ? 'Try adjusting your filters' : 'Orders will appear here when customers complete payment'}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredShipments.map((shipment, index) => (
            <motion.div
              key={shipment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass-card border-[#00ffc6]/20 hover:glow-effect transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg ${getStatusColor(shipment.status)} flex items-center justify-center text-white`}>
                        {getStatusIcon(shipment.status)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{shipment.customer_name}</h3>
                        <p className="text-sm text-[#bfeee0] mb-2">
                          {shipment.shipping_address}, {shipment.city}, {shipment.state} {shipment.postcode}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-[#00ffc6] text-[#00ffc6]">
                            {shipment.tracking_number}
                          </Badge>
                          <Badge className={`${getStatusColor(shipment.status)} text-white`}>
                            {shipment.status.replace(/_/g, ' ').toUpperCase()}
                          </Badge>
                          {shipment.payment_method && (
                            <Badge variant="outline" className="border-purple-400 text-purple-400">
                              {shipment.payment_method}
                            </Badge>
                          )}
                          {shipment.total_amount && (
                            <Badge variant="outline" className="border-green-400 text-green-400">
                              RM {shipment.total_amount.toFixed(2)}
                            </Badge>
                          )}
                          {shipment.order_id && (
                            <Badge variant="outline" className="border-blue-400 text-blue-400">
                              Order: {shipment.order_id.slice(-8)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {shipment.customer_email && shipment.status !== 'pending' && shipment.status !== 'pending_payment' && !shipment.tracking_number?.startsWith('PENDING') && (
                        <Button
                          onClick={() => handleSendTrackingEmail(shipment.id)}
                          variant="outline"
                          size="sm"
                          className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                          disabled={sendTrackingEmailMutation.isPending}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Email Customer
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#bfeee0]">📞 {shipment.customer_phone}</p>
                      {shipment.customer_email && <p className="text-[#bfeee0]">📧 {shipment.customer_email}</p>}
                      {shipment.notes && <p className="text-[#bfeee0]">📝 {shipment.notes}</p>}
                      {shipment.items && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-[#00ffc6] hover:text-[#00d9a8]">View Items</summary>
                          <div className="mt-2 text-xs text-[#bfeee0] space-y-1">
                            {JSON.parse(shipment.items).map((item, i) => (
                              <div key={i}>• {item.name} x {item.quantity} - RM {(item.price * item.quantity).toFixed(2)}</div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-[#bfeee0]">📅 {new Date(shipment.created_date).toLocaleDateString()} {new Date(shipment.created_date).toLocaleTimeString()}</p>
                      {shipment.estimated_delivery && (
                        <p className="text-[#bfeee0]">🚚 ETA: {new Date(shipment.estimated_delivery).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  
                  {shipment.status === 'pending_payment' && (
                    <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-400/30">
                      <p className="text-orange-300 text-sm">
                        ⚠️ <strong>QR Payment Pending:</strong> Check your {shipment.payment_method?.includes('DuitNow') ? 'bank account' : 'Touch n Go'} for payment from {shipment.customer_name}. Once verified, update status to "pending" in database.
                      </p>
                    </div>
                  )}
                  
                  {shipment.status === 'pending' && (
                    <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-400/30">
                      <p className="text-yellow-300 text-sm">
                        ⚠️ <strong>Action Required:</strong> Create shipping label manually and update tracking number in the database
                      </p>
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