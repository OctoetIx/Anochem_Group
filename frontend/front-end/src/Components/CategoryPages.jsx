import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const CategoryPages = () => {
  const { slug } = useParams(); // e.g., "hair-care"
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError("");
        setProducts([]);

        // Backend endpoint
        const res = await axiosInstance.get(`/products/category/${slug}`);

        // Ensure we have an array
        setProducts(res.data.items || []);
      } catch (err) {
        console.error("Error fetching category products:", err);
        setError("Failed to fetch products for this category.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [slug]);

  // Loading, error, or empty state
  if (loading) return <p className="text-center mt-8">Loading products...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (products.length === 0)
    return <p className="text-center mt-8">No products found in this category</p>;

  // Convert slug to readable title
  const categoryTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-yellow-500 mb-6">{categoryTitle}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl overflow-hidden shadow-md bg-black text-white"
          >
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{product.productName}</h2>
              <p className="text-sm mt-2">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPages;