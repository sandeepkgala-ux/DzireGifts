import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useStore } from "@/context/StoreContext";

const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col justify-between">
      <div>
        <Navbar />

        <header className="bg-secondary/40 border-b border-border pt-28 pb-8 text-center">
          <div className="container max-w-2xl">
            <h1 className="font-display text-3xl md:text-4xl">Your Wishlist</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Saved designs and favorite handcrafted pieces
            </p>
          </div>
        </header>

        <main className="container py-12">
          {wishlist.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-2xl max-w-xl mx-auto">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
              <h2 className="font-display text-2xl mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Save your favorite designs by clicking the heart icon while
                browsing.
              </p>
              <Link
                to="/shop"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:opacity-90 transition"
              >
                Explore Collection <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <div className="relative aspect-square bg-secondary">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 text-destructive flex items-center justify-center shadow-sm hover:scale-105 transition"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="p-4">
                      <span className="text-[0.65rem] uppercase tracking-wider text-gold">
                        {item.category}
                      </span>
                      <Link
                        to={`/product/${item.id}`}
                        className="font-display text-base font-semibold block mt-1 hover:text-gold transition truncate"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gold font-bold text-base mt-2">
                        &#8377;{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => {
                        addToCart(item);
                        toggleWishlist(item);
                      }}
                      disabled={!item.inStock}
                      className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40 transition"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" /> Move to Cart
                    </button>
                  </div>
                </div>
              ))}
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

export default WishlistPage;
