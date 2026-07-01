import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, User, ShoppingBag, Menu, X, Truck, ChevronDown } from 'lucide-react';
import { megaMenu } from '@/data/site';

const topLinks = [
  { label: 'Track Order', icon: Truck },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-[0_1px_30px_-10px_rgba(0,0,0,0.15)]' : 'bg-transparent'}`}>
      <div className="hidden md:block border-b border-border/40 bg-primary text-primary-foreground/90 text-xs">
        <div className="container flex items-center justify-between h-9">
          <span className="tracking-wide">Handcrafted in India · Free shipping over &#8377;2999</span>
          <div className="flex items-center gap-5">
            <a href="#track" className="flex items-center gap-1.5 hover:text-gold transition-colors"><Truck className="h-3.5 w-3.5" /> Track Order</a>
            <a href="#support" className="hover:text-gold transition-colors">Support</a>
            <a href="#bulk" className="hover:text-gold transition-colors">Bulk Orders</a>
          </div>
        </div>
      </div>

      <nav className="container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex flex-col leading-none">
          <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight">Dzire</span>
          <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] text-gold uppercase -mt-0.5">Gifts</span>
        </a>

        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <li className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button className="flex items-center gap-1 py-6 hover:text-gold transition-colors">Shop <ChevronDown className="h-3.5 w-3.5" /></button>
            <AnimatePresence>
              {mega && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute left-1/2 -translate-x-1/2 top-full w-[720px] bg-card rounded-2xl shadow-2xl border border-border p-8 grid grid-cols-3 gap-8"
                >
                  {Object.entries(megaMenu).map(([group, items]) => (
                    <div key={group}>
                      <p className="font-display text-lg mb-3">{group}</p>
                      <ul className="space-y-2">
                        {items.map((i) => (
                          <li key={i}><a href="#collections" className="text-sm text-muted-foreground hover:text-gold transition-colors">{i}</a></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li><a href="#collections" className="hover:text-gold transition-colors">Collections</a></li>
          <li><a href="#occasion" className="hover:text-gold transition-colors">Occasions</a></li>
          <li><a href="#craft" className="hover:text-gold transition-colors">Craftsmanship</a></li>
          <li><a href="#corporate" className="hover:text-gold transition-colors">Corporate</a></li>
        </ul>

        <div className="flex items-center gap-1 md:gap-3">
          <IconBtn label="Search"><Search className="h-5 w-5" /></IconBtn>
          <IconBtn label="Wishlist" className="hidden sm:inline-flex"><Heart className="h-5 w-5" /></IconBtn>
          <IconBtn label="Account" className="hidden sm:inline-flex"><User className="h-5 w-5" /></IconBtn>
          <IconBtn label="Cart" badge="2"><ShoppingBag className="h-5 w-5" /></IconBtn>
          <button className="lg:hidden p-2" onClick={() => setOpen(true)} aria-label="Menu"><Menu className="h-6 w-6" /></button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-background p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <span className="font-display text-2xl">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-6 w-6" /></button>
              </div>
              {Object.entries(megaMenu).map(([g, items]) => (
                <div key={g} className="mb-6">
                  <p className="font-display text-lg text-gold mb-2">{g}</p>
                  <ul className="space-y-2 pl-1">
                    {items.map((i) => <li key={i}><a href="#collections" onClick={() => setOpen(false)} className="text-muted-foreground">{i}</a></li>)}
                  </ul>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const IconBtn = ({ children, label, badge, className = '' }) => (
  <button aria-label={label} className={`relative p-2 rounded-full hover:bg-secondary transition-colors ${className}`}>
    {children}
    {badge && <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gold text-[0.6rem] font-bold text-primary flex items-center justify-center">{badge}</span>}
  </button>
);

export default Navbar;
