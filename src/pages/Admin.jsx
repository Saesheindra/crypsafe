
import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Truck, Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function Admin() {
  const [newShipment, setNewShipment] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    shipping_address: '',
    city: '',
    state: '',
    postcode: '',
    weight_kg: 0.5,
    declared_value: 0,
    courier: 'poslaju'
  });

  const [trackingSearch, setTrackingSearch] = useState('');
  const queryClient = useQueryClient();

  const { data: shipments = [], isLoading } = useQuery({
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

  const createShipmentMutation = useMutation({
    mutationFn: (shipmentData) => base44.functions.invoke('createShipment', shipmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] });
      setNewShipment({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        shipping_address: '',
        city: '',
        state: '',
        postcode: '',
        weight_kg: 0.5,
        declared_value: 0,
        courier: 'poslaju'
      });
      alert('Shipment created successfully!');
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    }
  });

  const handleCreateShipment = () => {
    if (!newShipment.customer_name || !newShipment.customer_phone || !newShipment.shipping_address) {
      alert('Please fill in all required fields');
      return;
    }
    createShipmentMutation.mutate(newShipment);
  };

  const malaysianStates = [
    'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 
    'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya',
    'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500',
      label_generated: 'bg-blue-500',
      picked_up: 'bg-indigo-500',
      in_transit: 'bg-purple-500',
      out_for_delivery: 'bg-orange-500',
      delivered: 'bg-green-500',
      failed: 'bg-red-500',
      returned: 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Shipping Management</h1>
        <p className="text-[#c6fff0]">Create and manage shipments for your orders</p>
      </motion.div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#0b2221] mb-8">
          <TabsTrigger value="create" className="data-[state=active]:bg-[#00ffc6] data-[state=active]:text-[#071018]">
            <Plus className="w-4 h-4 mr-2" />
            Create Shipment
          </TabsTrigger>
          <TabsTrigger value="manage" className="data-[state=active]:bg-[#00ffc6] data-[state=active]:text-[#071018]">
            <Truck className="w-4 h-4 mr-2" />
            Manage Shipments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card className="glass-card border-[#00ffc6]/20">
            <CardHeader>
              <CardTitle className="text-white">Create New Shipment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="customer_name">Customer Name *</Label>
                  <Input
                    id="customer_name"
                    value={newShipment.customer_name}
                    onChange={(e) => setNewShipment({...newShipment, customer_name: e.target.value})}
                    className="bg-[#0b2221] border-[#00ffc6]/20"
                  />
                </div>
                <div>
                  <Label htmlFor="customer_phone">Phone Number *</Label>
                  <Input
                    id="customer_phone"
                    value={newShipment.customer_phone}
                    onChange={(e) => setNewShipment({...newShipment, customer_phone: e.target.value})}
                    placeholder="0123456789"
                    className="bg-[#0b2221] border-[#00ffc6]/20"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="customer_email">Email (optional)</Label>
                  <Input
                    id="customer_email"
                    type="email"
                    value={newShipment.customer_email}
                    onChange={(e) => setNewShipment({...newShipment, customer_email: e.target.value})}
                    className="bg-[#0b2221] border-[#00ffc6]/20"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="shipping_address">Shipping Address *</Label>
                  <Textarea
                    id="shipping_address"
                    value={newShipment.shipping_address}
                    onChange={(e) => setNewShipment({...newShipment, shipping_address: e.target.value})}
                    className="bg-[#0b2221] border-[#00ffc6]/20"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={newShipment.city}
                    onChange={(e) => setNewShipment({...newShipment, city: e.target.value})}
                    className="bg-[#0b2221] border-[#00ffc6]/20"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select value={newShipment.state} onValueChange={(value) => setNewShipment({...newShipment, state: value})}>
                    <SelectTrigger className="bg-[#0b2221] border-[#00ffc6]/20">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {malaysianStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="postcode">Postcode *</Label>
                  <Input
                    id="postcode"
                    value={newShipment.postcode}
                    onChange={(e) => setNewShipment({...newShipment, postcode: e.target.value})}
                    className="bg-[#0b2221] border-[#00ffc6]/20"
                  />
                </div>
                <div>
                  <Label htmlFor="courier">Courier *</Label>
                  <Select value={newShipment.courier} onValueChange={(value) => setNewShipment({...newShipment, courier: value})}>
                    <SelectTrigger className="bg-[#0b2221] border-[#00ffc6]/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ninja_van">Ninja Van ⭐ (You have account)</SelectItem>
                      <SelectItem value="poslaju">Pos Laju</SelectItem>
                      <SelectItem value="jt_express">J&T Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="weight_kg">Weight (kg)</Label>
                  <Input
                    id="weight_kg"
                    type="number"
                    step="0.1"
                    value={newShipment.weight_kg}
                    onChange={(e) => setNewShipment({...newShipment, weight_kg: parseFloat(e.target.value)})}
                    className="bg-[#0b2221] border-[#00ffc6]/20"
                  />
                </div>
                <div>
                  <Label htmlFor="declared_value">Declared Value (RM)</Label>
                  <Input
                    id="declared_value"
                    type="number"
                    value={newShipment.declared_value}
                    onChange={(e) => setNewShipment({...newShipment, declared_value: parseFloat(e.target.value)})}
                    className="bg-[#0b2221] border-[#00ffc6]/20"
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  onClick={handleCreateShipment}
                  disabled={createShipmentMutation.isPending}
                  className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold w-full md:w-auto"
                >
                  {createShipmentMutation.isPending ? 'Creating...' : 'Create Shipment'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card className="glass-card border-[#00ffc6]/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">All Shipments</CardTitle>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search tracking..."
                    value={trackingSearch}
                    onChange={(e) => setTrackingSearch(e.target.value)}
                    className="bg-[#0b2221] border-[#00ffc6]/20 w-64"
                  />
                  <Button variant="ghost" size="icon">
                    <Search className="w-5 h-5 text-[#00ffc6]" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-[#c6fff0]">Loading shipments...</p>
              ) : !Array.isArray(shipments) || shipments.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-[#00ffc6] mx-auto mb-4 opacity-50" />
                  <p className="text-[#c6fff0]">No shipments yet. Create your first shipment!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(Array.isArray(shipments) ? shipments : [])
                    .filter(s => !trackingSearch || s.tracking_number?.toLowerCase().includes(trackingSearch.toLowerCase()))
                    .map((shipment) => (
                    <div key={shipment.id} className="bg-[#0b2221] rounded-lg p-4 border border-[#00ffc6]/20">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-white">{shipment.customer_name}</h3>
                            <Badge className={`${getStatusColor(shipment.status)} text-white`}>
                              {shipment.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-[#c6fff0] mb-1">
                            <strong>Tracking:</strong> {shipment.tracking_number || 'Pending'}
                          </p>
                          <p className="text-sm text-[#c6fff0] mb-1">
                            <strong>Courier:</strong> {shipment.courier}
                          </p>
                          <p className="text-sm text-[#c6fff0] mb-1">
                            <strong>Address:</strong> {shipment.shipping_address}, {shipment.city}, {shipment.state} {shipment.postcode}
                          </p>
                          {shipment.label_url && (
                            <a href={shipment.label_url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00ffc6] hover:underline">
                              Download Label
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
