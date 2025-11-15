import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductPage = () => {
  const { products, loading } = useContext(ProductContext);

  const [selectedCategory, setSelectedCategory] = useState("All");

  if (loading) return <p className="p-6">Loading products...</p>;
  if (!products || products.length === 0) return <p className="p-6">No products available.</p>;

  // List of unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Group filtered products
  const grouped = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="px-6 py-32 space-y-10">

      {/* CATEGORY DROPDOWN FILTER */}
      <div className="max-w-md">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="
            w-full p-3 border rounded-md bg-white shadow-sm
            focus:outline-none
          "
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCT DISPLAY */}
      {Object.keys(grouped).map((category) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mb-4">{category}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {grouped[category].map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ))}

    </div>
  );
};

export default ProductPage;