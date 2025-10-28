import React, { useState, useEffect } from "react";

const ProductForm = ({ onAdd, onUpdate, selectedProduct }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    // available: true,
  });

  const categories = [
    "Skincare",
    "Haircare",
    "Body Lotion",
    "Antiseptics",
    "Toiletries",
  ];

  useEffect(() => {
    if (selectedProduct) {
      setForm(selectedProduct);
    } else {
      setForm({
        name: "",
        category: "",
        description: "",
        image: "",
        available: true,
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.category) return alert("All fields required!");

    if (selectedProduct) {
      onUpdate(form);
    } else {
      onAdd(form);
    }

    setForm({
      name: "",
      category: "",
      description: "",
      image: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow mb-8 space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {selectedProduct ? "Update Product" : "Add New Product"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="">Select Category</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <div>
        <label className="block text-sm font-medium mb-1">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="mt-2 w-24 h-24 object-cover rounded"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 hover:text-black transition"
      >
        {selectedProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
