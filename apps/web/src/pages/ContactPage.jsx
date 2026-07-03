import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";

// ==========================================
// EASILY CONFIGURABLE CONTACT DETAILS
// Change these values whenever you are ready!
// ==========================================
const CONTACT_INFO = {
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210", // Enter without '+' or spaces for the clickable link
  email: "support@dziregifts.com",
  address:
    "Plot 42, Industrial Design Hub, Andheri West, Mumbai, Maharashtra 400053",
  workingHours: "Mon - Sat: 10:00 AM - 7:00 PM IST",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160999641!2d72.74109895311283!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
};

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNo: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        orderNo: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />

      {/* Page Header */}
      <header className="bg-secondary/50 border-b border-border pt-32 pb-16 text-center">
        <div className="container max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.3em] text-gold mb-3"
          >
            We’re Here to Help
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl leading-tight"
          >
            Get in Touch With Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 text-lg"
          >
            Have a custom design inquiry, corporate gifting request, or a
            question about your order? Connect with our design specialists.
          </motion.p>
        </div>
      </header>

      {/* Main Content Grid */}
      <section className="py-20 md:py-28">
        <div className="container grid lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards & WhatsApp Direct CTA */}
          <motion.div {...fade} className="lg:col-span-5 space-y-6">
            {/* WhatsApp VIP Card */}
            <div className="bg-gradient-to-br from-[#111] to-[#222] text-white p-7 rounded-2xl border border-gold/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-24 h-24 bg-gold/10 rounded-full blur-xl" />
              <p className="text-xs uppercase tracking-widest text-gold mb-2">
                Instant Support
              </p>
              <h3 className="font-display text-2xl mb-3">
                WhatsApp Design Studio
              </h3>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                Need quick advice on custom font sizing, urgent gifting
                delivery, or live artwork mockups? Chat directly with our
                support desk.
              </p>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=Hi%20Dzire%20Gifts!%20I%20have%20an%20inquiry%20about%20a%20custom%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full bg-[#25D366] text-black font-semibold py-3.5 px-6 rounded-xl hover:brightness-105 transition shadow-lg"
              >
                <MessageSquare className="h-5 w-5 fill-black" /> Chat on
                WhatsApp Now
              </a>
            </div>

            {/* Address & Info Box */}
            <div className="bg-card p-7 rounded-2xl border border-border space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-xl text-gold shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-base">Studio & Workshop</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-xl text-gold shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-base">Email Support</h4>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm text-muted-foreground hover:text-gold transition mt-1 block"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-xl text-gold shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-base">Call Us</h4>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-sm text-muted-foreground hover:text-gold transition mt-1 block"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-xl text-gold shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-base">Working Hours</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {CONTACT_INFO.workingHours}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            {...fade}
            className="lg:col-span-7 bg-card p-8 md:p-10 rounded-2xl border border-border shadow-sm"
          >
            <h3 className="font-display text-2xl md:text-3xl mb-2">
              Send Us a Message
            </h3>
            <p className="text-muted-foreground text-sm mb-8">
              Fill out the form below and our team will get back to you within
              24 business hours.
            </p>

            {submitted ? (
              <div className="py-16 text-center space-y-4 bg-secondary/30 rounded-xl p-6 border border-border">
                <CheckCircle2 className="h-12 w-12 text-gold mx-auto" />
                <h4 className="font-display text-2xl">Message Received!</h4>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Thank you for reaching out to Dzire Gifts. A design
                  representative is reviewing your note and will contact you
                  shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-gold transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-gold transition"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-gold transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Order ID (Optional)
                    </label>
                    <input
                      type="text"
                      name="orderNo"
                      value={formData.orderNo}
                      onChange={handleChange}
                      placeholder="e.g. DZ-1042"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-gold transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-gold transition"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Custom Design Request">
                      Custom Design Request
                    </option>
                    <option value="Order Status / Shipping">
                      Order Status / Shipping
                    </option>
                    <option value="Bulk & Corporate Gifting">
                      Bulk & Corporate Gifting
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    How Can We Help You? *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your custom text, dimensions needed, or any questions..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-gold transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:opacity-90 active:scale-[0.99] transition flex items-center justify-center gap-2 shadow-md"
                >
                  Submit Inquiry <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Embedded Google Map */}
      <section className="py-12 container">
        <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-80 w-full bg-secondary">
          <iframe
            title="Studio Location Map"
            src={CONTACT_INFO.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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

export default ContactPage;
