import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Award,
  PenTool,
  ShieldCheck,
  ArrowRight,
  Heart,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />

      {/* COMPACT LUXURY HEADER - Tight vertical padding, zero space wasted */}
      <header className="bg-gradient-to-b from-secondary/80 to-background border-b border-border/60 pt-24 pb-8 text-center relative">
        <div className="container max-w-2xl mx-auto">
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold font-semibold block mb-1">
            Our Story & Craft
          </span>
          <h1 className="font-display text-3xl md:text-5xl tracking-tight">
            Where Precision Meets Heritage
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-lg mx-auto leading-relaxed">
            We transform hardwood, acrylic, and metallic finishes into timeless
            personalized decor designed to elevate your entrance.
          </p>
        </div>
      </header>

      {/* EDITORIAL SPLIT: BRAND PHILOSOPHY & IMPACT STATS */}
      <section className="py-16 md:py-20">
        <div className="container grid lg:grid-cols-12 gap-10 items-center">
          <motion.div {...fade} className="lg:col-span-7 space-y-5">
            <h2 className="font-display text-2xl md:text-4xl leading-snug">
              Every Home Has a Identity. <br className="hidden sm:inline" />
              <span className="italic text-gold">
                We Make Sure It Gets Noticed.
              </span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Founded with a passion for custom artistry, Dzire Gifts bridges
              the gap between mass-produced home accessories and genuine bespoke
              craftsmanship. Whether crafting an intricate laser-cut villa
              nameplate or an apartment entrance plaque, we treat every order as
              a permanent centerpiece for your home.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              We engineered out the common frustrations of online decor:
              replacing flimsy adhesives with heavy-duty back hooks for flush
              mounting, applying all-over weather protection, and sending real
              design mockups before our lasers even fire.
            </p>

            {/* Key Assurance Badges */}
            <div className="pt-2 grid sm:grid-cols-2 gap-3 text-sm font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                <span>Custom Artwork Approval</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                <span>Heavy-Duty Back Hooks Attached</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                <span>All-Over Weatherproofing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                <span>Handcrafted in India</span>
              </div>
            </div>
          </motion.div>

          {/* High-Impact Stat Tower */}
          <motion.div
            {...fade}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
              <p className="font-display text-3xl md:text-4xl text-gold font-bold">
                25,000+
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1 font-medium">
                Homes Adorned
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
              <p className="font-display text-3xl md:text-4xl text-gold font-bold">
                4.9 ★
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1 font-medium">
                Avg Customer Rating
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center col-span-2">
              <p className="font-display text-3xl md:text-4xl text-foreground font-bold">
                100% Bespoke
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1 font-medium">
                Made-to-Order to Your Exact Specs
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 LUXURY PILLARS - Structured, cohesive grid */}
      <section className="py-16 bg-secondary/30 border-y border-border">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-display text-2xl md:text-3xl">
              The Dzire Standard
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Why homes across India trust our workshop
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Uncompromising Materials",
                desc: "We utilize dense hardwoods, virgin mirror acrylics, and imported metallic ABS sheets that resist fading and warping over decades of use.",
              },
              {
                icon: PenTool,
                title: "Millimeter Laser Precision",
                desc: "Our typography and cutwork rings are guided by advanced CAD artwork, ensuring interconnected lettering looks crisp and flawless.",
              },
              {
                icon: ShieldCheck,
                title: "Engineered for Flush Hanging",
                desc: "No wobbly bases or double-sided tape drop-offs. Every nameplate is fitted with sturdy back hooks so it hangs securely and beautifully.",
              },
            ].map((pillar, i) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={i}
                  {...fade}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card p-7 rounded-2xl border border-border hover:border-gold/50 transition duration-300 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-gold mb-5">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-1.5 text-xs font-semibold text-gold uppercase tracking-wider">
                    <span>Guaranteed Craft</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPACT CTA BANNER */}
      <section className="py-16 text-center">
        <div className="container max-w-xl">
          <motion.div
            {...fade}
            className="bg-primary text-primary-foreground p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
            <Sparkles className="h-8 w-8 text-gold mx-auto mb-3" />
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Start Crafting Your Nameplate
            </h2>
            <p className="text-primary-foreground/70 text-sm mt-2 max-w-md mx-auto">
              Explore our live inventory, test font layouts, and let our
              artisans build your home’s signature piece.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 bg-gold text-primary font-semibold px-7 py-3 rounded-xl hover:brightness-105 active:scale-[0.98] transition shadow-md text-sm"
            >
              Explore Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Standard Footer */}
      <footer className="bg-primary text-primary-foreground/80 py-10 border-t border-white/10 text-center text-xs">
        <div className="container">
          <p className="font-display text-lg text-white mb-1">
            Dzire <span className="text-gold">Gifts</span>
          </p>
          <p className="text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Dzire Gifts. Handcrafted with
            pride in India.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
