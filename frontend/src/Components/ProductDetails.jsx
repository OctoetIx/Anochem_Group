import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product?._id) return;

    const fetchRelated = async () => {
      setLoadingRelated(true);
      try {
        const res = await axiosInstance.get(`/products/${product._id}/related`);
        setRelated(res.data || []);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setRelated([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelated();
  }, [product]);

  if (loading) return <p className="pt-32 p-6">Loading product...</p>;
  if (error) return <p className="pt-32 p-6 text-red-500">{error}</p>;
  if (!product) return <p className="pt-32 p-6">Product not found</p>;

  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto">
      <Link to="/products" className="text-blue-500 underline mb-4 inline-block">
        Back to Products
      </Link>

      <img
        src={product.imageUrl}
        alt={product.productName}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />

      <h1 className="text-2xl font-bold">{product.productName}</h1>
      <p className="text-gray-700 mt-4">{product.description}</p>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>

          {loadingRelated ? (
            <p>Loading related products...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p._id}
                  to={`/products/${p._id}`}
                  className="border rounded-lg p-2 hover:shadow-md transition"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.productName}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="mt-2 font-semibold text-sm">{p.productName}</h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;