// src/context/ProductContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export const ProductContext = createContext(null); // always provide default

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/products");
      setProducts(res.data.items || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, loading, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};