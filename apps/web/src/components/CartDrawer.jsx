import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, Lock } from "lucide-react";
import { useStore } from "../context/useStore";
import CheckoutModal from "./CheckoutModal";

const CartDrawer = () => {
  // Access global state - ensured updateQuantity is pulled here
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    toggleCart,
    cartSubtotal,
  } = useStore();
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
              onClick={toggleCart}
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
                    <ShoppingBag className="h-5 w-5 text-gold" /> Your Orders (
                    {cart.length})
                  </div>
                  <button
                    onClick={toggleCart}
                    className="p-2 rounded-full hover:bg-secondary transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                      <ShoppingBag className="h-12 w-12 mx-auto opacity-30 mb-3" />
                      <p>Your order bag is empty.</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.uniqueKey}
                        className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-3"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <h4 className="font-display font-semibold text-sm leading-snug">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.uniqueKey)}
                            className="text-muted-foreground hover:text-red-500 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Display Personalization Details */}
                        <div className="text-[10px] text-muted-foreground bg-secondary/50 p-2 rounded-lg space-y-0.5">
                          {Object.entries(item.customDetails).map(
                            ([key, val]) => (
                              <div key={key}>
                                <span className="font-bold">{key}:</span> {val}
                              </div>
                            ),
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                              className="px-3 py-1 hover:bg-secondary"
                              onClick={() =>
                                updateQuantity(
                                  item.uniqueKey,
                                  item.quantity - 1,
                                )
                              }
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-1 hover:bg-secondary"
                              onClick={() =>
                                updateQuantity(
                                  item.uniqueKey,
                                  item.quantity + 1,
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <span className="font-semibold text-sm">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-border bg-card space-y-4">
                    <div className="flex justify-between items-center font-bold">
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
                      className="w-full bg-gold text-primary font-bold py-4 rounded-xl shadow-lg hover:brightness-105 transition flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
                    >
                      <Lock className="h-4 w-4" /> Proceed to Pay
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
