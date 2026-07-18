import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  Truck,
  Phone,
} from "lucide-react";

const WP_BASE_URL = "https://dev.dziregifts.com";

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrderData(null);

    const cleanOrderId = orderId.replace(/[^0-9]/g, "");
    const cleanPhone = phone.trim();

    if (!cleanOrderId || cleanPhone.length < 10) {
      setError(
        "Please enter a valid Order ID and your 10-digit mobile number.",
      );
      setLoading(false);
      return;
    }

    try {
      // THIS IS THE CRITICAL LINE: It must point to admin-ajax.php, not wp-json
      const url = `${WP_BASE_URL}/wp-admin/admin-ajax.php?action=custom_track_order&order_id=${cleanOrderId}&phone=${cleanPhone}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.data?.message ||
            "Could not find an order matching these details.",
        );
      }

      setOrderData(result.data);
    } catch (err) {
      setError(
        err.message ||
          "Unable to retrieve order status. Please verify your details.",
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || "";
    if (s === "completed" || s === "delivered") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" /> Delivered / Completed
        </span>
      );
    }
    if (s === "processing") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <Clock className="w-3.5 h-3.5" /> In Production / Processing
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 capitalize">
        <Truck className="w-3.5 h-3.5" /> {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-36 md:pt-44 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl space-y-6 z-10"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-secondary rounded-2xl text-gold mb-1">
            <Package className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-display">Track Your Order</h1>
          <p className="text-muted-foreground text-sm">
            Enter your Order ID and the mobile number used during checkout to
            see live updates.
          </p>
        </div>

        <form onSubmit={handleTrackSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">
              Order ID / Reference Number
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 26"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">
              Billing Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 outline-none focus:border-gold transition text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-primary font-bold py-3.5 rounded-xl shadow-md hover:brightness-105 transition disabled:opacity-70 flex items-center justify-center gap-2 text-sm mt-2"
          >
            {loading ? (
              "Searching..."
            ) : (
              <>
                <Search className="w-4 h-4" /> Track Order Status
              </>
            )}
          </button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {orderData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 bg-secondary/40 border border-border rounded-2xl space-y-3 pt-4"
          >
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <span className="text-xs font-semibold text-muted-foreground">
                Order #{orderData.order_id}
              </span>
              {getStatusBadge(orderData.status)}
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="font-medium">{orderData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-semibold text-gold">
                  ₹{orderData.total}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TrackOrderPage;
