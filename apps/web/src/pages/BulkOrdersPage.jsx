import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  MessageSquare,
  Mail,
  Loader2,
} from "lucide-react";

const BulkOrdersPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    quantity: "",
    details: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // WhatsApp Logic (Opens App)
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const msg = `*🏢 NEW BULK / CORPORATE INQUIRY*\n\n*Name:* ${formData.name}\n*Company:* ${formData.company || "N/A"}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Estimated Quantity:* ${formData.quantity}\n\n*Requirements:*\n${formData.details}`;
    window.open(
      `https://api.whatsapp.com/send?phone=919876543210&text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    setSubmitted(true);
  };

  // EmailJS Logic (Silent Background Send)
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // REPLACE THESE THREE WITH YOUR ACTUAL EMAILJS DASHBOARD VALUES
      await emailjs.send(
        "service_pio5l1l",
        "template_3rav90e",
        {
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          email: formData.email,
          quantity: formData.quantity,
          details: formData.details,
        },
        "F-9v2ovY8D0cvvr4_",
      );
      setSubmitted(true);
    } catch (error) {
      alert(
        "Failed to send email. Please try WhatsApp or check your internet.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-36 md:pt-44 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-card border border-border rounded-3xl p-6 md:p-10 shadow-2xl space-y-8 z-10"
      >
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-gold/10 rounded-2xl text-gold mb-1">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold font-display">
            Corporate & Bulk Orders
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Partner with Dzire Gifts for customized name plates, employee
            gifting, wedding favors, and housing society bulk requirements at
            wholesale pricing.
          </p>
        </div>

        {!submitted ? (
          <form className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">
                  Your Full Name *
                </label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sandeep Gala"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">
                  Company / Society Name
                </label>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Heritage Heights / Infosys"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">
                Estimated Quantity Needed *
              </label>
              <input
                required
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g. 25 units, 100+ units"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">
                Customization Requirements *
              </label>
              <textarea
                required
                rows="3"
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Tell us about your custom material, engraving, timeline, or sizing needs..."
                className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <button
                type="button"
                onClick={handleEmailSubmit}
                disabled={loading}
                className="w-full bg-secondary text-foreground hover:bg-secondary/80 border border-border font-bold py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Mail className="w-4 h-4 text-gold" />
                )}
                {loading ? "Sending..." : "Send via Email"}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="w-full bg-gold text-primary font-bold py-3.5 rounded-xl shadow-lg hover:brightness-105 transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Send via WhatsApp
              </button>
            </div>
          </form>
        ) : (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-center py-8 space-y-4 bg-secondary/30 rounded-2xl p-6 border border-border"
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-bold font-display">
              Inquiry Submitted!
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-sm mx-auto">
              Our B2B team has received your details and will review your
              requirements. You will hear back from us within 2–4 business
              hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-gold font-semibold underline pt-2 block mx-auto"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BulkOrdersPage;
