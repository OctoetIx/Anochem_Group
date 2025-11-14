import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setProduct(res.data || null);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


    if (loading) return <p className="pt-32 p-6">Loading product...</p>;
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
      <p className="text-xl text-gray-600 my-2">{product.price ? `$${product.price}` : ""}</p>

      <p className="text-gray-700 mt-4">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
