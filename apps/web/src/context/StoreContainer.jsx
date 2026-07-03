import React, { useState, useEffect } from "react";
import { StoreProvider } from "./StoreContext";

export const StoreContainer = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("dzire_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("dzire_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    localStorage.setItem("dzire_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("dzire_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, customDetails = null, qty = 1) => {
    setCart((prevCart) => {
      const itemKey = `${product.id}_${customDetails?.text || "standard"}`;
      const existingIndex = prevCart.findIndex(
        (item) => item.cartKey === itemKey,
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartKey: itemKey,
            id: product.id,
            name: product.name,
            price: Number(product.price || 0),
            image:
              product.img ||
              product.images?.[0]?.src ||
              "https://via.placeholder.com/300",
            customDetails: customDetails || { text: "", instructions: "" },
            quantity: qty,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartKey) =>
    setCart((prev) => prev.filter((i) => i.cartKey !== cartKey));

  const updateQuantity = (cartKey, newQty) => {
    if (newQty < 1) return removeFromCart(cartKey);
    setCart((prev) =>
      prev.map((i) => (i.cartKey === cartKey ? { ...i, quantity: newQty } : i)),
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      return exists
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some((i) => i.id === id);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const value = {
    cart,
    wishlist,
    cartCount,
    cartSubtotal,
    isCartOpen,
    toggleCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    isWishlisted,
  };

  return <StoreProvider value={value}>{children}</StoreProvider>;
};
