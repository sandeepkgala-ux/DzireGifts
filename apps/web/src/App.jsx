import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// Page Components
import Home from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import BulkOrdersPage from "./pages/BulkOrdersPage";
import ThankYouPage from "./pages/ThankYouPage";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        {/* Main Layout Wrapper */}
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          <Navbar />
          <CartDrawer />

          {/* Dynamic Page Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/bulk-orders" element={<BulkOrdersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
