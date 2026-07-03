import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";
import Home from "./pages/HomePage"; // 1. Make sure your homepage component is imported!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 2. Add this exact line right here for the root URL */}
        <Route path="/" element={<Home />} />

        {/* Your other routes */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
