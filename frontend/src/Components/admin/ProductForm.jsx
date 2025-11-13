import React, { useState, useEffect, useRef } from "react";

const ProductForms = ({ onAdd, product, onCancel }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const categories = [
    "Skin Care",
    "Hair Care",
    "Body Lotion",
    "Antiseptics",
    "Toiletries",
  ];

  //  Prefill form when editing or reset when adding
  useEffect(() => {
    if (product) {
      setProductName(product.productName || "");
      setCategory(product.category || "");
      setDescription(product.description || "");
      setPreview(product.imageUrl || "");
      setFile(null);
    } else {
      resetForm();
    }
  }, [product]);

  //  Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Handle file selection + preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  //  Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !category || !description) {
      alert("Please fill all required fields.");
      return;
    }
   onAdd({
  productName,
  category,
  categorySlug: category.toLowerCase().replace(/\s+/g, "-"),
  description,
  file
});
    resetForm(); // clear form after submit
  };

  // Reset fields after submit or cancel
  const resetForm = () => {
    setProductName("");
    setCategory("");
    setDescription("");
    setFile(null);
    setPreview("");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {product ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-gray-700 font-medium mb-1">
            Category
          </label>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full px-3 py-2 rounded bg-white text-gray-800 text-left border hover:bg-yellow-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          >
            {category || "Select Category"}
          </button>
          {dropdownOpen && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-auto shadow-md">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className="px-3 py-2 cursor-pointer hover:bg-yellow-500 hover:text-black text-gray-800"
                  onClick={() => {
                    setCategory(cat);
                    setDropdownOpen(false);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="3"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {product ? "Change Image (optional)" : "Product Image"}
          </label>
          <div className="flex items-center space-x-2">
            <label className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-yellow-500 hover:text-black transition">
              Browse
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <input
              type="text"
              readOnly
              value={file ? file.name : ""}
              placeholder="No file selected"
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {preview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded border"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition"
          >
            {product ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            onClick={() => {
              onCancel();
              resetForm();
            }}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForms;