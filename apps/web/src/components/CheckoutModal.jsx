import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useStore } from "../context/useStore";

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, cartSubtotal } = useStore();
  const [step, setStep] = useState("address");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const [shippingData, setShippingData] = useState({
    fullName: "Sandeep Gala",
    phone: "9876543210",
    email: "sandeep@dziregifts.in",
    address: "402, Heritage Villa, MG Road",
    city: "Mumbai",
    pincode: "400080",
    paymentMethod: "upi",
  });

  const handleInputChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const sendAutomatedWorkshopEmail = async (txnId) => {
    // Replace with your EmailJS or API call logic
    console.log("🚀 [SILENT EMAIL DISPATCH] Order:", txnId);
    setEmailSent(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Secure API Credentials
    const consumerKey = import.meta.env.VITE_WC_CONSUMER_KEY;
    const consumerSecret = import.meta.env.VITE_WC_CONSUMER_SECRET;
    const url = `https://dev.dziregifts.com/wp-json/wc/v3/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

    const orderData = {
      payment_method: shippingData.paymentMethod,
      payment_method_title: "Online Payment",
      set_paid: true,
      billing: {
        first_name: shippingData.fullName,
        address_1: shippingData.address,
        city: shippingData.city,
        email: shippingData.email,
        phone: shippingData.phone,
      },
      line_items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        setTransactionId(data.id);
        setStep("success");
        sendAutomatedWorkshopEmail(data.id);
      } else {
        console.error("Order failed:", data);
        alert("Payment failed, please check your console.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Connection error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const sendPaidOrderToWhatsApp = () => {
    const businessPhoneNumber = "919876543210";
    let message = `*✅ PAID ORDER CONFIRMED - DZIRE GIFTS*\n\n*Transaction ID:* #${transactionId}\n`;
    message += `*Amount:* ₹${cartSubtotal.toLocaleString()}\n`;
    message += `*Delivery:* ${shippingData.fullName}, ${shippingData.address}, ${shippingData.city}\n`;
    const encodedPayload = encodeURIComponent(message);
    window.open(
      `https://api.whatsapp.com/send?phone=${businessPhoneNumber}&text=${encodedPayload}`,
      "_blank",
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={step === "success" ? onClose : null}
      />
      <motion.div className="relative w-full max-w-xl bg-background border border-border rounded-3xl shadow-2xl overflow-hidden z-10">
        <div className="bg-card px-6 py-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-gold" />
            <span className="font-display font-semibold text-lg">
              Secure Checkout
            </span>
          </div>
        </div>

        {step === "address" && (
          <form
            onSubmit={() => setStep("payment")}
            className="p-6 md:p-8 space-y-5"
          >
            <h3 className="font-semibold text-sm uppercase text-muted-foreground">
              1. Delivery Address
            </h3>
            <input
              required
              name="fullName"
              placeholder="Full Name"
              value={shippingData.fullName}
              onChange={handleInputChange}
              className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm"
            />
            <input
              required
              name="address"
              placeholder="Address"
              value={shippingData.address}
              onChange={handleInputChange}
              className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-gold text-primary font-bold py-4 rounded-xl"
            >
              Continue <ArrowRight className="h-4 w-4 inline" />
            </button>
          </form>
        )}

        {step === "payment" && (
          <form onSubmit={handlePaymentSubmit} className="p-6 md:p-8 space-y-6">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gold text-primary font-bold py-4 rounded-xl disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin inline" />{" "}
                  Verifying...
                </>
              ) : (
                <>Pay Securely — ₹{cartSubtotal.toLocaleString()}</>
              )}
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="p-8 text-center space-y-6">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="font-display text-2xl font-bold">Thank You!</h2>
            <button
              onClick={sendPaidOrderToWhatsApp}
              className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl"
            >
              Chat with Designer <ArrowRight className="h-4 w-4 inline" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CheckoutModal;
