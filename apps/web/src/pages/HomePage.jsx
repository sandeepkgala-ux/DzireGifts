import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Truck,
  ShieldCheck,
  Sparkles,
  Award,
  PenTool,
  Package,
  Gift,
  Play,
  Instagram,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import {
  IMG,
  categories,
  products,
  occasions,
  materials,
  testimonials,
} from "@/data/site";

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Section = ({ id, kicker, title, sub, children, className = "" }) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <div className="container">
      {(kicker || title) && (
        <motion.div {...fade} className="max-w-2xl mb-12 md:mb-16">
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-xs uppercase tracking-[0.4em] text-gold mb-6"
          >
            Handcrafted personalization
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: "easeOut" }}
            className="font-display text-4xl md:text-6xl lg:text-7xl max-w-3xl leading-[1.1]"
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
            <Link
              to="/shop"
              className="border border-white/50 backdrop-blur px-9 py-4 rounded-xl font-medium hover:bg-white/10 transition"
            >
              Explore Collections
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
            [Truck, "Free shipping", "On orders over \u20B92999"],
            [ShieldCheck, "Secure checkout", "UPI · Cards · COD · EMI"],
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

      {/* Categories */}
      <Section
        id="collections"
        kicker="Featured categories"
        title="Shop our signature collections"
        sub="From engraved villa boards to acrylic apartment plates and heartfelt personalized gifts."
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4]"
            >
              <Link to="/shop" className="block h-full w-full">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <span className="text-[0.65rem] uppercase tracking-wider text-gold">
                    {c.tag}
                  </span>
                  <h3 className="font-display text-xl mt-1">{c.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Bestsellers */}
      <Section
        id="products"
        kicker="Best sellers & trending"
        title="Loved in homes across India"
        className="bg-secondary/40"
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border border-primary px-8 py-3.5 rounded-xl font-medium hover:bg-primary hover:text-primary-foreground transition"
          >
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Personalization */}
      <section id="personalize" className="py-20 md:py-28">
        <div className="container grid lg:grid-cols-2 gap-14 items-center">
          <motion.div {...fade} className="relative">
            <img
              src={IMG.woodPlate}
              alt="Live preview of a personalized wooden nameplate"
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-2 md:right-6 bg-card rounded-2xl shadow-xl border border-border p-5 w-56">
              <p className="text-xs text-muted-foreground mb-1">Live preview</p>
              <p className="font-display text-2xl text-wood">The Kapoors</p>
              <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-2/3 bg-gold" />
              </div>
              <p className="text-[0.65rem] text-muted-foreground mt-1.5">
                18 / 24 characters · Hooks attached
              </p>
            </div>
          </motion.div>
          <motion.div {...fade}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Advanced personalization
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              Design it your way, in real time
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Choose your font, add a family surname, house number or a custom
              quote and watch it come alive instantly. Finished with secure back
              hooks ready for easy hanging.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {[
                [PenTool, "Live font & name preview"],
                [Sparkles, "AI design suggestions"],
                [Gift, "Icons & religious symbols"],
                [Package, "Hangs flush via back hooks"],
              ].map(([Icon, t], i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border p-4 bg-card"
                >
                  <Icon
                    className="h-5 w-5 text-gold shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm font-medium">{t}</span>
                </div>
              ))}
            </div>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold active:scale-[0.98] transition"
            >
              Start designing <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lifestyle banner */}
      <section className="relative py-28 md:py-40 overflow-hidden">
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

      {/* Shop by occasion / material */}
      <Section
        id="occasion"
        kicker="Curated for the moment"
        title="Shop by occasion & material"
      >
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display text-xl mb-4">By occasion</h3>
            <div className="flex flex-wrap gap-3">
              {occasions.map((o) => (
                <Link
                  key={o}
                  to="/shop"
                  className="px-5 py-2.5 rounded-full border border-border bg-card hover:border-gold hover:text-gold transition text-sm font-medium"
                >
                  {o}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl mb-4">By material</h3>
            <div className="flex flex-wrap gap-3">
              {materials.map((m) => (
                <Link
                  key={m}
                  to="/shop"
                  className="px-5 py-2.5 rounded-full border border-border bg-card hover:border-wood hover:text-wood transition text-sm font-medium"
                >
                  {m}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Craftsmanship story */}
      <section
        id="craft"
        className="py-20 md:py-28 bg-primary text-primary-foreground"
      >
        <div className="container grid lg:grid-cols-2 gap-14 items-center">
          <motion.div {...fade}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Our craftsmanship
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              Every piece begins with a pair of hands
            </h2>
            <p className="text-primary-foreground/70 mt-4 text-lg">
              Sourced hardwoods, hand-finished edges and precise engraving. Our
              artisans spend years perfecting the craft so your nameplate lasts
              a lifetime.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                ["12+", "Years of craft"],
                ["50k+", "Pieces engraved"],
                ["4.9", "Average rating"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl md:text-4xl text-gold">
                    {n}
                  </p>
                  <p className="text-sm text-primary-foreground/60 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.img
            {...fade}
            src={IMG.craftsman}
            alt="Artisan engraving a wooden nameplate"
            className="rounded-3xl shadow-2xl"
          />
        </div>
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

      {/* Packaging + Video */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container grid lg:grid-cols-2 gap-8">
          <motion.div
            {...fade}
            className="rounded-3xl overflow-hidden relative aspect-[4/3]"
          >
            <img
              src={IMG.giftBox}
              alt="Premium gift packaging"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="text-xs uppercase tracking-widest text-gold">
                  Premium packaging
                </p>
                <h3 className="font-display text-2xl mt-1">
                  Unboxing worth remembering
                </h3>
              </div>
            </div>
          </motion.div>
          <motion.div
            {...fade}
            className="rounded-3xl overflow-hidden relative aspect-[4/3] group cursor-pointer"
          >
            <img
              src={IMG.accessories}
              alt="Watch our craft video"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-105 transition">
                <Play className="h-8 w-8 text-primary fill-primary ml-1" />
              </div>
            </div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xs uppercase tracking-widest text-gold">
                Watch the story
              </p>
              <h3 className="font-display text-2xl mt-1">
                Inside our workshop
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* Instagram gallery */}
      <Section
        kicker="@dziregifts"
        title="From our community"
        className="bg-secondary/40"
      >
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            IMG.woodPlate,
            IMG.acrylic,
            IMG.islamic,
            IMG.giftBox,
            IMG.accessories,
            IMG.heroVilla,
          ].map((src, i) => (
            <Link
              key={i}
              to="/shop"
              className="group relative rounded-xl overflow-hidden aspect-square block"
            >
              <img
                src={src}
                alt="Instagram post from Dzire Gifts"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition">
                <Instagram className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Corporate & Bulk */}
      <section id="corporate" className="py-20 md:py-28">
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
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-wood font-semibold px-8 py-4 rounded-xl active:scale-[0.98] transition"
            >
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-20 md:py-28 bg-secondary/40">
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

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground/80 pt-16 pb-8">
        <div className="container grid md:grid-cols-4 gap-10">
          <div>
            <span className="font-display text-2xl text-primary-foreground">
              Dzire <span className="text-gold">Gifts</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed">
              Premium personalized name plates & wooden gifts, handcrafted in
              India for homes that tell a story.
            </p>
          </div>
          {[
            [
              "Shop",
              [
                "Nameplates",
                "Wooden Gifts",
                "Corporate",
                "Wedding Collection",
                "Gift Cards",
              ],
            ],
            [
              "Help",
              [
                "Track Order",
                "Shipping Policy",
                "Returns",
                "Customization Guide",
                "Contact",
              ],
            ],
            [
              "Company",
              ["About Us", "Craftsmanship", "Blog", "Careers", "Bulk Orders"],
            ],
          ].map(([h, items]) => (
            <div key={h}>
              <p className="font-semibold text-primary-foreground mb-4">{h}</p>
              <ul className="space-y-2.5 text-sm">
                {items.map((i) => (
                  <li key={i}>
                    <Link
                      to="/shop"
                      className="hover:text-gold transition-colors"
                    >
                      {i}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} Dzire Gifts. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/shop" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/shop" className="hover:text-gold">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
