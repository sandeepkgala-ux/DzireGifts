import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, MessageSquare } from "lucide-react";

const ThankYouPage = () => {
  // Extract query parameters passed by CheckoutModal
  const queryParams = new URLSearchParams(window.location.search);
  const orderId = queryParams.get("order_id") || "N/A";
  const amount = queryParams.get("amount") || "0";
  const name = queryParams.get("name") || "Customer";
  const phone = queryParams.get("phone") || "";

  const sendPaidOrderToWhatsApp = () => {
    const message = `*✅ PAID ORDER CONFIRMED*\n\n*Order ID / Transaction:* #${orderId}\n*Amount Paid:* ₹${amount}\n*Customer Name:* ${name}\n*Phone:* ${phone}`;
    window.open(
      `https://api.whatsapp.com/send?phone=919876543210&text=${encodeURIComponent(
        message,
      )}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-card border border-border rounded-3xl p-8 shadow-2xl text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="inline-flex p-4 bg-green-500/10 rounded-full text-green-500"
        >
          <CheckCircle2 className="h-16 w-16" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-display">Order Confirmed!</h1>
          <p className="text-muted-foreground text-sm">
            Thank you for shopping with Dzire Gifts, {name}. We are preparing
            your personalized order.
          </p>
        </div>

        <div className="bg-secondary/50 rounded-2xl p-4 text-left space-y-2 text-sm border border-border/50">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order Reference:</span>
            <span className="font-semibold text-gold">#{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount Paid:</span>
            <span className="font-semibold">₹{amount}</span>
          </div>
        </div>

        <div className="pt-2 space-y-3">
          <button
            onClick={sendPaidOrderToWhatsApp}
            className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-105 transition flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-5 w-5" />
            Send Details to WhatsApp
          </button>

          <a
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Store
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
