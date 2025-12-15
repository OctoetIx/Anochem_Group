import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { motion } from "framer-motion";

const CategoryPages = () => {
  const { slug } = useParams();
  const { products, loading } = useContext(ProductContext);

  const filteredProducts = products.filter((p) => p.categorySlug === slug);

  const categoryTitle = slug
    ? slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Products";

  if (loading)
    return (
      <p className="text-center mt-8 text-gray-500">Loading products...</p>
    );

  if (!slug || filteredProducts.length === 0)
    return (
      <p className="text-center my-80 text-gray-500">
        No products found in this category
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Category Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-500 mb-10 text-center tracking-wide">
        {categoryTitle}
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.slug}
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300"
          >
            <Link to={`/products/${product.slug}`} className="block">
              {/* Image */}
              <div className="overflow-hidden rounded-t-2xl h-36 sm:h-40">
                <img
                  src={
                    product.images?.[product.coverImageIndex ?? 0]?.url ||
                    product.images?.[0]?.url ||
                    "/placeholder.png"
                  }
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-1">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                  {product.productName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPages;
