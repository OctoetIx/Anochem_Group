import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import ProductForm from "./ProductForm";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState("view");

  // Load saved products
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  // Save to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Add product
  const handleAddProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
    setActiveSection("view");
  };

  // Delete product
  const handleDelete = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    alert("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100 pt-[90px]">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

          {/* Conditional Rendering */}
          {activeSection === "view" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length === 0 ? (
                <p className="text-gray-600 text-lg">
                  No products uploaded yet.
                </p>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md p-4 flex flex-col"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <h3 className="text-lg font-semibold mt-3 text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {product.description || "No description provided."}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeSection === "add" && <ProductForm onAdd={handleAddProduct} />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
