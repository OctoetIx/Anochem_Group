import React, { useState, useContext, useMemo } from "react";
import axiosInstance from "../api/axiosInstance";
import { ProductContext } from "../context/ProductContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const { products = [], loading } = useContext(ProductContext);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    productInterest: "", // categorySlug
    productSlug: "",
    productName: "",
    message: "",
  });

  // Build categories from products
  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (p.categorySlug && p.category) map.set(p.categorySlug, p.category);
    });
    return Array.from(map, ([value, label]) => ({ value, label }));
  }, [products]);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (!formData.productInterest) return [];
    return products.filter((p) => p.categorySlug === formData.productInterest);
  }, [products, formData.productInterest]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If product is selected, also store the productName
    if (name === "productSlug") {
      const selected = filteredProducts.find((p) => p.slug === value);
      setFormData((prev) => ({
        ...prev,
        productSlug: value,
        productName: selected?.productName || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "productInterest" && { productSlug: "", productName: "" }),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axiosInstance.post("/contact", formData);

      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        productInterest: "",
        productSlug: "",
        productName: "",
        message: "",
      });
    } catch (err) {
      console.error(err);

      toast.error("Failed to send message", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return ( 
    <div className="flex justify-center items-center p-2">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-black text-white w-full max-w-md space-y-4 p-4 rounded-lg shadow-md"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-semibold mb-1">
            Join Our Beauty Community
          </h1>
          <p className="text-sm text-gray-300">
            We Value You – Share Your Details
          </p>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Name *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              name="firstName"
              placeholder="First"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-400 bg-transparent"
            />
            <input
              name="lastName"
              placeholder="Last"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-400 bg-transparent"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold mb-1">Phone</label>
          <input
            name="phoneNumber"
            placeholder="0802 123 4567"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 bg-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-400 bg-transparent"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Product Interest *
          </label>
          <select
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-2 rounded border border-gray-400 bg-black"
          >
            <option value="">
              {loading ? "Loading categories..." : "Select category"}
            </option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product */}
        <div>
          <label className="block text-sm font-semibold mb-1">Product</label>
          <select
            name="productSlug"
            value={formData.productSlug}
            onChange={handleChange}
            disabled={!filteredProducts.length}
            className="w-full p-2 rounded border border-gray-400 bg-black"
          >
            <option value="">
              {filteredProducts.length
                ? "Select a product"
                : "Select category first"}
            </option>
            {filteredProducts.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.productName}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Inquiry Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 rounded border border-gray-400 bg-transparent"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={submitting}
            className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-600 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;