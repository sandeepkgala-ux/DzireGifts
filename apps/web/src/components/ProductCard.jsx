import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Eye, GitCompare } from 'lucide-react';

const discount = (p) => Math.round((1 - p.price / p.mrp) * 100);

const ProductCard = ({ p, view = 'grid', onQuickView, onWishlist, onCompare, wishlisted, compared }) => {
  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="group flex gap-5 rounded-2xl border border-border bg-card p-4"
      >
        <div className="relative w-40 shrink-0 overflow-hidden rounded-xl bg-secondary aspect-square">
          <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute top-2 left-2 bg-background/90 backdrop-blur text-[0.6rem] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-wood">{p.tag}</span>
        </div>
        <div className="flex flex-1 flex-col">
          <p className="text-xs text-muted-foreground mb-1">{p.material} · {p.category}</p>
          <h3 className="font-display text-xl leading-snug">{p.name}</h3>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {p.rating}
            <span>&#183; {p.reviews} reviews</span>
            {!p.inStock && <span className="ml-2 text-destructive font-medium">Out of stock</span>}
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-lg font-semibold">&#8377;{p.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-muted-foreground line-through">&#8377;{p.mrp.toLocaleString('en-IN')}</span>
            <span className="text-xs font-semibold text-leaf">{discount(p)}% off</span>
          </div>
          <div className="mt-auto flex items-center gap-2 pt-3">
            <button onClick={() => onQuickView?.(p)} className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 active:scale-[0.98]">
              <Eye className="h-4 w-4" /> Quick View
            </button>
            <button onClick={() => onWishlist?.(p)} aria-label="Wishlist" className={`h-9 w-9 rounded-lg border border-border flex items-center justify-center transition ${wishlisted ? 'text-gold' : 'hover:text-gold'}`}>
              <Heart className={`h-4 w-4 ${wishlisted ? 'fill-gold' : ''}`} />
            </button>
            <button onClick={() => onCompare?.(p)} aria-label="Compare" className={`h-9 w-9 rounded-lg border border-border flex items-center justify-center transition ${compared ? 'text-gold border-gold' : 'hover:text-gold'}`}>
              <GitCompare className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-square">
        <img src={p.img} alt={p.name} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        <span className="absolute top-3 left-3 bg-background/90 backdrop-blur text-[0.65rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-wood">{p.tag}</span>
        {!p.inStock && <span className="absolute top-3 left-1/2 -translate-x-1/2 bg-destructive/90 text-destructive-foreground text-[0.6rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">Sold out</span>}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button onClick={() => onWishlist?.(p)} aria-label="Wishlist" className={`h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center transition-all md:opacity-0 md:group-hover:opacity-100 ${wishlisted ? 'text-gold' : 'hover:text-gold'}`}>
            <Heart className={`h-4 w-4 ${wishlisted ? 'fill-gold' : ''}`} />
          </button>
          <button onClick={() => onCompare?.(p)} aria-label="Compare" className={`h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center transition-all md:opacity-0 md:group-hover:opacity-100 ${compared ? 'text-gold' : 'hover:text-gold'}`}>
            <GitCompare className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => onQuickView?.(p)} className="w-full bg-primary text-primary-foreground text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98]">
            <Eye className="h-4 w-4" /> Quick View
          </button>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-xs text-muted-foreground mb-1">{p.material}</p>
        <h3 className="font-display text-lg leading-snug">{p.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {p.rating}
          <span>&#183; {p.reviews} reviews</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-semibold">&#8377;{p.price.toLocaleString('en-IN')}</span>
          <span className="text-sm text-muted-foreground line-through">&#8377;{p.mrp.toLocaleString('en-IN')}</span>
          <span className="text-xs font-semibold text-leaf">{discount(p)}% off</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
