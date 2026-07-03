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
import { useCart } from "@/context/CartContext";

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal } = useCart();

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

  // Automated Background Email Dispatcher
  const sendAutomatedWorkshopEmail = async (txnId) => {
    const orderPayload = {
      transactionId: txnId,
      amount: cartTotal,
      customer: shippingData,
      items: cartItems,
      timestamp: new Date().toISOString(),
    };

    console.log(
      "🚀 [SILENT EMAIL DISPATCH] Sending payload to workshop email...",
      orderPayload,
    );

    /* 
      PRODUCTION HOOKUP:
      When going live, replace this comment with a call to EmailJS or your API endpoint:
      
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'YOUR_SERVICE_ID',
          template_id: 'YOUR_TEMPLATE_ID',
          user_id: 'YOUR_PUBLIC_KEY',
          template_params: orderPayload
        })
      });
    */

    setEmailSent(true);
  };

  // Simulate Payment Processing & Trigger Automated Email
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedTxnId =
        "PAY_" + Math.random().toString(36).substring(2, 9).toUpperCase();
      setTransactionId(generatedTxnId);
      setIsProcessing(false);
      setStep("success");

      // Fire automated email silently in background the moment payment succeeds!
      sendAutomatedWorkshopEmail(generatedTxnId);
    }, 2000);
  };

  // Foreground WhatsApp Dispatch (For tech-savvy customers who want to chat)
  const sendPaidOrderToWhatsApp = () => {
    const businessPhoneNumber = "919876543210"; // Replace with your WhatsApp number

    let message = `*✅ PAID ORDER CONFIRMED - DZIRE GIFTS*\n\n`;
    message += `*Transaction ID:* #${transactionId}\n`;
    message += `*Amount Paid Online:* ₹${cartTotal.toLocaleString()}\n`;
    message += `*Payment Mode:* ${shippingData.paymentMethod === "upi" ? "UPI / GPay / PhonePe" : "Credit/Debit Card"}\n\n`;

    message += `*DELIVERY DETAILS:*\n`;
    message += `• *Name:* ${shippingData.fullName}\n`;
    message += `• *Phone:* ${shippingData.phone}\n`;
    message += `• *Address:* ${shippingData.address}, ${shippingData.city} - ${shippingData.pincode}\n\n`;

    message += `*CUSTOMIZATION SPECS (${cartItems.length} Items):*\n`;
    message += `-----------------------------------\n`;

    cartItems.forEach((item, index) => {
      message += `*${index + 1}. ${item.title}*\n`;
      message += `• *Size/Material:* ${item.size} (${item.material})\n`;
      if (item.customization) {
        message += `• *Primary Name:* "${item.customization.primaryName || "N/A"}"\n`;
        if (item.customization.secondaryDetails)
          message += `• *Sub-text:* "${item.customization.secondaryDetails}"\n`;
        if (item.customization.designNotes)
          message += `• *Notes:* "${item.customization.designNotes}"\n`;
      }
      message += `-----------------------------------\n`;
    });

    message += `\n_Payment is 100% cleared. Please initiate 2D digital mockup for client WhatsApp approval._`;

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
        {/* Header */}
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

        {/* STEP 1: SHIPPING ADDRESS */}
        {step === "address" && (
          <form
            onSubmit={() => setStep("payment")}
            className="p-6 md:p-8 space-y-5"
          >
            <div className="bg-secondary/50 p-4 rounded-2xl border border-border flex justify-between items-center text-sm">
              <span>Order Subtotal ({cartItems.length} items):</span>
              <span className="font-display font-bold text-xl text-gold">
                &#8377;{cartTotal.toLocaleString()}
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
                  Mobile Number (For Mockup WhatsApp) *
                </label>
                <input
                  required
                  name="phone"
                  value={shippingData.phone}
                  onChange={handleInputChange}
                  className="w-full mt-1 bg-card border border-border rounded-xl px-4 py-2.5 text-sm focus:border-gold outline-none"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Email Address (For Receipt) *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={shippingData.email}
                  onChange={handleInputChange}
                  className="w-full mt-1 bg-card border border-border rounded-xl px-4 py-2.5 text-sm focus:border-gold outline-none"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-medium text-muted-foreground">
                  City *
                </label>
                <input
                  required
                  name="city"
                  value={shippingData.city}
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
                  placeholder="Flat / House No / Building / Street"
                  className="w-full mt-1 bg-card border border-border rounded-xl px-4 py-2.5 text-sm focus:border-gold outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gold text-primary font-bold py-4 rounded-xl shadow-lg hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
            >
              Continue to Payment Options <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT SELECTION */}
        {step === "payment" && (
          <form onSubmit={handlePaymentSubmit} className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                2. Select Payment Mode
              </h3>
              <button
                type="button"
                onClick={() => setStep("address")}
                className="text-xs text-gold hover:underline"
              >
                Edit Address
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() =>
                  setShippingData({ ...shippingData, paymentMethod: "upi" })
                }
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition ${shippingData.paymentMethod === "upi" ? "border-gold bg-gold/10 shadow" : "border-border bg-card hover:border-muted-foreground"}`}
              >
                <div className="flex justify-between items-center">
                  <Smartphone className="h-6 w-6 text-gold" />
                  <span className="text-[0.65rem] bg-gold/20 text-gold px-2 py-0.5 rounded font-semibold uppercase">
                    Instant
                  </span>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-sm">UPI / QR Code</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    GPay, PhonePe, Paytm, BHIM
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setShippingData({ ...shippingData, paymentMethod: "card" })
                }
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition ${shippingData.paymentMethod === "card" ? "border-gold bg-gold/10 shadow" : "border-border bg-card hover:border-muted-foreground"}`}
              >
                <div className="flex justify-between items-center">
                  <CreditCard className="h-6 w-6 text-gold" />
                  <span className="text-[0.65rem] bg-secondary text-muted-foreground px-2 py-0.5 rounded font-semibold uppercase">
                    Secure
                  </span>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-sm">Cards & Netbanking</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Visa, Mastercard, RuPay, HDFC
                  </p>
                </div>
              </button>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gold text-primary font-bold py-4 rounded-xl shadow-xl hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 text-sm uppercase tracking-wide disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Verifying Bank
                  Payment...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" /> Pay Securely — &#8377;
                  {cartTotal.toLocaleString()}
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 3: PAYMENT SUCCESSFUL & AUTO-EMAIL NOTIFICATION */}
        {step === "success" && (
          <div className="p-8 text-center space-y-6">
            <div className="h-16 w-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-green-500">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-green-500">
                Payment Confirmed
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold mt-1">
                Thank You, {shippingData.fullName}!
              </h2>
              <p className="text-xs text-muted-foreground mt-2">
                Transaction ID:{" "}
                <strong className="text-foreground">{transactionId}</strong>
              </p>
            </div>

            {/* AUTOMATED EMAIL CONFIRMATION BADGE */}
            {emailSent && (
              <div className="bg-secondary/70 border border-border rounded-2xl p-3.5 flex items-center justify-center gap-2.5 text-xs font-medium text-foreground">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <span>
                  Automated Order Copy Dispatched to Workshop Inbox & Customer
                  Email
                </span>
              </div>
            )}

            <div className="bg-card border border-border rounded-2xl p-4 text-xs space-y-2 text-left">
              <p className="font-semibold text-gold">What Happens Next?</p>
              <p className="text-muted-foreground leading-relaxed">
                Your payment of{" "}
                <strong className="text-foreground">
                  &#8377;{cartTotal.toLocaleString()}
                </strong>{" "}
                is secured. Even if you close this window, our manufacturing
                team has received your exact specifications via automated email.
              </p>
            </div>

            <button
              onClick={sendPaidOrderToWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
            >
              Optional: Chat with Designer on WhatsApp{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CheckoutModal;
