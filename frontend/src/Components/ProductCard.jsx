import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="no-underline text-black w-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-36 object-cover"
        />
        <div className="p-3 flex flex-col gap-1">
          <h3 className="text-md font-semibold">{product.productName}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;