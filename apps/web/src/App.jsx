import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreContainer } from "./context/StoreContainer"; // Updated import
import CartDrawer from "./components/CartDrawer";
import ProductDetailPage from "./pages/ProductDetailPage";
import Home from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <StoreContainer>
      {" "}
      {/* Updated from StoreProvider */}
      <BrowserRouter>
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </BrowserRouter>
    </StoreContainer>
  );
}

export default App;
