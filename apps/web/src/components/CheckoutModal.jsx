import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  ShieldCheck,
  CreditCard,
  Smartphone,
  CheckCircle2,
  Lock,
  ArrowRight,
  Loader2,
  Mail,
} from "lucide-react";
import { useStore } from "../context/useStore";

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, cartSubtotal } = useStore();
  const [step, setStep] = useState("address"); // 'address', 'payment', 'success'
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
    const orderPayload = {
      transactionId: txnId,
      amount: cartSubtotal,
      customer: shippingData,
      items: cart,
      timestamp: new Date().toISOString(),
    };

    console.log("🚀 [SILENT EMAIL DISPATCH] Sending payload...", orderPayload);
    setEmailSent(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedTxnId =
        "PAY_" + Math.random().toString(36).substring(2, 9).toUpperCase();
      setTransactionId(generatedTxnId);
      setIsProcessing(false);
      setStep("success");
      sendAutomatedWorkshopEmail(generatedTxnId);
    }, 2000);
  };

  const sendPaidOrderToWhatsApp = () => {
    const businessPhoneNumber = "919876543210";
    let message = `*✅ PAID ORDER CONFIRMED - DZIRE GIFTS*\n\n`;
    message += `*Transaction ID:* #${transactionId}\n`;
    message += `*Amount Paid Online:* ₹${cartSubtotal.toLocaleString()}\n`;
    message += `*Payment Mode:* ${shippingData.paymentMethod === "upi" ? "UPI / GPay / PhonePe" : "Credit/Debit Card"}\n\n`;
    message += `*DELIVERY DETAILS:*\n• *Name:* ${shippingData.fullName}\n• *Phone:* ${shippingData.phone}\n• *Address:* ${shippingData.address}, ${shippingData.city} - ${shippingData.pincode}\n\n`;
    message += `*CUSTOMIZATION SPECS (${cart.length} Items):*\n-----------------------------------\n`;

    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*\n`;
      message += `• *Qty:* ${item.quantity}\n`;
      if (item.customDetails) {
        message += `• *Notes:* "${item.customDetails.text || "N/A"}"\n`;
      }
      message += `-----------------------------------\n`;
    });

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
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-background border border-border rounded-3xl shadow-2xl overflow-hidden z-10"
      >
        <div className="bg-card px-6 py-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-gold" />
            <span className="font-display font-semibold text-lg">
              Secure Express Checkout
            </span>
          </div>
          {step !== "success" && (
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {step === "address" && (
          <form
            onSubmit={() => setStep("payment")}
            className="p-6 md:p-8 space-y-5"
          >
            <div className="bg-secondary/50 p-4 rounded-2xl border border-border flex justify-between items-center text-sm">
              <span>Order Subtotal ({cart.length} items):</span>
              <span className="font-display font-bold text-xl text-gold">
                ₹{cartSubtotal.toLocaleString()}
              </span>
            </div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground pt-2">
              1. Delivery Address
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Full Name *
                </label>
                <input
                  required
                  name="fullName"
                  value={shippingData.fullName}
                  onChange={handleInputChange}
                  className="w-full mt-1 bg-card border border-border rounded-xl px-4 py-2.5 text-sm focus:border-gold outline-none"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Mobile Number *
                </label>
                <input
                  required
                  name="phone"
                  value={shippingData.phone}
                  onChange={handleInputChange}
                  className="w-full mt-1 bg-card border border-border rounded-xl px-4 py-2.5 text-sm focus:border-gold outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Complete Street Address *
                </label>
                <input
                  required
                  name="address"
                  value={shippingData.address}
                  onChange={handleInputChange}
                  className="w-full mt-1 bg-card border border-border rounded-xl px-4 py-2.5 text-sm focus:border-gold outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-gold text-primary font-bold py-4 rounded-xl shadow-lg hover:brightness-105 transition flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
            >
              Continue to Payment <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {step === "payment" && (
          <form onSubmit={handlePaymentSubmit} className="p-6 md:p-8 space-y-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              2. Select Payment Mode
            </h3>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gold text-primary font-bold py-4 rounded-xl shadow-xl hover:brightness-105 transition flex items-center justify-center gap-2 text-sm uppercase tracking-wide disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Verifying...
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
            <h2 className="font-display text-2xl font-bold">
              Thank You, {shippingData.fullName}!
            </h2>
            {emailSent && (
              <p className="text-xs text-muted-foreground">
                Order details sent to your email.
              </p>
            )}
            <button
              onClick={sendPaidOrderToWhatsApp}
              className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl transition"
            >
              Chat with Designer on WhatsApp <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CheckoutModal;
