import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { base44 } from "@/api/base44Client";
import { CheckCircle, QrCode, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QRPaymentModal({ isOpen, onClose, cart, totalAmount }) {
  const [step, setStep] = useState(1); // 1: Customer Details, 2: QR Display, 3: Confirmation
  const [qrType, setQrType] = useState("duitnow"); // "duitnow" or "tng"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postcode: ""
  });

  const handleInputChange = (field, value) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    return (
      customerDetails.name &&
      customerDetails.email &&
      customerDetails.phone &&
      customerDetails.address_line1 &&
      customerDetails.city &&
      customerDetails.state &&
      customerDetails.postcode
    );
  };

  const handleProceedToQR = async () => {
    if (!validateStep1()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create pending order record
      const orderData = {
        customer_name: customerDetails.name,
        customer_email: customerDetails.email,
        customer_phone: customerDetails.phone,
        shipping_address: `${customerDetails.address_line1}${customerDetails.address_line2 ? ', ' + customerDetails.address_line2 : ''}`,
        city: customerDetails.city,
        state: customerDetails.state,
        postcode: customerDetails.postcode,
        payment_method: qrType === "duitnow" ? "DuitNow QR" : "Touch 'n Go QR",
        status: "pending_payment",
        total_amount: totalAmount,
        items: JSON.stringify(cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))),
        notes: `QR Payment - Awaiting confirmation`,
        tracking_number: "PENDING - Awaiting payment confirmation"
      };

      const shipment = await base44.entities.Shipment.create(orderData);
      setOrderId(shipment.id);

      // Send admin notification email
      try {
        const itemsList = cart.map(item =>
          `${item.name} x ${item.quantity} - RM ${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');

        const adminEmailBody = `
New QR Payment Order Received! 🎉

Order ID: ${shipment.id}
Payment Method: ${qrType === "duitnow" ? "DuitNow QR (Bank Transfer)" : "Touch 'n Go QR"}
Payment Status: PENDING VERIFICATION ⚠️
Total Amount: RM ${totalAmount.toFixed(2)}

CUSTOMER DETAILS:
Name: ${customerDetails.name}
Email: ${customerDetails.email}
Phone: ${customerDetails.phone}

SHIPPING ADDRESS:
${customerDetails.address_line1}${customerDetails.address_line2 ? '\n' + customerDetails.address_line2 : ''}
${customerDetails.city}, ${customerDetails.state} ${customerDetails.postcode}

ORDER ITEMS:
${itemsList}

Total: RM ${totalAmount.toFixed(2)}

⚠️ IMPORTANT - ACTION REQUIRED:
1. Verify payment in your ${qrType === "duitnow" ? "DuitNow" : "Touch 'n Go"} account
2. Check for transaction of RM ${totalAmount.toFixed(2)} from ${customerDetails.name}
3. Once verified, update order status in Admin Shipping page
4. Generate shipping label and send tracking to customer

View order in Admin: Dashboard → Shipping Management
        `.trim();

        await base44.functions.invoke('sendEmail', {
          to: 'crypsafe.my@gmail.com',
          subject: `🛒 New QR Order (PENDING): ${customerDetails.name} - RM ${totalAmount.toFixed(2)}`,
          text: adminEmailBody,
          html: adminEmailBody.replace(/\n/g, '<br>')
        });
        console.log('✅ Admin email sent for QR order:', shipment.id);
      } catch (emailError) {
        console.error('❌ Failed to send admin email:', emailError);
      }

      // Send WhatsApp notification to admin
      try {
        const whatsappMessage = `🛒 NEW QR ORDER! 

Order: ${shipment.id.slice(-8)}
Customer: ${customerDetails.name}
Amount: RM ${totalAmount.toFixed(2)}
Payment: ${qrType === "duitnow" ? "DuitNow QR" : "TNG QR"}

Items:
${cart.map(item => `${item.name} x ${item.quantity}`).join('\n')}

📍 Ship to: ${customerDetails.city}, ${customerDetails.state}
📞 ${customerDetails.phone}

⚠️ VERIFY PAYMENT in ${qrType === "duitnow" ? "bank" : "TNG"} app
⚠️ Update status in Admin once confirmed`;

        await base44.functions.invoke('sendWhatsAppNotification', {
          to: '+601166736549',
          message: whatsappMessage
        });
        console.log('✅ WhatsApp notification sent for QR order');
      } catch (whatsappError) {
        console.error('⚠️ Failed to send WhatsApp (non-critical):', whatsappError);
      }

      setStep(2);
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to create order. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = () => {
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setCustomerDetails({
      name: "",
      email: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postcode: ""
    });
    setOrderId(null);
    onClose();
  };

  const qrImages = {
    duitnow: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f88f2cb7165a70a22ee871/3efc5cd7a_2fb8f347-bf2e-4eeb-a75c-d9ede34477a8.jpg",
    tng: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f88f2cb7165a70a22ee871/90651d768_27566dbe-186d-451c-8da8-bdee74eb1446.jpg"
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#071018] border-[#00ffc6]/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <QrCode className="w-6 h-6 text-[#00ffc6]" />
            QR Payment - RM {totalAmount.toFixed(2)}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Step 1: Customer Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold mb-4 text-[#00ffc6]">1. Select Payment Method</h3>
                <RadioGroup value={qrType} onValueChange={setQrType}>
                  <div className="space-y-3">
                    <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      qrType === "duitnow" ? "border-[#00ffc6] bg-[#00ffc6]/10" : "border-[#00ffc6]/20 hover:border-[#00ffc6]/50"
                    }`}>
                      <RadioGroupItem value="duitnow" id="duitnow" />
                      <Label htmlFor="duitnow" className="flex-1 cursor-pointer text-white">
                        <div className="font-bold">DuitNow QR (Bank Transfer)</div>
                        <div className="text-sm text-[#bfeee0]">Pay via any Malaysian bank app</div>
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      qrType === "tng" ? "border-[#00ffc6] bg-[#00ffc6]/10" : "border-[#00ffc6]/20 hover:border-[#00ffc6]/50"
                    }`}>
                      <RadioGroupItem value="tng" id="tng" />
                      <Label htmlFor="tng" className="flex-1 cursor-pointer text-white">
                        <div className="font-bold">Touch 'n Go eWallet</div>
                        <div className="text-sm text-[#bfeee0]">Pay via TNG eWallet app</div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 text-[#00ffc6]">2. Your Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Full Name *</Label>
                    <Input
                      value={customerDetails.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="John Doe"
                      className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Email *</Label>
                      <Input
                        type="email"
                        value={customerDetails.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Phone Number *</Label>
                      <Input
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+60123456789"
                        className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 text-[#00ffc6]">3. Shipping Address</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Address Line 1 *</Label>
                    <Input
                      value={customerDetails.address_line1}
                      onChange={(e) => handleInputChange("address_line1", e.target.value)}
                      placeholder="Street address, P.O. box"
                      className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-white">Address Line 2</Label>
                    <Input
                      value={customerDetails.address_line2}
                      onChange={(e) => handleInputChange("address_line2", e.target.value)}
                      placeholder="Apartment, suite, unit, building, floor, etc."
                      className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-white">City *</Label>
                      <Input
                        value={customerDetails.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Kuala Lumpur"
                        className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">State *</Label>
                      <Input
                        value={customerDetails.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="Selangor"
                        className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Postcode *</Label>
                      <Input
                        value={customerDetails.postcode}
                        onChange={(e) => handleInputChange("postcode", e.target.value)}
                        placeholder="50000"
                        className="bg-[#0b2221] border-[#00ffc6]/50 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#00ffc6]/20">
                <Button
                  onClick={handleProceedToQR}
                  disabled={!validateStep1() || isSubmitting}
                  className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to QR Payment
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: QR Display */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 text-white">Scan QR to Pay</h3>
                <p className="text-[#bfeee0] mb-2">
                  Pay <span className="text-[#00ffc6] font-bold text-2xl">RM {totalAmount.toFixed(2)}</span>
                </p>
                <p className="text-sm text-[#bfeee0]">Order ID: {orderId}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center">
                <img
                  src={qrImages[qrType]}
                  alt={qrType === "duitnow" ? "DuitNow QR" : "Touch 'n Go QR"}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
                <p className="mt-4 text-gray-700 font-bold">
                  {qrType === "duitnow" ? "Scan with any banking app" : "Scan with Touch 'n Go app"}
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
                <p className="text-sm text-yellow-200 font-bold mb-2">⚠️ Important Instructions:</p>
                <ul className="text-sm text-[#bfeee0] space-y-1">
                  <li>1. Open your {qrType === "duitnow" ? "banking" : "Touch 'n Go"} app</li>
                  <li>2. Scan the QR code above</li>
                  <li>3. Verify amount is <strong className="text-[#00ffc6]">RM {totalAmount.toFixed(2)}</strong></li>
                  <li>4. Complete the payment</li>
                  <li>5. Click "I've Completed Payment" below</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handlePaymentComplete}
                  className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-6"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  I've Completed Payment
                </Button>
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="w-full border-[#00ffc6]/50 text-[#00ffc6] hover:bg-[#00ffc6]/10"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Details
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">Thank You!</h3>
                <p className="text-[#bfeee0] mb-4">
                  We've received your payment confirmation for Order #{orderId}
                </p>
              </div>

              <div className="bg-[#0b2221] rounded-lg p-6 border border-[#00ffc6]/20">
                <h4 className="font-bold mb-3 text-[#00ffc6]">What Happens Next?</h4>
                <ul className="text-sm text-[#bfeee0] space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>We'll verify your payment (usually within 1-2 hours)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>You'll receive order confirmation via email & WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Your order will be processed and shipped within 1-2 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Tracking number will be sent via WhatsApp</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                <p className="text-sm text-blue-200">
                  <strong>Questions?</strong> Contact us on WhatsApp: <a href="https://wa.me/601166736549" className="text-[#00ffc6] hover:underline">+60 11 6673 6549</a>
                </p>
              </div>

              <Button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-6"
              >
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}