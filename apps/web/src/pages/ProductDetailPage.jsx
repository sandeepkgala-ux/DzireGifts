import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// CHANGE THIS LINE AT THE TOP:
import { useStore } from "@/context/useStore"; // 1. Import StoreContext
import { fetchProductById } from "../api";
import Navbar from "@/components/Navbar";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useStore(); // 2. Access addToCart function
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3. State for Customization
  const [customText, setCustomText] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchProductById(id).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading)
    return (
      <div className="container py-20 text-center">Loading product...</div>
    );
  if (!product)
    return (
      <div className="container py-20 text-center">Product not found.</div>
    );

  // 4. Handle Add to Cart with Metadata
  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.images?.[0]?.src,
      },
      {
        text: customText,
        instructions: instructions || "Standard mounting via back hooks",
      },
    );
    alert("Added to cart with your customization!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-28 pb-20 grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="rounded-3xl overflow-hidden bg-secondary aspect-square">
          <img
            src={product.images[0].src}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Customization Form */}
        <div className="space-y-6">
          <h1 className="font-display text-4xl">{product.name}</h1>
          <div className="text-xl font-bold text-gold">₹{product.price}</div>

          {/* Personalization Inputs */}
          <div className="space-y-4 border-t border-border pt-6">
            <h3 className="font-semibold">Personalize your item</h3>

            <input
              type="text"
              placeholder="Enter name/text to engrave"
              className="w-full p-4 rounded-xl border border-border bg-background"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />

            <textarea
              placeholder="Special instructions (e.g., specific font, icon preference)"
              className="w-full p-4 rounded-xl border border-border bg-background"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
