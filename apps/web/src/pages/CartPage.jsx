import React from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useStore } from "../context/useStore";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartSubtotal } = useStore();
  const freeShippingThreshold = 2999;
  const shippingCost =
    cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 250;
  const finalTotal = cartSubtotal + shippingCost;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col justify-between">
      <div>
        <Navbar />

        <header className="bg-secondary/40 border-b border-border pt-28 pb-8 text-center">
          <div className="container max-w-2xl">
            <h1 className="font-display text-3xl md:text-4xl">
              Your Shopping Cart
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Review your customized items before checkout
            </p>
          </div>
        </header>

        <main className="container py-12">
          {cart.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-2xl max-w-xl mx-auto">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
              <h2 className="font-display text-2xl mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Looks like you haven't added any personalized handcrafted items
                yet.
              </p>
              <Link
                to="/shop"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:opacity-90 transition"
              >
                Explore Collection <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.cartKey}
                    className="bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover bg-secondary shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="font-display text-lg font-semibold hover:text-gold transition truncate block"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gold font-semibold text-sm mt-0.5">
                        &#8377;{item.price.toLocaleString("en-IN")}
                      </p>

                      {/* Customization Details Display */}
                      {item.customDetails?.text && (
                        <div className="mt-2 bg-secondary/60 rounded-lg p-2.5 text-xs text-muted-foreground space-y-1">
                          <p>
                            <span className="font-semibold text-foreground">
                              Engraving Text:
                            </span>{" "}
                            "{item.customDetails.text}"
                          </p>
                          {item.customDetails.instructions && (
                            <p>
                              <span className="font-semibold text-foreground">
                                Note:
                              </span>{" "}
                              {item.customDetails.instructions}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-border">
                      <div className="flex items-center border border-border rounded-xl bg-background">
                        <button
                          onClick={() =>
                            updateQuantity(item.cartKey, item.quantity - 1)
                          }
                          className="p-2 text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.cartKey, item.quantity + 1)
                          }
                          className="p-2 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-muted-foreground hover:text-destructive p-2 transition"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4 bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-28">
                <h3 className="font-display text-xl border-b border-border pb-4 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">
                      &#8377;{cartSubtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-semibold text-foreground">
                      {shippingCost === 0 ? (
                        <span className="text-leaf">FREE</span>
                      ) : (
                        `₹${shippingCost}`
                      )}
                    </span>
                  </div>
                  {cartSubtotal < freeShippingThreshold && (
                    <p className="text-xs text-gold bg-gold/10 p-2.5 rounded-lg">
                      Add &#8377;
                      {(freeShippingThreshold - cartSubtotal).toLocaleString(
                        "en-IN",
                      )}{" "}
                      more for free express shipping!
                    </p>
                  )}
                </div>

                <div className="border-t border-border mt-5 pt-4 flex justify-between font-display text-lg font-bold">
                  <span>Total</span>
                  <span className="text-gold">
                    &#8377;{finalTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="mt-6 w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition shadow-md"
                >
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
                  <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                  <span>
                    Artwork preview shared via WhatsApp before production
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="bg-primary text-primary-foreground/80 py-8 border-t border-white/10 text-center text-xs mt-20">
        <div className="container">
          <p className="font-display text-base text-white mb-1">
            Dzire <span className="text-gold">Gifts</span>
          </p>
          <p className="text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Dzire Gifts. Handcrafted in India.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;
