import React, { useState } from "react";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const products = [
    {
      id: 1,
      name: "Glow Moisturizing Lotion",
      image: "",
      category: "Skincare",
    },
    {
      id: 2,
      name: "Shea Butter Cream",
      image: "",
      category: "Skincare",
    },
    {
      id: 3,
      name: "Hair Growth Oil",
      image: "",
      category: "Haircare",
    },
    {
      id: 4,
      name: "Body Perfume Mist",
      image: "",
      category: "Fragrance",
    },
    {
      id: 5,
      name: "Coconut Shampoo",
      image: "",
      category: "Haircare",
    },
    {
      id: 6,
      name: "Rose Face Toner",
      image: "",
      category: "Skincare",
    },
  ];

  const categories = ["All", "Skincare", "Haircare", "Body Lotion", "Antiseptics", "Toiletries"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="bg-white pt-[100px] py-16 px-6 md:px-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Our Products
      </h1>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer duration-300 ${
              selectedCategory === category
                ? "bg-black text-yellow-500 border-yellow-500"
                : "border-gray-400 text-gray-600 hover:bg-yellow-500 hover:text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-500 mb-2">{product.category}</p>
              <p className="text-yellow-600 font-bold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
