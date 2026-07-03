import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";
import Home from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Root URL - This loads your main landing page */}
        <Route path="/" element={<Home />} />

        {/* The Dynamic Product URL - This loads individual customizable items */}
        <Route path="/product/:id" element={<ProductDetailPage />} />

        {/* Placeholder for your Shop Page - Uncomment this when we create ShopPage.jsx */}
        {/* <Route path="/shop" element={<ShopPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
