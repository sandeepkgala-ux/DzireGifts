import axios from "axios";

// Securely pull credentials from your .env file
const consumerKey = import.meta.env.VITE_WC_CONSUMER_KEY;
const consumerSecret = import.meta.env.VITE_WC_CONSUMER_SECRET;

const api = axios.create({
  // Point directly to your live WooCommerce domain instead of localhost
  baseURL: "https://dev.dziregifts.com/wp-json/wc/v3",
  // Passing keys as params automatically appends them to every request URL safely over CORS
  params: {
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
  },
});

// 1. Function to get all products (for shop page)
export const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// 2. Function to get a single product by its ID
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single product:", error);
    return null;
  }
};

export default api;
