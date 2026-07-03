import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ShieldCheck, Lock } from "lucide-react";
import { useStore } from "../context/useStore"; // Updated to use your new architecture
import CheckoutModal from "./CheckoutModal";

const CartDrawer = () => {
  // Access global state from your new modular StoreContainer
  const { cart, removeFromCart, isCartOpen, toggleCart, cartSubtotal } =
    useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[200] overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart} // Use toggleCart to close
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                className="w-screen max-w-md bg-background border-l border-border shadow-2xl flex flex-col z-10"
              >
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 font-display text-xl font-semibold">
                    <ShoppingBag className="h-5 w-5 text-gold" /> Your Custom
                    Orders ({cart.length})
                  </div>
                  <button
                    onClick={toggleCart}
                    className="p-2 rounded-full hover:bg-secondary transition text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground space-y-3">
                      <ShoppingBag className="h-12 w-12 mx-auto opacity-30" />
                      <p className="text-sm">
                        Your order bag is currently empty.
                      </p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.cartKey}
                        className="bg-card border border-border rounded-2xl p-4 space-y-3 shadow-sm"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div>
                            <h4 className="font-display font-semibold text-sm leading-snug">
                              {item.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cartKey)}
                            className="text-muted-foreground hover:text-red-500 p-1 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex justify-between items-center pt-1 text-sm font-semibold">
                          <span className="text-muted-foreground text-xs">
                            Qty: {item.quantity}
                          </span>
                          <span>₹{item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-border bg-card space-y-4">
                    <div className="flex justify-between items-center text-base font-bold">
                      <span>Subtotal</span>
                      <span className="text-gold font-display text-2xl">
                        ₹{cartSubtotal.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        toggleCart();
                        setIsCheckoutOpen(true);
                      }}
                      className="w-full bg-gold text-primary font-bold py-4 rounded-xl shadow-lg hover:brightness-105 transition flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                    >
                      <Lock className="h-4 w-4" /> Proceed to Pay — ₹
                      {cartSubtotal.toLocaleString()}
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};

export default CartDrawer;
