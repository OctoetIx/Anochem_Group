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
      const items = res.data.items || res.data || [];
      // keep only valid items
      setProducts(Array.isArray(items) ? items.filter(Boolean) : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      Swal.fire({ icon: "error", title: "Failed to load products", text: "Please try again later.", timer: 3000, showConfirmButton: false });
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

  // add or edit
  const handleSubmitProduct = async (data) => {
    try {
      Swal.fire({ title: editProduct ? "Updating product..." : "Uploading product...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      // accept either data.formData (from ProductForms) or structured data + files
      const formData = data.formData instanceof FormData ? data.formData : (() => {
        const fd = new FormData();
        fd.append("productName", data.productName);
        fd.append("category", data.category);
        fd.append("description", data.description);
        fd.append("coverImageIndex", String(data.coverImageIndex ?? 0));
        if (data.existingImages && data.existingImages.length) fd.append("existingImages", JSON.stringify(data.existingImages));
        if (data.files && data.files.length) data.files.forEach((f) => fd.append("images", f));
        return fd;
      })();

      let res;
      if (editProduct) {
        const encodedSlug = encodeURIComponent(editProduct.slug);
        res = await axiosInstance.put(`/admin/products/${encodedSlug}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // prefer returned product (res.data.product or res.data)
        const updated = res.data.product || res.data;
        setProducts((prev) => prev.map((p) => (p.slug === editProduct.slug ? updated : p)));
        setEditProduct(null);
      } else {
        res = await axiosInstance.post("/admin/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const created = res.data.product || res.data;
        setProducts((prev) => [created, ...(prev || [])]);
      }

      Swal.fire("Success", editProduct ? "Product updated!" : "Product uploaded!", "success");
      setActiveSection("view");
    } catch (err) {
      console.error("submit error:", err);
      Swal.fire("Error", "Failed to submit product.", "error");
    }
  };

  const handleDelete = async (slug) => {
    try {
      const result = await Swal.fire({ title: "Are you sure?", text: "This action cannot be undone.", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", cancelButtonColor: "#3085d6", confirmButtonText: "Yes, delete it!", cancelButtonText: "Cancel" });
      if (!result.isConfirmed) return;

      Swal.fire({ title: "Deleting...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      const encoded = encodeURIComponent(slug);
      await axiosInstance.delete(`/admin/products/${encoded}`);
      setProducts((prev) => prev.filter((p) => p && p.slug !== slug));

      Swal.close();
      Swal.fire({ icon: "success", title: "Deleted!", text: "Product has been deleted.", timer: 1500, showConfirmButton: false });
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

  const logout = () => handleLogout("Logging out...");

  return (
    <div className="flex h-screen bg-gray-100 pt-[85px]">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={logout} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 overflow-auto">
          {loading ? <p className="text-gray-600">Loading products...</p> :
            activeSection === "view" ? (
              <ViewProducts products={products || []} onDelete={handleDelete} onEdit={handleEdit} />
            ) : (
              <ProductForms product={editProduct} onAdd={handleSubmitProduct} onCancel={handleCancelEdit} />
            )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;