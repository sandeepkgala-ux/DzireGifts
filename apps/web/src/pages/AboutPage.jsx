import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Award,
  PenTool,
  Heart,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />

      {/* Header Banner */}
      <header className="bg-secondary/50 border-b border-border pt-32 pb-16 text-center relative overflow-hidden">
        <div className="container relative z-10 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.3em] text-gold mb-3"
          >
            Our Heritage & Craft
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl leading-tight"
          >
            Crafting the Identity of Your Sacred Space
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-5 text-lg leading-relaxed"
          >
            At Dzire Gifts, we believe the entrance to your home is more than
            just a doorway—it’s the beginning of your family's story. We blend
            modern laser precision with traditional Indian craftsmanship.
          </motion.p>
        </div>
      </header>

      {/* The Story Section */}
      <section className="py-20 md:py-28">
        <div className="container grid lg:grid-cols-2 gap-14 items-center">
          <motion.div {...fade} className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Where Art Meets Precision
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              Designed with Purpose, Built to Last a Lifetime
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every home has a distinct heartbeat. Whether it’s a sprawling
              villa, a modern apartment, or a cozy family residence, your
              nameplate is the first greeting your guests receive.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We started with a simple vision: to elevate everyday home
              furnishings into personalized art. By sourcing premium acrylics,
              high-grade MDF, and metallic laminates, and engineering them with
              secure hanging mechanisms, we ensure your decor looks immaculate
              from every angle.
            </p>
            <div className="pt-4 flex items-center gap-6">
              <div className="border-l-2 border-gold pl-4">
                <p className="font-display text-3xl font-bold">25,000+</p>
                <p className="text-sm text-muted-foreground">
                  Happy Homes Across India
                </p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <p className="font-display text-3xl font-bold">100%</p>
                <p className="text-sm text-muted-foreground">
                  Handcrafted Precision
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade} className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-8">
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                <Award className="h-8 w-8 text-gold mb-3" />
                <h3 className="font-display text-lg font-semibold">
                  Premium Materials
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Sourced weather-resistant laminates and rich wood textures.
                </p>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                <PenTool className="h-8 w-8 text-gold mb-3" />
                <h3 className="font-display text-lg font-semibold">
                  Custom Artwork
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Live design previews and custom typography layouts.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                <Sparkles className="h-8 w-8 text-gold mb-3" />
                <h3 className="font-display text-lg font-semibold">
                  Flawless Finish
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Ultra-clean edge cuts and all-over surface protection.
                </p>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                <ShieldCheck className="h-8 w-8 text-gold mb-3" />
                <h3 className="font-display text-lg font-semibold">
                  Secure Mounting
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Engineered with sturdy back hooks for flush wall hanging.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary/30 border-y border-border">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div {...fade}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
              Our Process
            </p>
            <h2 className="font-display text-3xl md:text-4xl">
              From Your Mind to Your Doorstep
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
              {[
                [
                  "01. Conceptualization",
                  "You enter your names, choose fonts, and add specific instructions directly in our online studio.",
                ],
                [
                  "02. Precision Cutting",
                  "Our high-precision laser machines cut and engrave your pieces with millimeter perfection.",
                ],
                [
                  "03. Hand Assembly",
                  "Master artisans assemble layers, apply allover protective coatings, and attach heavy-duty back hooks.",
                ],
              ].map(([title, desc], i) => (
                <div
                  key={i}
                  className="bg-card p-6 rounded-2xl border border-border"
                >
                  <span className="font-display text-lg font-semibold text-gold block mb-2">
                    {title}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="container max-w-2xl">
          <motion.div {...fade}>
            <Heart className="h-10 w-10 text-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              Ready to Personalize Your Entrance?
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Explore our complete collection of nameplates, custom clocks, and
              luxury decor.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition shadow-lg"
            >
              Explore Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Clean Standard Footer */}
      <footer className="bg-primary text-primary-foreground/80 py-12 border-t border-white/10 text-center text-sm">
        <div className="container">
          <p className="font-display text-xl text-white mb-2">
            Dzire <span className="text-gold">Gifts</span>
          </p>
          <p className="text-xs text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Dzire Gifts. Handcrafted with
            pride in India.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
