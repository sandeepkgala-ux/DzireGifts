import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  Truck,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  // State to hold live WooCommerce categories
  const [categories, setCategories] = useState([
    { id: 1, name: "Nameplates", slug: "nameplates" },
    { id: 2, name: "Wooden Gifts", slug: "wooden-gifts" },
    { id: 3, name: "Acrylic Decor", slug: "acrylic-decor" },
    { id: 4, name: "Corporate Gifts", slug: "corporate" },
    { id: 5, name: "Spiritual & Religious", slug: "spiritual" },
    { id: 6, name: "Wedding & Anniversary", slug: "wedding" },
  ]);

  // 1. Detect scroll for background blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2. Lock background scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // 3. Fetch live categories from WooCommerce backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        if (!import.meta.env.VITE_API_URL) return;
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/categories`,
          {
            params: {
              consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
              consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
              per_page: 20,
              hide_empty: true,
            },
          },
        );
        if (response.data && response.data.length > 0) {
          // Filter out WordPress default 'Uncategorized' item
          const cleanCategories = response.data.filter(
            (cat) => cat.slug !== "uncategorized",
          );
          setCategories(cleanCategories);
        }
      } catch (err) {
        console.error("Using fallback categories:", err.message);
      }
    }
    fetchCategories();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-[0_1px_30px_-10px_rgba(0,0,0,0.15)]" : "bg-transparent"}`}
    >
      <div className="hidden md:block border-b border-border/40 bg-primary text-primary-foreground/90 text-xs">
        <div className="container flex items-center justify-between h-9">
          <span className="tracking-wide">
            Handcrafted in India · Free shipping over &#8377;2999
          </span>
          <div className="flex items-center gap-5">
            <a
              href="#track"
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Truck className="h-3.5 w-3.5" /> Track Order
            </a>
            <a href="#support" className="hover:text-gold transition-colors">
              Support
            </a>
            <a href="#bulk" className="hover:text-gold transition-colors">
              Bulk Orders
            </a>
          </div>
        </div>
      </div>

      <nav className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex flex-col leading-none z-50">
          <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
            Dzire
          </span>
          <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] text-gold uppercase -mt-0.5">
            Gifts
          </span>
        </Link>

        {/* Streamlined Desktop Navigation: Home, Shop, About Us, Contact Us */}
        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-gold transition-colors py-6">
              Home
            </Link>
          </li>

          {/* Shop with Dynamic Category Dropdown */}
          <li
            className="relative group"
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
          >
            <Link
              to="/shop"
              className="flex items-center gap-1 py-6 hover:text-gold transition-colors"
            >
              Shop <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            {/* Hover bridge */}
            <div className="absolute top-full left-0 w-full h-4 bg-transparent" />

            <AnimatePresence>
              {mega && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-0 top-[calc(100%+0.2rem)] w-64 bg-card rounded-2xl shadow-2xl border border-border p-5 z-50"
                >
                  <p className="font-display text-xs uppercase tracking-wider text-gold mb-3 px-2">
                    Shop by Category
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/shop"
                        onClick={() => setMega(false)}
                        className="block px-2 py-1.5 rounded-lg text-sm font-semibold text-foreground hover:bg-secondary hover:text-gold transition-colors"
                      >
                        Explore All Products →
                      </Link>
                    </li>
                    <div className="h-px bg-border my-2" />
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          to="/shop"
                          onClick={() => setMega(false)}
                          className="block px-2 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li>
            <Link
              to="/about"
              className="hover:text-gold transition-colors py-6"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="hover:text-gold transition-colors py-6"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-1 md:gap-3 z-50">
          <IconBtn label="Search">
            <Search className="h-5 w-5" />
          </IconBtn>
          <IconBtn label="Wishlist" className="hidden sm:inline-flex">
            <Heart className="h-5 w-5" />
          </IconBtn>
          <IconBtn label="Account" className="hidden sm:inline-flex">
            <User className="h-5 w-5" />
          </IconBtn>
          <Link to="/shop">
            <IconBtn label="Cart" badge="0">
              <ShoppingBag className="h-5 w-5" />
            </IconBtn>
          </Link>
          <button
            className="lg:hidden p-2"
            onClick={() => setOpen(true)}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Streamlined Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-background p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                  <span className="font-display text-2xl">Menu</span>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="p-2 -mr-2"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="block font-display text-lg text-foreground hover:text-gold transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    onClick={() => setOpen(false)}
                    className="block font-display text-lg text-foreground hover:text-gold transition-colors"
                  >
                    Shop All Products
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setOpen(false)}
                    className="block font-display text-lg text-foreground hover:text-gold transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="block font-display text-lg text-foreground hover:text-gold transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="font-display text-xs uppercase tracking-widest text-gold mb-3">
                    Categories
                  </p>
                  <ul className="space-y-2.5 pl-1">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          to="/shop"
                          onClick={() => setOpen(false)}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-border pt-6 mt-8 text-xs text-muted-foreground">
                <p>Need support?</p>
                <p className="text-foreground font-semibold mt-1">
                  support@dziregifts.com
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const IconBtn = ({ children, label, badge, className = "" }) => (
  <button
    aria-label={label}
    className={`relative p-2 rounded-full hover:bg-secondary transition-colors ${className}`}
  >
    {children}
    {badge && badge !== "0" && (
      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gold text-[0.6rem] font-bold text-primary flex items-center justify-center">
        {badge}
      </span>
    )}
  </button>
);

export default Navbar;
