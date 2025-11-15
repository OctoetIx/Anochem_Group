// Components/ViewProducts.jsx
import React, { useState } from "react";

const ViewProducts = ({ products, onDelete, onEdit }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories from product list
  const dynamicCategories = [...new Set(products.map((p) => p.category))];

  const categories = ["All", ...dynamicCategories];

  // Filter products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>

      {/* CATEGORY DROPDOWN */}
      <div className="max-w-xs mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded-md shadow-sm bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* WHEN NO PRODUCTS MATCH THE FILTER */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 mt-10 text-lg">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="h-40 w-full object-cover rounded-md"
                />
              )}

              <div className="mt-3">
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Category: {product.category}
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProducts;



// // Components/ViewProducts.jsx
// import React from "react";

// const ViewProducts = ({ products, onDelete, onEdit }) => {
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-4">All Products</h1>

//       {products.length === 0 ? (
//         <p className="text-gray-500">No products uploaded yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div
//               key={product._id} // use _id from MongoDB
//               className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
//             >
//               {product.imageUrl && (
//                 <img
//                   src={product.imageUrl}
//                   alt={product.productName}
//                   className="h-40 w-full object-cover rounded-md"
//                 />
//               )}
//               <div className="mt-3">
//                 <h3 className="text-lg font-semibold">{product.productName}</h3>
//                 {/* <p className="text-gray-600 text-sm">{product.description}</p> */}
//                 <p className="text-sm text-gray-500 mt-1">
//                   Category: {product.category}
//                 </p>
//               </div>
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => onEdit(product)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDelete(product._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewProducts;