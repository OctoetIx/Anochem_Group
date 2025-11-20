import React, { useContext, useState, useMemo } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductPage = () => {
  const { products, loading } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Compute categories upfront, even if loading or empty
  const categories = useMemo(() => {
    if (!products) return ["All"];
    return ["All", ...new Set(products.map((p) => p.category))];
  }, [products]);

  if (loading) return <p className="p-6">Loading products...</p>;
  if (!products || products.length === 0) return <p className="p-6">No products available.</p>;

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const grouped = filteredProducts.reduce((acc, product) => {
    const cat = product?.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  return (
    <div className="px-6 py-32 space-y-10">
      <div className="max-w-md">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 border rounded-md bg-white shadow-sm focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {Object.keys(grouped).map((category) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {grouped[category].map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;