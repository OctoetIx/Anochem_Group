import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const ProductCard = ({ product }) => {
  const mainImage = product.images[product.coverImageIndex ||0]?.url || "/placeholder.png";
  const  MotionDiv = motion.div;
  return (
    <Link to={`/products/${product.slug}`} className="no-underline">
      <MotionDiv
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300"
      >
        {/* Image */}
        <div className="overflow-hidden rounded-t-2xl h-40 sm:h-44">
          <img
            src={mainImage}
            alt={product.productName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col gap-1">
          <h3 className="text-md font-semibold text-gray-900 truncate">
            {product.productName}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-3">{product.description}</p>
        </div>
      </MotionDiv>
    </Link>
  );
};

export default ProductCard;