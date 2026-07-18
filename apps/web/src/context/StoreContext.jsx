import React, { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]); // Added Wishlist State

  // --- CART LOGIC ---
  const addToCart = (product, customDetails, quantity = 1) => {
    setCart((prevCart) => {
      const uniqueKey = `${product.id}-${JSON.stringify(customDetails)}`;
      const existingIndex = prevCart.findIndex(
        (item) => item.uniqueKey === uniqueKey,
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [
          ...prevCart,
          { ...product, customDetails, quantity, uniqueKey },
        ];
      }
    });
  };

  const updateQuantity = (uniqueKey, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.uniqueKey === uniqueKey
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const removeFromCart = (uniqueKey) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.uniqueKey !== uniqueKey),
    );
  };

  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // --- WISHLIST LOGIC ---
  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product],
    );
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // --- UI STATE ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartSubtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        isCartOpen,
        toggleCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
