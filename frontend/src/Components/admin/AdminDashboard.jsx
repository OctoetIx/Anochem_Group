// AdminDashboard.jsx
import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import { ProductContext } from "../../context/ProductContext";
import Sidebar from "./SideBar";
import Header from "./Header";
import ProductForms from "./ProductForm";
import ViewProducts from "./ViewProducts";
import axiosInstance from "../../api/axiosInstance";
import { handleLogout } from "../../utils/authHelper";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [activeSection, setActiveSection] = useState("view");
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/products");
      setProducts(res.data.items || res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to load products",
        text: "Please try again later.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  }, [setProducts]);

  useEffect(() => {
    if (!mountedRef.current) {
      fetchProducts();
      mountedRef.current = true;
    }
  }, [fetchProducts]);

  // Add/Edit product with SweetAlert2 loading
const handleSubmitProduct = async (productData) => {
  let swalLoading;
  try {
    swalLoading = Swal.fire({
      title: editProduct ? "Updating product..." : "Uploading product...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("category", productData.category);
    formData.append("description", productData.description);
    if (productData.file) formData.append("image", productData.file);

    let res;
    if (editProduct) {
      res = await axiosInstance.put(`/admin/products/${editProduct._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts(products.map((p) => (p._id === editProduct._id ? res.data : p)));
      setEditProduct(null);
    } else {
      res = await axiosInstance.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts([...products, res.data]);
    }

    // Refetch products for category page if needed
    fetchProducts();

    Swal.fire("Success", editProduct ? "Product updated!" : "Product uploaded!", "success");
    setActiveSection("view");
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Failed to submit product.", "error");
  }
};

  // Delete product with SweetAlert2 confirmation
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        await axiosInstance.delete(`/admin/products/${id}`);
        fetchProducts();

        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      Swal.fire("Error", "Failed to delete product. Please try again.", "error");
    }
  };

  const handleCancelEdit = () => {
    setEditProduct(null);
    setActiveSection("view");
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setActiveSection("add");
  };

  const logout = () => {
    handleLogout("Logging out ...");
  };

  return (
    <div className="flex h-screen bg-gray-100 pt-[90px]">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={logout} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

          {loading ? (
            <p className="text-gray-600">Loading products...</p>
          ) : activeSection === "view" ? (
            <ViewProducts products={products} onDelete={handleDelete} onEdit={handleEdit} />
          ) : (
            <ProductForms onAdd={handleSubmitProduct} product={editProduct} onCancel={handleCancelEdit} />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;