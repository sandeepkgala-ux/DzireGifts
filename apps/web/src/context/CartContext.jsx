import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    // Pre-loading 1 demo item so you can see the UI immediately!
    {
      id: "demo-1",
      title: "Royal Heritage Laminated Name Plate",
      size: '6" x 16" Plate',
      material: "Mirror-Finish Gold Acrylic",
      price: 2999,
      quantity: 1,
      customization: {
        primaryName: "The Kapoors",
        secondaryDetails: "Flat 402, Oakwood",
        designNotes: "Please include Ganeshji icon on left.",
      },
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add customized item to cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, { ...item, id: Date.now().toString() }]);
    setIsCartOpen(true); // Automatically slide open the drawer when an item is added
  };

  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
