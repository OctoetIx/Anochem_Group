import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import axiosInstance from "../api/axiosInstance";
import PRODUCT_UPDATED_EVENT from "../utils/productEvents"
import { ProductContext } from "./ProductContext";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get("/products");

      const items = res.data?.items || res.data || [];

      setProducts(Array.isArray(items) ? items.filter(Boolean) : []);
    } catch (err) {
      console.error("Fetch products error:", err);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    const handleUpdate = () => {
      fetchProducts();
    };

    window.addEventListener(PRODUCT_UPDATED_EVENT, handleUpdate);

    return () => {
      window.removeEventListener(PRODUCT_UPDATED_EVENT, handleUpdate);
    };
  }, [fetchProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};