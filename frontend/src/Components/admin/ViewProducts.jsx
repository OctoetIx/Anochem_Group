import React, { useState, useMemo } from "react";

const ViewProducts = ({ products, onDelete, onEdit }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = useMemo(() => {
    if (!products?.length) return ["All"];
    return ["All", ...new Set(products.map((p) => p.category))];
  }, [products]);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    return selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="space-y-3">
      {/* CATEGORY SELECT */}
      <div className="max-w-xs">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-2 py-1 border rounded-md shadow-sm bg-white text-xs
          focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-sm py-8">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {filteredProducts.map((product) => (
            <div
              key={product.slug}
              className="bg-white rounded-md shadow-sm hover:shadow-md transition border border-gray-200
              flex flex-col p-1 aspect-square"
            >
              {/* IMAGE — show first image only */}
          {product.images?.length > 0 ? (
  <img
    src={
      product.images[
        Math.min(product.coverImageIndex ?? 0, product.images.length - 1)
      ]?.url
    }
    alt={product.productName}
    className="w-full h-full object-cover rounded-md"
  />
) : (
  <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">
    No Image
  </div>
)}

              {/* INFO */}
              <div className="mt-1">
                <h3 className="text-[10px] font-semibold text-gray-800 truncate leading-tight">
                  {product.productName}
                </h3>
                <p className="text-[9px] text-gray-500 truncate leading-tight">
                  {product.category}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between mt-1">
                <button
                  onClick={() => onEdit(product)}
                  className="px-1 py-[1px] bg-blue-500 text-white rounded text-[8px] hover:bg-blue-600 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(product.slug)}
                  className="px-1 py-[1px] bg-red-500 text-white rounded text-[8px] hover:bg-red-600 transition"
                >
                  Del
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