import React, { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  // Load initial cart from local storage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("dzire_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Load initial wishlist from local storage
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("dzire_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync cart changes to localStorage
  useEffect(() => {
    localStorage.setItem("dzire_cart", JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist changes to localStorage
  useEffect(() => {
    localStorage.setItem("dzire_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart Actions
  const addToCart = (product, customDetails = null, qty = 1) => {
    setCart((prevCart) => {
      // Create unique cart item key based on ID + custom text
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
            customDetails: customDetails || {
              text: "",
              instructions: "Standard mounting via back hooks",
            },
            quantity: qty,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartKey) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey, newQty) => {
    if (newQty < 1) return removeFromCart(cartKey);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartKey === cartKey ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist Actions
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [
          ...prevWishlist,
          {
            id: product.id,
            name: product.name,
            price: Number(product.price || 0),
            image:
              product.img ||
              product.images?.[0]?.src ||
              "https://via.placeholder.com/300",
            category: product.category || "Decor",
            inStock: product.inStock !== false,
          },
        ];
      }
    });
  };

  const isWishlisted = (productId) =>
    wishlist.some((item) => item.id === productId);

  // Derived totals
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
