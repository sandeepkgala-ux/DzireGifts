import axios from "axios";

const api = axios.create({
  baseURL: "/wp-json/wc/v3",
  auth: {
    username: "ck_1f20604bb30dd3847b99ca8622356ff40e1478ad",
    password: "cs_dd68bf211b0ff803dc5b94f8cc2a006a927f2410",
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

// 2. ADD THIS NEW FUNCTION: Function to get a single product by its ID
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single product:", error);
    return null;
  }
};
