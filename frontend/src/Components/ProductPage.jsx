import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import axiosInstance from "../api/axiosInstance";

const ProductCard = ({ product }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // Fetch related products for this product
    const fetchRelated = async () => {
      try {
        const res = await axiosInstance.get(`/products/${product._id}/related`);
        setRelated(res.data || []);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };
    fetchRelated();
  }, [product._id]);

  return (
    <div className="bg-white rounded-lg shadow-md  flex flex-col">
      <img
        src={product.imageUrl}
        alt={product.productName}
        className="w-auto h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-3 px-4">{product.productName}</h3>
      <p className="text-gray-600 mt-2 px-4">{product.description}</p>

      {related.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2 text-sm px-4">Related Products:</h4>
          <div className="flex gap-2 overflow-x-auto px-4 pb-4">
            {related.map((r) => (
              <div key={r._id} className="flex-shrink-0 w-32 bg-gray-100 p-2 rounded">
                <img
                  src={r.imageUrl}
                  alt={r.productName}
                  className="w-full h-20 object-cover rounded"
                />
                <p className="text-xs mt-1">{r.productName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductPage = () => {
  const { products, loading } = useContext(ProductContext);

  if (loading) return <p className="p-6">Loading products...</p>;

  if (products.length === 0) return <p className="p-6">No products available.</p>;

  // Group products by category
  const grouped = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  if (Object.keys(grouped).length === 0) {
  return <p className="p-6">Products not available.</p>;
}

  return (
    <div className="px-6 py-32 space-y-8">
      {Object.keys(grouped).map((category) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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