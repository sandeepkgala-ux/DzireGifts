import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Lock, Loader2 } from "lucide-react";
import { useStore } from "../context/useStore";

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, cartSubtotal, clearCart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const initialShippingState = {
    fullName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    pincode: "",
  };

  const [shippingData, setShippingData] = useState(initialShippingState);

  const handleInputChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handleModalClose = () => {
    setShippingData(initialShippingState);
    onClose();
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (typeof window.Razorpay === "undefined") {
      alert("Payment gateway is still loading. Please wait a second.");
      return;
    }
    setIsProcessing(true);

    try {
      // 1. Create Razorpay Order securely via backend proxy
      const createOrderRes = await fetch(
        "/wp-json/custom-razorpay/v1/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: cartSubtotal * 100 }),
        },
      );

      const orderData = await createOrderRes.json();
      if (!createOrderRes.ok || !orderData.id) {
        throw new Error("Could not initialize payment order.");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Dzire Gifts",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async function (response) {
          const formattedLineItems = cart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            meta_data: item.customDetails
              ? Object.entries(item.customDetails).map(([k, v]) => ({
                  key: k,
                  value: String(v),
                }))
              : [],
          }));

          const combinedAddress2 = `${shippingData.address2} ${
            shippingData.landmark
              ? "(Landmark: " + shippingData.landmark + ")"
              : ""
          }`.trim();

          const finalOrderData = {
            payment_method: "razorpay",
            payment_method_title: "Razorpay",
            set_paid: true,
            currency: "INR",
            transaction_id: response.razorpay_payment_id,
            billing: {
              first_name: shippingData.fullName,
              address_1: shippingData.address1,
              address_2: combinedAddress2,
              city: shippingData.city,
              postcode: shippingData.pincode,
              email: shippingData.email,
              phone: shippingData.phone,
              country: "IN",
            },
            shipping: {
              first_name: shippingData.fullName,
              address_1: shippingData.address1,
              address_2: combinedAddress2,
              city: shippingData.city,
              postcode: shippingData.pincode,
              country: "IN",
            },
            line_items: formattedLineItems,
          };

          // 2. Call Internal Proxy Endpoint to create WC Order safely
          try {
            const res = await fetch("/wp-json/custom-wc/v1/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(finalOrderData),
            });
            const data = await res.json();
            console.log("Internal WC Order Response:", data);

            // Empty the local store/cart on successful order creation
            if (clearCart) clearCart();

            // INSTANT REDIRECT TO THANK YOU ROUTE
            const orderId = data.id || response.razorpay_payment_id;
            const targetUrl = `/thank-you?order_id=${encodeURIComponent(
              orderId,
            )}&amount=${encodeURIComponent(cartSubtotal)}&name=${encodeURIComponent(
              shippingData.fullName,
            )}&phone=${encodeURIComponent(shippingData.phone)}`;

            window.location.href = targetUrl;
          } catch (error) {
            console.error("WooCommerce error:", error);
            // Even if background logging throws a network blip, redirect with Razorpay ID
            if (clearCart) clearCart();
            window.location.href = `/thank-you?order_id=${encodeURIComponent(
              response.razorpay_payment_id,
            )}&amount=${encodeURIComponent(cartSubtotal)}&name=${encodeURIComponent(
              shippingData.fullName,
            )}&phone=${encodeURIComponent(shippingData.phone)}`;
          }
        },
        prefill: {
          name: shippingData.fullName,
          email: shippingData.email,
          contact: shippingData.phone,
        },
        theme: { color: "#C5A059" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Unable to initiate checkout. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={handleModalClose}
      />
      <motion.div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-background border rounded-3xl shadow-2xl z-10 p-8 scrollbar-hide">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-background pb-2 z-20">
          <span className="font-semibold text-lg flex items-center gap-2">
            <Lock className="h-4 w-4 text-gold" /> Secure Checkout
          </span>
          <button
            onClick={handleModalClose}
            className="p-1 hover:bg-secondary rounded-full transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <input
            required
            name="fullName"
            placeholder="Name on the Parcel"
            value={shippingData.fullName}
            onChange={handleInputChange}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
          />
          <input
            required
            name="email"
            type="email"
            placeholder="Email Address"
            value={shippingData.email}
            onChange={handleInputChange}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
          />
          <input
            required
            name="phone"
            type="tel"
            pattern="[0-9]{10}"
            maxLength="10"
            placeholder="10-digit Mobile Number"
            value={shippingData.phone}
            onChange={handleInputChange}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
          />
          <input
            required
            name="address1"
            placeholder="Flat, House no., Building, Apartment"
            value={shippingData.address1}
            onChange={handleInputChange}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
          />
          <input
            name="address2"
            placeholder="Area, Street, Sector, Village (Optional)"
            value={shippingData.address2}
            onChange={handleInputChange}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
          />
          <input
            name="landmark"
            placeholder="Landmark e.g. near Apollo Hospital (Optional)"
            value={shippingData.landmark}
            onChange={handleInputChange}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              name="city"
              placeholder="Town/City"
              value={shippingData.city}
              onChange={handleInputChange}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
            />
            <input
              required
              name="pincode"
              type="text"
              pattern="[0-9]{6}"
              maxLength="6"
              placeholder="6-digit Pincode"
              value={shippingData.pincode}
              onChange={handleInputChange}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition"
            />
          </div>
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gold text-primary font-bold py-4 rounded-xl mt-6 shadow-lg hover:brightness-105 transition disabled:opacity-70 flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                Processing...
              </>
            ) : (
              `Pay ₹${cartSubtotal} via Razorpay`
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CheckoutModal;
