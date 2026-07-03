import axios from "axios";

async function testConnection() {
  console.log("--- Starting WooCommerce API Connection Test ---");

  // VITE uses import.meta.env, not process.env
  const url = import.meta.env.VITE_API_URL;
  const key = import.meta.env.VITE_WC_CONSUMER_KEY;
  const secret = import.meta.env.VITE_WC_CONSUMER_SECRET;

  if (!url || !key || !secret) {
    console.error(
      "❌ MISSING VARIABLES. Ensure .env is in apps/web/ and uses VITE_ prefix.",
    );
    return;
  }

  try {
    const response = await axios.get(`${url}/products/categories`, {
      params: {
        consumer_key: key,
        consumer_secret: secret,
        per_page: 1,
      },
    });
    console.log("✅ SUCCESS! API is responding.");
  } catch (error) {
    console.error("❌ FAILED. Check API URL or CORS settings in WordPress.");
  }
}

testConnection();
