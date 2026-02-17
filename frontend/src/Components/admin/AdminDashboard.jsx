import React, { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import Sidebar from "./SideBar";
import Header from "./Header";
import ProductForms from "./ProductForm";
import ViewProducts from "./ViewProducts";
import axiosInstance from "../../api/axiosInstance";
import { handleLogout } from "../../utils/authHelper";
import { triggerProductRefresh } from "../../utils/productEvents";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const { products, loading, error } = useContext(ProductContext);

  const [activeSection, setActiveSection] = useState("view");
  const [editProduct, setEditProduct] = useState(null);

  // =============================
  // ADD / UPDATE PRODUCT
  // =============================
  const handleSubmitProduct = async (data) => {
    try {
      Swal.fire({
        title: editProduct ? "Updating product..." : "Uploading product...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const formData =
        data.formData instanceof FormData
          ? data.formData
          : (() => {
              const fd = new FormData();
              fd.append("productName", data.productName);
              fd.append("category", data.category);
              fd.append("description", data.description);
              fd.append("coverImageIndex", String(data.coverImageIndex ?? 0));

              if (data.existingImages?.length) {
                fd.append(
                  "existingImages",
                  JSON.stringify(data.existingImages)
                );
              }

              if (data.files?.length) {
                data.files.forEach((f) => fd.append("images", f));
              }

              return fd;
            })();

      if (editProduct) {
        const encoded = encodeURIComponent(editProduct.slug);

        await axiosInstance.put(
          `/admin/products/${encoded}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setEditProduct(null);
      } else {
        await axiosInstance.post("/admin/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      triggerProductRefresh();
      Swal.fire("Success!", "Product saved successfully.", "success");
      setActiveSection("view");
    } catch (err) {
      console.error("Product save error:", err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  // =============================
  // DELETE PRODUCT
  // =============================
  const handleDelete = async (slug) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      const encoded = encodeURIComponent(slug);

      await axiosInstance.delete(`/admin/products/${encoded}`);

      triggerProductRefresh();
      Swal.fire("Deleted!", "Product removed.", "success");
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire("Error", "Failed to delete product.", "error");
    }
  };

  const logout = () => handleLogout("Logging out...");

  // =============================
  // UI STATES (PRODUCTION GRADE)
  // =============================
  const renderContent = () => {
    if (loading) {
      return (
        <p className="text-gray-600 animate-pulse">
          Loading products...
        </p>
      );
    }

    if (error) {
      return (
        <div className="text-red-500">
          <p>{error}</p>
        </div>
      );
    }

    if (!products || products.length === 0) {
      return (
        <p className="text-gray-500">
          No products available yet.
        </p>
      );
    }

    if (activeSection === "view") {
      return (
        <ViewProducts
          products={products}
          onDelete={handleDelete}
          onEdit={(product) => {
            setEditProduct(product);
            setActiveSection("add");
          }}
        />
      );
    }

    return (
      <ProductForms
        product={editProduct}
        onAdd={handleSubmitProduct}
        onCancel={() => {
          setEditProduct(null);
          setActiveSection("view");
        }}
      />
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 pt-[85px]">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={logout}
      />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;