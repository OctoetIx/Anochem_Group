import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [error, setError] = useState("");

  // Fetch product by slug
  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get(`/products/${slug}`);
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
  }, [slug]);

  // Fetch related products
  useEffect(() => {
    if (!product?.slug) return;

    const fetchRelated = async () => {
      setLoadingRelated(true);
      try {
        const res = await axiosInstance.get(`/products/${product.slug}/related`);
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

  if (loading) return <p className="pt-32 p-6 text-center">Loading product...</p>;
  if (error) return <p className="pt-32 p-6 text-red-500 text-center">{error}</p>;
  if (!product) return <p className="pt-32 p-6 text-center">Product not found</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 pt-32 px-6 max-w-4xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3 py-2 bg-black text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black mb-6 cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex justify-center mb-6">
          {product?.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.productName}
              loading="lazy"
              className="object-contain max-h-[500px] w-full sm:w-3/4 lg:w-1/2 rounded-lg"
            />
          )}
        </div>

        <h1 className="text-2xl font-bold text-center">{product.productName}</h1>
        <p className="text-gray-700 mt-4 text-center">{product.description}</p>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4 text-center">Related Products</h2>
            {loadingRelated ? (
              <p className="text-center">Loading related products...</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    className="border rounded-lg p-2 hover:shadow-lg transition w-full max-w-xs h-full flex flex-col"
                  >
                    <div className="flex justify-center items-center h-40 overflow-hidden">
                      {p.imageUrl && (
                        <img
                          src={p.imageUrl}
                          alt={p.productName}
                          loading="lazy"
                          className="object-contain w-full h-full rounded transform transition-transform duration-300 hover:scale-105"
                        />
                      )}
                    </div>
                    <h3 className="mt-2 font-semibold text-sm text-center flex-1 flex items-center justify-center">
                      {p.productName}
                    </h3>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="bg-gray-800 text-white py-4 text-center mt-auto"></footer>
    </div>
  );
};

export default ProductDetails;