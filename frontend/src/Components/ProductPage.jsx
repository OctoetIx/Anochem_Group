import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductPage = () => {
  const { products, loading } = useContext(ProductContext);

  if (loading) return <p className="p-6">Loading products...</p>;
  if (!products || products.length === 0) return <p className="p-6">No products available.</p>;

  // Group products by category
  const grouped = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="px-6 py-32 space-y-12">
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