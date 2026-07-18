import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { useStore } from "../context/useStore";

const ProductCard = ({ p }) => {
  const { toggleWishlist, isWishlisted } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      // Updated to border-gold and border-2 for a more premium, visible frame
      className="group bg-card rounded-2xl border-2 border-gold p-3 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <Link
          to={`/product/${p.id}`}
          className="relative block overflow-hidden rounded-xl bg-secondary aspect-square"
        >
          <img
            src={p.img}
            alt={p.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {p.tag && (
            <span className="absolute top-3 left-3 bg-background/90 backdrop-blur text-[0.65rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-wood">
              {p.tag}
            </span>
          )}
        </Link>

        {/* Wishlist Button - updated border to gold */}
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={() => toggleWishlist(p)}
            className={`h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center transition-all border border-gold ${isWishlisted?.(p.id) ? "text-gold" : "hover:text-gold"}`}
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted?.(p.id) ? "fill-gold" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-4 pb-2 px-1">
        <p className="text-xs text-muted-foreground mb-1">{p.material}</p>
        <h3 className="font-display text-lg leading-snug">{p.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {p.rating}
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-semibold">
            ₹{p.price.toLocaleString("en-IN")}
          </span>
          {p.mrp > p.price && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{p.mrp.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
