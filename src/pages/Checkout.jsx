import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, User, MapPin, CreditCard, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Checkout() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Customer Info
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // Shipping Info
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    postcode: ""
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState("whatsapp");

  useEffect(() => {
    const savedCart = localStorage.getItem('crypsafe_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 0;
  const total = subtotal - discount;

  const canProceedToStep2 = () => {
    return customerInfo.name && customerInfo.email && customerInfo.phone;
  };

  const canProceedToStep3 = () => {
    return shippingInfo.address && shippingInfo.city && shippingInfo.state && shippingInfo.postcode;
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to place an order:\n\n` +
      `Items:\n${cart.map(item => `- ${item.name} x${item.quantity} = RM ${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\n` +
      `Total: RM ${total.toFixed(2)}\n\n` +
      `Name: ${customerInfo.name}\n` +
      `Email: ${customerInfo.email}\n` +
      `Phone: ${customerInfo.phone}\n\n` +
      `Shipping Address:\n${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.postcode}`
    );
    window.open(`https://wa.me/601166736549?text=${message}`, '_blank');
  };

  const handlePlaceOrder = () => {
    handleWhatsAppOrder();
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="glass-card border-[#00ffc6]/20 max-w-md mx-auto">
          <CardContent className="pt-6 text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[#00ffc6] opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
            <p className="text-[#c6fff0] mb-4">Add some items to get started</p>
            <Button onClick={() => navigate(createPageUrl("Shop"))} className="bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018]">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Customer Info", icon: User },
    { number: 2, title: "Shipping", icon: MapPin },
    { number: 3, title: "Payment", icon: CreditCard }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Checkout</h1>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCompleted ? 'bg-green-500' : isActive ? 'bg-[#00ffc6]' : 'bg-[#0b2221] border-2 border-[#00ffc6]/30'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <StepIcon className={`w-6 h-6 ${isActive ? 'text-[#071018]' : 'text-[#00ffc6]'}`} />
                    )}
                  </div>
                  <span className={`text-sm font-bold ${isActive ? 'text-[#00ffc6]' : 'text-[#bfeee0]'}`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${currentStep > step.number ? 'bg-green-500' : 'bg-[#0b2221]'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Customer Info */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="glass-card border-[#00ffc6]/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">Full Name *</label>
                      <Input
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        placeholder="John Doe"
                        className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">Email *</label>
                      <Input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        placeholder="john@example.com"
                        className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">Phone Number *</label>
                      <Input
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        placeholder="0123456789"
                        className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceedToStep2()}
                    className="w-full bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold"
                  >
                    Continue to Shipping
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Shipping Info */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="glass-card border-[#00ffc6]/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">Address *</label>
                      <Input
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        placeholder="123 Jalan Example"
                        className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">City *</label>
                        <Input
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          placeholder="Kuala Lumpur"
                          className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">State *</label>
                        <Input
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          placeholder="Selangor"
                          className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">Postcode *</label>
                      <Input
                        value={shippingInfo.postcode}
                        onChange={(e) => setShippingInfo({...shippingInfo, postcode: e.target.value})}
                        placeholder="50000"
                        className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => setCurrentStep(1)} variant="outline" className="border-[#00ffc6] text-[#00ffc6]">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(3)}
                      disabled={!canProceedToStep3()}
                      className="flex-1 bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold"
                    >
                      Continue to Payment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="glass-card border-[#00ffc6]/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border-2 border-[#25D366] bg-[#25D366]/10">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#25D366] border-2 border-[#25D366]" />
                        <div className="flex-1">
                          <h4 className="font-bold text-white">WhatsApp Order</h4>
                          <p className="text-sm text-[#bfeee0]">Complete your order via WhatsApp with personal assistance</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#bfeee0] text-center">
                      Click "Place Order" to send your order details via WhatsApp. Our team will assist you with payment options.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => setCurrentStep(2)} variant="outline" className="border-[#00ffc6] text-[#00ffc6]">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 bg-[#00ffc6] hover:bg-[#00d9a8] text-[#071018] font-bold py-6 text-lg"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <Card className="glass-card border-[#00ffc6]/20 sticky top-4">
            <CardHeader>
              <CardTitle className="text-xl text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.variantId}`} className="flex gap-3">
                    <div className="w-16 h-16 bg-[#0b2221] rounded-lg flex items-center justify-center">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-12 h-12 object-contain" />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-[#00ffc6]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white">{item.name}</h4>
                      <p className="text-xs text-[#bfeee0]">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-[#00ffc6]">RM {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#00ffc6]/20 pt-4 space-y-2">
                <div className="flex justify-between text-[#c6fff0]">
                  <span>Subtotal</span>
                  <span>RM {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#c6fff0]">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-RM {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-[#00ffc6]/20">
                  <span>Total</span>
                  <span className="text-[#00ffc6]">RM {total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}