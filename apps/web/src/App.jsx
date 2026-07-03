import React from "react";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import ProductDetailPage from "./pages/ProductDetailPage";

const App = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-gold selection:text-primary">
        {/* The Slide-Out Shopping Cart Drawer sits at the top level so it works on every page */}
        <CartDrawer />

        {/* Currently displaying Phase 3 Product Detail Page */}
        <ProductDetailPage />
      </div>
    </CartProvider>
  );
};

export default App;
