import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Truck,
  ChevronDown,
  Phone,
} from "lucide-react";
import { useStore } from "../context/useStore";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const { cartCount } = useStore();
  const location = useLocation();

  // Detect current page
  const isHomePage = location.pathname === "/";

  const [categories, setCategories] = useState([
    { id: 1, name: "Nameplates", slug: "nameplates" },
    { id: 2, name: "Wooden Gifts", slug: "wooden-gifts" },
    { id: 3, name: "Acrylic Decor", slug: "acrylic-decor" },
    { id: 4, name: "Corporate Gifts", slug: "corporate" },
    { id: 5, name: "Spiritual & Religious", slug: "spiritual" },
    { id: 6, name: "Wedding & Anniversary", slug: "wedding" },
  ]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

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
        if (response.data && Array.isArray(response.data)) {
          setCategories(
            response.data.filter((cat) => cat.slug !== "uncategorized"),
          );
        }
      } catch (err) {
        console.error("Using fallback categories:", err.message);
      }
    }
    fetchCategories();
  }, []);

  // Dynamic text coloring: White ONLY when on Homepage AND not scrolled down
  const textColor = isHomePage && !scrolled ? "text-white" : "text-foreground";
  const dropShadow = isHomePage && !scrolled ? "drop-shadow-sm" : "";

  // Helper inside component file to satisfy Vite Fast Refresh rules
  const renderIconBtn = (children, label, badge) => (
    <button
      aria-label={label}
      className="relative p-2 rounded-full hover:bg-secondary/40 transition-colors"
    >
      {children}
      {badge && badge !== "0" && (
        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gold text-[0.6rem] font-medium text-primary flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-[0_1px_30px_-10px_rgba(0,0,0,0.15)] border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Announcement & Action Bar */}
      <div className="hidden md:block border-b border-border/40 bg-primary text-primary-foreground/90 text-xs">
        <div className="container flex items-center justify-between h-9 px-4 sm:px-6 lg:px-8">
          <span className="tracking-wide text-gold">
            Handcrafted in India · Free Delivery all over India
          </span>
          <div className="flex items-center gap-5">
            <Link
              to="/track-order"
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Truck className="h-3.5 w-3.5" /> Track Order
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=919876543210&text=Hi%20Dzire%20Gifts,%20I%20need%20support..."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-gold transition-colors"
            >
              <Phone className="h-3 w-3" /> Live Support
            </a>
            <Link
              to="/bulk-orders"
              className="hover:text-gold transition-colors text-gold underline"
            >
              Bulk Orders
            </Link>
          </div>
        </div>
      </div>

      <nav className="container flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        {/* Clean, Non-Bold Brand Logo */}
        <Link to="/" className="flex flex-col leading-none z-50 group">
          <span
            className={`font-display text-2xl md:text-3xl font-semibold tracking-tight transition-colors ${textColor} ${dropShadow}`}
          >
            Dzire
          </span>
          <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] text-gold uppercase -mt-0.5">
            Gifts
          </span>
        </Link>

        {/* Desktop Navigation - Clean Medium/Regular Weight */}
        <ul
          className={`hidden lg:flex items-center gap-8 text-sm font-medium transition-colors ${textColor}`}
        >
          <li>
            <Link to="/" className="hover:text-gold transition-colors py-6">
              Home
            </Link>
          </li>
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
            <div className="absolute top-full left-0 w-full h-4 bg-transparent" />
            <AnimatePresence>
              {mega && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-0 top-[calc(100%+0.2rem)] w-64 bg-card text-foreground rounded-2xl shadow-2xl border border-border p-5 z-50"
                >
                  <p className="font-display text-xs uppercase tracking-wider text-gold mb-3 px-2">
                    Shop by Category
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/shop"
                        onClick={() => setMega(false)}
                        className="block px-2 py-1.5 rounded-lg text-sm hover:bg-secondary hover:text-gold transition-colors"
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

        {/* Right Action Icons */}
        <div className={`flex items-center gap-1 md:gap-3 z-50 ${textColor}`}>
          {renderIconBtn(<Search className="h-5 w-5" />, "Search")}
          <Link to="/cart">
            {renderIconBtn(
              <ShoppingBag className="h-5 w-5" />,
              "Cart",
              String(cartCount || 0),
            )}
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

      {/* Mobile Menu */}
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
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-background text-foreground p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                  <span className="font-display text-2xl font-medium">
                    Menu
                  </span>
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
                    className="block font-display text-lg hover:text-gold"
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    onClick={() => setOpen(false)}
                    className="block font-display text-lg hover:text-gold"
                  >
                    Shop All Products
                  </Link>
                  <Link
                    to="/bulk-orders"
                    onClick={() => setOpen(false)}
                    className="block font-display text-lg text-gold"
                  >
                    Bulk / Corporate Orders
                  </Link>
                  <Link
                    to="/track-order"
                    onClick={() => setOpen(false)}
                    className="block font-display text-lg hover:text-gold"
                  >
                    Track Your Order
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setOpen(false)}
                    className="block font-display text-lg hover:text-gold"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="block font-display text-lg hover:text-gold"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
