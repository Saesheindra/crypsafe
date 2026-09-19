import React from "react";
import { Button } from "@/components/ui/button";
import { Bitcoin } from "lucide-react";

export default function CoinbaseButton({ productId, productName, price, onPaymentSuccess }) {
  const handleCoinbasePayment = () => {
    // Open Coinbase Commerce checkout
    // You'll need to replace 'YOUR_COINBASE_PRODUCT_ID' with actual Coinbase Commerce charge ID
    const coinbaseCheckoutUrl = `https://commerce.coinbase.com/checkout/${productId}`;
    
    // Open in new window
    const width = 500;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    const popup = window.open(
      coinbaseCheckoutUrl,
      'coinbase-commerce',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    // Listen for payment completion
    window.addEventListener('message', (event) => {
      if (event.data.type === 'coinbase_commerce_charge_confirmed') {
        if (onPaymentSuccess) {
          onPaymentSuccess(event.data);
        }
        if (popup) {
          popup.close();
        }
      }
    });
  };

  return (
    <Button
      onClick={handleCoinbasePayment}
      className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-3 shadow-lg hover:shadow-xl transition-all group"
    >
      <Bitcoin className="w-5 h-5 mr-2" />
      Pay with Crypto (RM {price})
    </Button>
  );
}