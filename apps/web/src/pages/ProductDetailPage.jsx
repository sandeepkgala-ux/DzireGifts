import React, { useState } from "react";
import {
  Star,
  ShieldCheck,
  Truck,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { IMG } from "@/data/site";

// ==========================================
// MODULAR CUSTOMIZATION CONFIGURATION
// Easily add, remove, or edit fields here later!
// ==========================================
const CUSTOMIZATION_FIELDS = [
  {
    id: "primaryName",
    label: "Primary Name / Title",
    placeholder: "e.g., The Kapoors or Sharma Villa",
    type: "text",
    required: true,
    helperText: "Main typography to be featured on the nameplate.",
  },
  {
    id: "secondaryDetails",
    label: "Secondary Details (Optional)",
    placeholder: "e.g., Flat 402, Oakwood or House Number",
    type: "text",
    required: false,
    helperText: "Additional details or street names placed below.",
  },
  {
    id: "designNotes",
    label: "Special Design Instructions (Optional)",
    placeholder:
      "e.g., Please add a small Ganeshji icon on the left, or prefer script font.",
    type: "textarea",
    required: false,
    helperText:
      "Let our designers know if you have specific icon or font preferences.",
  },
];

const ProductDetailPage = () => {
  // Store form inputs dynamically
  const [formData, setFormData] = useState({});
  const [selectedMaterial, setSelectedMaterial] = useState("mirror-gold");
  const [selectedSize, setSelectedSize] = useState("6x16");
  const [activeImage, setActiveImage] = useState(IMG.woodPlate);

  // Handle dynamic form typing
  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  // Pricing calculation
  const basePrice =
    selectedSize === "6x16" ? 2499 : selectedSize === "12-ring" ? 3299 : 3999;
  const materialAddon =
    selectedMaterial === "mirror-gold"
      ? 500
      : selectedMaterial === "metallic-abs"
        ? 300
        : 0;
  const finalPrice = basePrice + materialAddon;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased pt-20">
      <Navbar />

      <main className="container py-10 md:py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: High-Res Static Gallery (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 sticky top-28">
            {/* Primary Image Showcase */}
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-secondary border border-border shadow-2xl relative group">
              <img
                src={activeImage}
                alt="Personalized Home Decor Craftsmanship"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1.5 rounded-full border border-border text-[0.65rem] font-semibold text-gold tracking-widest uppercase shadow">
                Authentic Craftsmanship Showcase
              </div>
            </div>

            {/* Thumbnail Gallery Swapper */}
            <div className="grid grid-cols-4 gap-3">
              {[IMG.woodPlate, IMG.acrylic, IMG.islamic, IMG.heroVilla].map(
                (img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition ${activeImage === img ? "border-gold shadow-md scale-[0.98]" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail preview"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ),
              )}
            </div>

            {/* Technical Craftsmanship Callout Box */}
            <div className="bg-secondary/40 rounded-2xl p-6 border border-border space-y-3">
              <h4 className="font-display text-base font-semibold text-gold flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Built for Permanence & Ease
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div>
                  <strong className="text-foreground block mb-0.5">
                    Flush Back-Hook Mounting
                  </strong>
                  Equipped with heavy-duty back hooks. Hangs directly flat
                  against your entrance wall without resting on a bulky table
                  base.
                </div>
                <div>
                  <strong className="text-foreground block mb-0.5">
                    Allover PVC Protection
                  </strong>
                  Complete wraparound moisture seal. We avoid edge-banding
                  machines so the frame never splits or peels over time.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Customization & Order Workflow (6 Cols) */}
          <div className="lg:col-span-6 space-y-8 bg-card p-6 md:p-10 rounded-3xl border border-border shadow-sm">
            {/* Product Header */}
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
                Bespoke Collection
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">
                Royal Heritage Laminated Name Plate
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-gold">
                  <Star className="h-4 w-4 fill-gold" />
                  <Star className="h-4 w-4 fill-gold" />
                  <Star className="h-4 w-4 fill-gold" />
                  <Star className="h-4 w-4 fill-gold" />
                  <Star className="h-4 w-4 fill-gold" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  (48 Handcrafted Orders)
                </span>
              </div>
              <p className="font-display text-3xl font-semibold text-gold mt-4">
                &#8377;{finalPrice.toLocaleString()}
              </p>
            </div>

            <hr className="border-border" />

            {/* Step 1: Select Format & Dimensions */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider font-semibold text-foreground">
                1. Select Dimensions
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    id: "6x16",
                    label: '6" x 16" Plate',
                    desc: "Standard Entrance",
                  },
                  {
                    id: "12-ring",
                    label: '12" Cutwork Ring',
                    desc: "Joined Typography",
                  },
                  {
                    id: "8x20",
                    label: '8" x 20" Villa',
                    desc: "Grand Wall Mount",
                  },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s.id)}
                    className={`p-3 rounded-xl border text-center transition ${selectedSize === s.id ? "border-gold bg-gold/5 shadow-sm font-semibold text-gold" : "border-border bg-background text-muted-foreground hover:text-foreground"}`}
                  >
                    <div className="text-xs">{s.label}</div>
                    <div className="text-[0.6rem] opacity-70 mt-0.5">
                      {s.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Material Finish */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider font-semibold text-foreground">
                2. Select Finish Material
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    id: "mirror-gold",
                    name: "Mirror-Finish Gold Acrylic",
                    price: "+ ₹500",
                  },
                  {
                    id: "metallic-abs",
                    name: "Metallic ABS Sheet",
                    price: "+ ₹300",
                  },
                  {
                    id: "matte-wood",
                    name: "Raw Hardwood Etch",
                    price: "Included",
                  },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMaterial(m.id)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition ${selectedMaterial === m.id ? "border-gold bg-gold/5 shadow-sm" : "border-border bg-background hover:border-muted-foreground"}`}
                  >
                    <span className="text-xs font-semibold leading-tight">
                      {m.name}
                    </span>
                    <span className="text-[0.65rem] text-gold mt-2 font-medium">
                      {m.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Dynamic Modular Input Fields */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs uppercase tracking-wider font-semibold text-foreground">
                  3. Personalization Details
                </label>
                <span className="text-[0.65rem] text-gold font-medium">
                  Pre-production approval included
                </span>
              </div>

              {CUSTOMIZATION_FIELDS.map((field) => (
                <div key={field.id} className="space-y-1">
                  <label
                    htmlFor={field.id}
                    className="text-xs font-medium text-muted-foreground block"
                  >
                    {field.label}{" "}
                    {field.required && <span className="text-red-400">*</span>}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      rows="2"
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:border-gold outline-none transition resize-none"
                    />
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition"
                    />
                  )}
                  {field.helperText && (
                    <p className="text-[0.65rem] text-muted-foreground pl-1">
                      {field.helperText}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* High-Touch Artwork Guarantee Box */}
            <div className="bg-wood/90 text-white rounded-2xl p-5 shadow-lg space-y-3 border border-gold/20">
              <div className="flex items-center gap-2 text-gold font-display font-semibold text-sm">
                <MessageCircle className="h-5 w-5" /> Our 100% Approval
                Guarantee
              </div>
              <p className="text-xs text-white/85 leading-relaxed">
                We never manufacture without your sign-off! Within 24 hours of
                placing your order, our dedicated artisans will send a precision
                digital layout directly to your WhatsApp/Email for your final
                review.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1 text-[0.65rem] text-gold/90 border-t border-white/10 text-center font-medium">
                <span>1. Submit Details</span>
                <span>2. Review Mockup</span>
                <span>3. Artisan Crafting</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button className="w-full bg-gold text-primary font-bold py-4 rounded-xl shadow-xl hover:brightness-105 active:scale-[0.99] transition text-sm tracking-wide uppercase">
                Proceed to Checkout — &#8377;{finalPrice.toLocaleString()}
              </button>
              <p className="text-[0.65rem] text-center text-muted-foreground">
                Handcrafted in Maharashtra · Free Insured Shipping Across India
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold" /> Weatherproof
                Allover Coating
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gold" /> Ships in 4-6 Business
                Days
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
