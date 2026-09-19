import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Package, Mail, Phone, MapPin, CreditCard, QrCode, Truck } from "lucide-react";

export default function AdminOrders() {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        base44.auth.me().then(setUser).catch(() => setUser(null));
    }, []);

    const { data: ordersData, isLoading: loadingOrders, error: ordersError } = useQuery({
        queryKey: ['recentOrders'],
        queryFn: async () => {
            const { data } = await base44.functions.invoke('getRecentOrders');
            return data;
        },
        enabled: user?.role === 'admin',
        refetchInterval: 30000
    });

    const { data: shipments, isLoading: loadingShipments } = useQuery({
        queryKey: ['allShipments'],
        queryFn: () => base44.entities.Shipment.list('-created_date'),
        enabled: user?.role === 'admin',
        initialData: [],
        refetchInterval: 30000
    });

    const isLoading = loadingOrders || loadingShipments;
    const error = ordersError;

    if (!user || user.role !== 'admin') {
        return (
            <div className="container mx-auto px-4 py-12">
                <Card className="glass-card border-red-500/50">
                    <CardContent className="p-8 text-center">
                        <p className="text-red-400">Unauthorized - Admin access only</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#00ffc6]" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <Card className="glass-card border-red-500/50">
                    <CardContent className="p-8">
                        <p className="text-red-400">Error: {error.message}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const stripeOrders = ordersData?.orders || [];
    const qrOrders = shipments.filter(s => s.notes?.includes('QR Payment') || s.notes?.includes('DuitNow') || s.notes?.includes('TNG'));
    const allOrders = [...stripeOrders.map(o => ({...o, type: 'stripe'})), ...qrOrders.map(s => ({...s, type: 'qr'}))];
    const sortedAllOrders = allOrders.sort((a, b) => new Date(b.created || b.created_date) - new Date(a.created || a.created_date));

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Orders Dashboard</h1>
                <p className="text-[#bfeee0]">Track all orders across payment methods</p>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <Card className="glass-card border-[#00ffc6]/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#bfeee0]">Total Orders</p>
                                <p className="text-3xl font-bold text-white">{allOrders.length}</p>
                            </div>
                            <Package className="w-8 h-8 text-[#00ffc6]" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-purple-500/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#bfeee0]">Stripe/Card</p>
                                <p className="text-3xl font-bold text-white">{stripeOrders.length}</p>
                            </div>
                            <CreditCard className="w-8 h-8 text-purple-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-blue-500/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#bfeee0]">QR Payments</p>
                                <p className="text-3xl font-bold text-white">{qrOrders.length}</p>
                            </div>
                            <QrCode className="w-8 h-8 text-blue-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-green-500/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#bfeee0]">Pending Ship</p>
                                <p className="text-3xl font-bold text-white">
                                    {shipments.filter(s => s.status === 'pending').length}
                                </p>
                            </div>
                            <Truck className="w-8 h-8 text-green-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full md:w-auto grid-cols-3 bg-[#0b2221]">
                    <TabsTrigger value="all">All Orders</TabsTrigger>
                    <TabsTrigger value="stripe">Stripe/Card</TabsTrigger>
                    <TabsTrigger value="qr">QR Payments</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    {sortedAllOrders.length === 0 ? (
                        <Card className="glass-card border-[#00ffc6]/20">
                            <CardContent className="p-12 text-center">
                                <Package className="w-16 h-16 mx-auto mb-4 text-[#00ffc6] opacity-50" />
                                <p className="text-[#bfeee0]">No orders found</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {sortedAllOrders.map((order) => 
                                order.type === 'stripe' ? renderStripeOrder(order) : renderQROrder(order)
                            )}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="stripe" className="mt-6">
                    {renderStripeOrders(stripeOrders)}
                </TabsContent>

                <TabsContent value="qr" className="mt-6">
                    {renderQROrders(qrOrders)}
                </TabsContent>
            </Tabs>
        </div>
    );

    function renderStripeOrders(orders) {
        if (orders.length === 0) {
            return (
                <Card className="glass-card border-[#00ffc6]/20">
                    <CardContent className="p-12 text-center">
                        <CreditCard className="w-16 h-16 mx-auto mb-4 text-purple-400 opacity-50" />
                        <p className="text-[#bfeee0]">No Stripe orders found</p>
                    </CardContent>
                </Card>
            );
        }
        return (
            <div className="space-y-6">
                {orders.map((order) => renderStripeOrder(order))}
            </div>
        );
    }

    function renderQROrders(orders) {
        if (orders.length === 0) {
            return (
                <Card className="glass-card border-[#00ffc6]/20">
                    <CardContent className="p-12 text-center">
                        <QrCode className="w-16 h-16 mx-auto mb-4 text-blue-400 opacity-50" />
                        <p className="text-[#bfeee0]">No QR payment orders found</p>
                    </CardContent>
                </Card>
            );
        }
        return (
            <div className="space-y-6">
                {orders.map((order) => renderQROrder(order))}
            </div>
        );
    }

    function renderStripeOrder(order) {
        return (
            <Card key={order.id} className="glass-card border-purple-500/20 hover:border-purple-500/50 transition-all">
                <CardHeader>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <CreditCard className="w-5 h-5 text-purple-400" />
                                <Badge className="bg-purple-500">Stripe/Card</Badge>
                            </div>
                            <CardTitle className="text-xl text-white mb-2">
                                Order #{order.id.slice(-8)}
                            </CardTitle>
                            <p className="text-sm text-[#bfeee0]">
                                {new Date(order.created).toLocaleString()}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-[#00ffc6] mb-2">
                                RM {(order.amount_total / 100).toFixed(2)}
                            </div>
                            <Badge 
                                className={
                                    order.payment_status === 'paid' 
                                        ? 'bg-green-500' 
                                        : order.payment_status === 'unpaid'
                                        ? 'bg-yellow-500'
                                        : 'bg-gray-500'
                                }
                            >
                                {order.payment_status}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h4 className="font-bold text-white mb-2">Customer Details</h4>
                            <div className="flex items-start gap-2">
                                <Package className="w-4 h-4 text-[#00ffc6] mt-1 flex-shrink-0" />
                                <p className="text-white font-medium">{order.customer.name}</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Mail className="w-4 h-4 text-[#00ffc6] mt-1 flex-shrink-0" />
                                <p className="text-[#bfeee0] text-sm break-all">{order.customer.email}</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Phone className="w-4 h-4 text-[#00ffc6] mt-1 flex-shrink-0" />
                                <p className="text-[#bfeee0] text-sm">{order.customer.phone}</p>
                            </div>
                        </div>
                        {order.shipping && (
                            <div className="space-y-3">
                                <h4 className="font-bold text-white mb-2">Shipping Address</h4>
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-[#00ffc6] mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-[#bfeee0] text-sm">{order.shipping.address.line1}</p>
                                        {order.shipping.address.line2 && (
                                            <p className="text-[#bfeee0] text-sm">{order.shipping.address.line2}</p>
                                        )}
                                        <p className="text-[#bfeee0] text-sm">
                                            {order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.postal_code}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#00ffc6]/20">
                        <h4 className="font-bold text-white mb-2">Order Items</h4>
                        <div className="space-y-2">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <span className="text-[#bfeee0]">{item.description} x {item.quantity}</span>
                                    <span className="text-white font-medium">RM {(item.amount / 100).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    function renderQROrder(order) {
        return (
            <Card key={order.id} className="glass-card border-blue-500/20 hover:border-blue-500/50 transition-all">
                <CardHeader>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <QrCode className="w-5 h-5 text-blue-400" />
                                <Badge className="bg-blue-500">QR Payment</Badge>
                            </div>
                            <CardTitle className="text-xl text-white mb-2">
                                Order #{order.id?.slice(-8) || order.order_id?.slice(-8)}
                            </CardTitle>
                            <p className="text-sm text-[#bfeee0]">
                                {new Date(order.created_date).toLocaleString()}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-[#00ffc6] mb-2">
                                RM {(order.declared_value || 0).toFixed(2)}
                            </div>
                            <Badge className={order.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}>
                                {order.status}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h4 className="font-bold text-white mb-2">Customer Details</h4>
                            <div className="flex items-start gap-2">
                                <Package className="w-4 h-4 text-[#00ffc6] mt-1 flex-shrink-0" />
                                <p className="text-white font-medium">{order.customer_name}</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Mail className="w-4 h-4 text-[#00ffc6] mt-1 flex-shrink-0" />
                                <p className="text-[#bfeee0] text-sm break-all">{order.customer_email}</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Phone className="w-4 h-4 text-[#00ffc6] mt-1 flex-shrink-0" />
                                <p className="text-[#bfeee0] text-sm">{order.customer_phone}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-white mb-2">Shipping Address</h4>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-[#00ffc6] mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-[#bfeee0] text-sm">{order.shipping_address}</p>
                                    <p className="text-[#bfeee0] text-sm">
                                        {order.city}, {order.state} {order.postcode}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {order.notes && (
                        <div className="mt-4 pt-4 border-t border-[#00ffc6]/20">
                            <h4 className="font-bold text-white mb-2">Order Notes</h4>
                            <p className="text-[#bfeee0] text-sm">{order.notes}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }
}