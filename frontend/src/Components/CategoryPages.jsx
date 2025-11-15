import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const CategoryPages = () => {
  const { slug } = useParams();
  const { products, loading } = useContext(ProductContext);

  // Filter products by categorySlug
  const filteredProducts = products.filter(p => p.categorySlug === slug);

  // Convert slug to readable title
  const categoryTitle = slug
    ? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "Products";

  if (loading) return <p className="text-center mt-8">Loading products...</p>;
  if (!slug || filteredProducts.length === 0)
    return <p className="text-center my-80">No products found in this category</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
      <h1 className="text-3xl font-bold text-yellow-500 mb-6">{categoryTitle}</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredProducts.map(product => (
    <Link
      to={`/products/${product._id}`}
      key={product._id}
      className="rounded-xl overflow-hidden shadow-md bg-white text-black hover:shadow-xl transition-shadow duration-300 block"
    >
      <img
        src={product.imageUrl}
        alt={product.productName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.productName}</h2>
        <p className="text-sm mt-2">{product.description}</p>
      </div>
    </Link>
  ))}
</div>

    </div>
  );
};

export default CategoryPages;