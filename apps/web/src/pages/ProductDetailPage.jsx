import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 1. IMPORT useParams
import { fetchProductById } from "../api";

const ProductDetailPage = () => {
  const { id } = useParams(); // 2. GRAB THE ID FROM THE URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3. FETCH USING THE DYNAMIC URL ID
    if (id) {
      setLoading(true);
      fetchProductById(id).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [id]); // Re-run if the ID in the URL changes

  if (loading) {
    return (
      <div className="loading-spinner">Loading your product details...</div>
    );
  }

  if (!product) {
    return <div className="error-message">Product not found.</div>;
  }

  return (
    <div className="product-detail-container">
      {/* 4. KEEP YOUR EXACT UI CODE FROM PREVIOUS STEP BELOW THIS LINE */}
      <div className="product-image-gallery">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            className="main-product-image"
          />
        ) : (
          <div className="image-placeholder">No Image Available</div>
        )}
      </div>

      <div className="product-info-details">
        <h1 className="product-title">{product.name}</h1>
        <div
          className="product-price"
          dangerouslySetInnerHTML={{ __html: product.price_html }}
        />
        <div className="product-description-container">
          <h3>Product Specifications</h3>
          <div
            className="product-description-text"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
        <div className="product-actions">
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
