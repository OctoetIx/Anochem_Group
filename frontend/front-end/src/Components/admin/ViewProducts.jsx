import React from "react";

const ViewProducts = ({ products, onDelete, onEdit }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">All Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-md"
                />
              )}
              <div className="mt-3">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
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
                  onClick={() => onDelete(product.id)}
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
