import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart as CartIcon, X, Plus, Minus, Trash2, CreditCard, MessageCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ShoppingCart({ cart, updateQuantity, removeFromCart, clearCart, isOpen, setIsOpen }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = subtotal;

  const handleWhatsAppOrder = () => {
    const itemsList = cart.map(item =>
      `${item.name} (RM ${item.price.toFixed(2)}) x ${item.quantity}`
    ).join('\n');

    const message = encodeURIComponent(
      `Hi! I'd like to order:\n\n${itemsList}\n\nSubtotal: RM ${subtotal.toFixed(2)}`
    );

    window.open(`https://wa.me/601166736549?text=${message}`, '_blank');
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] shadow-2xl glow-effect"
            size="icon"
          >
            <CartIcon className="w-6 h-6 text-[#071018]" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-2 border-[#071018] min-w-[24px] h-6 flex items-center justify-center font-bold">
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg bg-[#071018] border-l border-[#00ffc6]/20 flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-white flex items-center gap-3">
              <CartIcon className="w-6 h-6 text-[#00ffc6]" />
              Shopping Cart ({totalItems})
            </SheetTitle>
          </SheetHeader>

          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <CartIcon className="w-16 h-16 text-[#00ffc6] opacity-50 mb-4" />
              <p className="text-[#c6fff0] text-lg">Your cart is empty</p>
              <p className="text-[#bfeee0] text-sm mt-2">Add products to get started</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.variantId || 'default'}-${item.hasConsultation || 'no-consult'}`} className="glass-card p-4 rounded-lg">
                    <div className="flex gap-4">
                      {item.image_url && (
                        <img 
                          src={item.image_url} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">{item.name}</h4>
                        <p className="text-sm text-[#00ffc6] font-bold">RM {item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-2 bg-[#0b2221] rounded-lg">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-[#00ffc6] hover:text-[#00d9a8]"
                              onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-white font-bold min-w-[24px] text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-[#00ffc6] hover:text-[#00d9a8]"
                              onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-400 hover:text-red-500"
                            onClick={() => removeFromCart(item.id, item.variantId)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">RM {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Free Shipping Banner */}
              <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-400/30">
                <p className="text-sm text-green-300 text-center font-bold">
                  🎉 FREE Shipping on All Orders!
                </p>
              </div>

              {/* Summary */}
              <div className="border-t border-[#00ffc6]/20 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#c6fff0]">Subtotal ({totalItems} items)</span>
                  <span className="text-white">RM {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t border-[#00ffc6]/10">
                  <span className="text-[#c6fff0] font-bold">Total</span>
                  <span className="font-bold text-[#00ffc6]">RM {finalTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-[#bfeee0]">
                  FREE shipping included on all orders across Malaysia
                </p>

                {/* Checkout Buttons */}
                <div className="space-y-2 pt-2">
                  <Link to={createPageUrl("Checkout")}>
                    <Button
                      className="w-full bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] hover:from-[#00d9a8] hover:to-[#00ffc6] text-[#071018] font-bold py-6 text-base"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Button
                    onClick={handleWhatsAppOrder}
                    variant="outline"
                    className="w-full border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold py-6 text-base"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Quick Order via WhatsApp
                  </Button>
                </div>

                <Button
                  onClick={clearCart}
                  variant="ghost"
                  className="w-full text-red-400 hover:text-red-500 text-sm"
                >
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}