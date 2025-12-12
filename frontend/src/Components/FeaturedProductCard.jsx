import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedProductCard = ({ product }) => {
  // Use coverImageIndex to get the correct image, fallback to first image or placeholder
  const mainImage =
    product.images?.[product.coverImageIndex ?? 0]?.url ||
    product.images?.[0]?.url ||
    "/placeholder.png";

  return (
    <Link to={`/products/${product.slug}`} className="no-underline">
      <motion.div
        whileHover={{ scale: 1.03, y: -2 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer border border-white/20 transition-all duration-300 w-36 sm:w-40 md:w-44 flex-shrink-0"
      >
        {/* Square Image */}
        <div className="w-full aspect-square overflow-hidden rounded-t-xl">
          <img
            src={mainImage}
            alt={product.productName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Name */}
        <div className="p-2 text-center">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
            {product.productName}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default FeaturedProductCard;