import React, { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductPage = () => {
  const { products, loading } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Compute categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["All", ...cats];
  }, [products]);

  // Group products by category
  const grouped = useMemo(() => {
    const acc = {};
    products.forEach((product) => {
      const cat = product?.category || "Uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(product);
    });
    return acc;
  }, [products]);

  // Helper: shuffle and pick n products
  const getRandomProducts = (arr, n) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  if (loading)
    return <p className="p-6 text-center text-gray-500">Loading products...</p>;
  if (!products || products.length === 0)
    return <p className="p-6 text-center text-gray-500">No products available.</p>;

  return (
    <div className="px-6 py-16 max-w-7xl mx-auto mt-15">
      {/* CATEGORY SELECTOR */}
      <div className="mb-12">
        {/* Mobile Dropdown */}
        <div className="sm:hidden mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-colors duration-300 cursor-pointer
                ${selectedCategory === cat
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-yellow-200 hover:text-yellow-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {Object.keys(grouped)
        .filter((cat) => selectedCategory === "All" || selectedCategory === cat)
        .map((category) => (
          <div key={category} className="mb-12">
            <Link
              to={`/products/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-2xl font-semibold mb-6 inline-block text-yellow-500 hover:text-yellow-600 transition-colors"
            >
              {category}
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {getRandomProducts(grouped[category], 6).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductPage;
