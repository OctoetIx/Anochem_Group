import React, { useState, useMemo } from "react";

const ViewProducts = ({ products, onDelete, onEdit }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Memoize unique categories
  const categories = useMemo(() => {
    if (!products || products.length === 0) return ["All"];
    const dynamicCategories = [...new Set(products.map((p) => p.category))];
    return ["All", ...dynamicCategories];
  }, [products]);

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div>
      {/* CATEGORY DROPDOWN */}
      <div className="max-w-xs mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded-md shadow-sm bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* WHEN NO PRODUCTS MATCH THE FILTER */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 mt-10 text-lg">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.slug}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="h-40 w-full object-cover rounded-md"
                />
              )}

              <div className="mt-3">
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.slug)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProducts;