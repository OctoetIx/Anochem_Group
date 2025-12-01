import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="no-underline text-black w-full"
    >
      <motion.div
        className="bg-white h-full rounded-lg shadow-md overflow-hidden flex flex-col mb-8"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <div className="overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="w-full h-52 object-cover"
          />
        </div>

        <div className="p-3 flex flex-col gap-1">
          <h3 className="text-md font-semibold">{product.productName}</h3>
          <p className="text-sm text-gray-600 flex-1">{product.description}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
