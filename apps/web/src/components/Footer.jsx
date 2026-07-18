import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16 pt-12 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Info */}
        <div className="space-y-3">
          <span className="text-xl font-bold font-display tracking-wide">
            Dzire <span className="text-gold">Gifts</span>
          </span>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Premium handcrafted personalized decor, laser-cut name plates, and
            bespoke gifts crafted with precision and elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Explore</h4>
          <ul className="space-y-2 text-muted-foreground text-xs">
            <li>
              <Link to="/shop" className="hover:text-gold transition">
                Full Catalog
              </Link>
            </li>
            <li>
              <Link to="/bulk-orders" className="hover:text-gold transition">
                Corporate & Bulk Orders
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold transition">
                About Our Workshop
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Customer Care</h4>
          <ul className="space-y-2 text-muted-foreground text-xs">
            <li>
              <Link to="/track-order" className="hover:text-gold transition">
                Track Your Order
              </Link>
            </li>
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=919876543210"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition"
              >
                WhatsApp Support
              </a>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold transition">
                Shipping & Returns
              </Link>
            </li>
          </ul>
        </div>

        {/* Workshop Address */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Get in Touch</h4>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Need custom design modifications?
            <br />
            Email: support@dziregifts.com
            <br />
            Hours: Mon - Sat, 10 AM - 7 PM IST
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Dzire Gifts. All rights reserved. Secure
        Razorpay Checkout.
      </div>
    </footer>
  );
};

export default Footer;
