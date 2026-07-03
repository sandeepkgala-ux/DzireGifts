import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";
// ... import your other pages like Shop/Home

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Your other routes */}

        {/* Notice the ":id" at the end of the path - this captures the dynamic product ID */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
