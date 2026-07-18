import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  Star,
  Truck,
  ShieldCheck,
  Sparkles,
  Award,
  PenTool,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { IMG, testimonials } from "@/data/site";

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Section = ({ id, kicker, title, sub, children, className = "" }) => (
  <section id={id} className={`py-12 md:py-16 ${className}`}>
    <div className="container">
      {(kicker || title) && (
        <motion.div {...fade} className="max-w-2xl mb-10 md:mb-12">
          {kicker && (
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              {kicker}
            </p>
          )}
          {title && (
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              {title}
            </h2>
          )}
          {sub && (
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              {sub}
            </p>
          )}
        </motion.div>
      )}
      {children}
    </div>
  </section>
);

const HomePage = () => {
  const [liveProducts, setLiveProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live WooCommerce products on mount (Limited to 6)
  useEffect(() => {
    async function fetchLiveProducts() {
      try {
        if (!import.meta.env.VITE_API_URL) {
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products`,
          {
            params: {
              consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY,
              consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET,
              status: "publish",
              per_page: 6,
            },
          },
        );

        if (response.data && Array.isArray(response.data)) {
          const mapped = response.data.map((item) => ({
            id: item.id,
            name: item.name,
            price: Number(item.price || item.regular_price || 0),
            mrp: Number(item.regular_price || item.price || 0),
            rating: Number(item.average_rating || 4.8),
            reviews: item.rating_count || 12,
            img:
              item.images?.[0]?.src ||
              "https://via.placeholder.com/400x400?text=No+Image",
            category: item.categories?.[0]?.name || "Personalized Decor",
            inStock: item.stock_status === "instock",
            // Assuming your backend tags are setup here to map to your card badges
            tags: item.tags?.map((t) => t.name) || [],
          }));
          setLiveProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch WooCommerce products:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[700px] flex items-center overflow-hidden">
        <img
          src={IMG.heroVilla}
          alt="Customized wooden villa nameplate at a premium home entrance"
          className="absolute inset-0 h-full w-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />

        <div className="container relative z-10 text-white flex flex-col items-start pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: "easeOut" }}
            className="font-display text-3xl md:text-5xl lg:text-6xl max-w-3xl leading-[1.1]"
          >
            Premium Personalized Name Plates{" "}
            <span className="italic text-gold">Crafted for Every Home.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="mt-7 max-w-xl text-white/85 text-lg md:text-xl leading-relaxed"
          >
            Beautifully handcrafted name plates and wooden gifts designed to
            celebrate your home, family and special moments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="mt-11 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/shop"
              className="bg-gold text-primary font-semibold px-9 py-4 rounded-xl flex items-center gap-2 hover:brightness-105 active:scale-[0.98] transition shadow-lg shadow-black/20"
            >
              Customize Your Name Plate <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl"
          >
            {[
              [Award, "Premium Craftsmanship"],
              [PenTool, "Artwork Approval Before Production"],
              [Sparkles, "Made in India"],
              [ShieldCheck, "Secure Payments"],
            ].map(([Icon, label], i) => (
              <div key={i} className="flex items-center gap-3">
                <Icon
                  className="h-8 w-8 text-gold shrink-0"
                  strokeWidth={1.4}
                />
                <span className="text-xs md:text-sm font-medium text-white/90 leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="border-b border-border bg-secondary/50">
        <div className="container grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            [Truck, "Free shipping", "All over India"],
            [ShieldCheck, "Secure checkout", "UPI · Cards · EMI"],
            [Award, "25,000+ homes", "Trusted across India"],
            [PenTool, "Made to order", "Crafted just for you"],
          ].map(([Icon, t, s], i) => (
            <div key={i} className="flex items-center gap-3 py-5 px-4 md:px-6">
              <Icon className="h-6 w-6 text-gold shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold leading-tight">{t}</p>
                <p className="text-xs text-muted-foreground">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories (HIDDEN PER REQUEST) */}
      {/* 
      <Section id="collections" kicker="Featured categories" title="Shop our signature collections" sub="From engraved villa boards to acrylic apartment plates and heartfelt personalized gifts.">
        ...
      </Section> 
      */}

      {/* Dynamic Bestsellers (Max 6) */}
      <Section
        id="products"
        kicker="Best sellers & trending"
        title="Loved in homes across India"
        className="bg-secondary/40"
      >
        {loading ? (
          <div className="text-center py-12 text-sm text-muted-foreground">
            ⏳ Loading live inventory...
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {liveProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border border-primary px-8 py-3.5 rounded-xl font-medium hover:bg-primary hover:text-primary-foreground transition"
          >
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Lifestyle banner */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <img
          src={IMG.livingRoom}
          alt="Personalized wooden wall decor hanging in a warm living room"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <motion.div
          {...fade}
          className="container relative text-center text-white max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Decor that turns a house into a home
          </h2>
          <p className="mt-4 text-white/85 text-lg">
            Warm woods, soft finishes and personal touches designed to hang
            beautifully on your walls.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 bg-gold text-primary font-semibold px-8 py-4 rounded-xl active:scale-[0.98] transition"
          >
            Explore lifestyle <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* How customization works */}
      <Section kicker="Simple & effortless" title="How customization works">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ["Choose", "Pick a design, material and size"],
            ["Personalize", "Add names, icons & a custom quote"],
            ["Approve", "Preview & confirm your design"],
            ["Delivered", "Crafted with back hooks and shipped to your door"],
          ].map(([t, s], i) => (
            <motion.div
              key={t}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.08 }}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <span className="font-display text-4xl text-gold/40">
                0{i + 1}
              </span>
              <h3 className="font-display text-xl mt-2">{t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section kicker="Customer stories" title="Adored by 25,000+ homes">
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-7"
            >
              <Quote className="h-8 w-8 text-gold/50" />
              <div className="flex gap-0.5 mt-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-3 text-foreground/90 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="mt-5 font-semibold">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.city}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Corporate & Bulk */}
      <section id="corporate" className="py-12 md:py-16">
        <div className="container rounded-3xl bg-wood text-white p-10 md:p-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Corporate & bulk orders
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              Premium gifting, at scale
            </h2>
            <p className="text-white/80 mt-4 text-lg">
              Branded desk accessories, festive hampers and bulk nameplates with
              dedicated account management and GST invoicing.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Link
              to="/bulk-orders"
              className="inline-flex items-center gap-2 bg-white text-wood font-semibold px-8 py-4 rounded-xl active:scale-[0.98] transition"
            >
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-12 md:py-16 bg-secondary/40">
        <div className="container max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
            Stay inspired
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Join the Dzire circle
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Early access to new collections, design inspiration and exclusive
            offers.
          </p>
          <form
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 rounded-xl border border-border bg-card px-5 py-3.5 outline-none focus:border-gold transition"
            />
            <button className="bg-primary text-primary-foreground font-semibold px-7 py-3.5 rounded-xl active:scale-[0.98] transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
