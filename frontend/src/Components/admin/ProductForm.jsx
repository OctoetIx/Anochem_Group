// ProductForms.jsx
import React, { useState, useEffect, useRef } from "react";

const ProductForms = ({ product, onAdd, onCancel }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // preview items: { type: "existing"|"new", url, file? }
  const [preview, setPreview] = useState([]);
  const [files, setFiles] = useState([]); // only new files
  const [coverIndex, setCoverIndex] = useState(0);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = ["Skin Care", "Hair Care", "Body Lotion", "Antiseptics", "Toiletries"];

  useEffect(() => {
    if (product) {
      setProductName(product.productName || "");
      setCategory(product.category || "");
      setDescription(product.description || "");
      setPreview(
        Array.isArray(product.images)
          ? product.images.map((img) => ({ type: "existing", url: img.url }))
          : []
      );
      setFiles([]);
      setCoverIndex(product.coverImageIndex ?? 0);
    } else {
      resetForm();
    }
  }, [product]);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // add new files
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    // append files and preview (URL.createObjectURL for immediate preview)
    const newPreviews = selected.map((file) => ({
      type: "new",
      url: URL.createObjectURL(file),
      file,
    }));

    setFiles((prev) => [...prev, ...selected]);
    setPreview((prev) => [...prev, ...newPreviews]);
  };

  // remove single preview at index
  const removeImage = (index) => {
    const item = preview[index];
    // revoke objectURL for new files
    if (item?.type === "new" && item.url) {
      try {
        URL.revokeObjectURL(item.url);
      } catch {}
      // remove matching file instance (compares by reference)
      setFiles((prev) => prev.filter((f) => f !== item.file));
    }
    setPreview((prev) => prev.filter((_, i) => i !== index));

    // adjust cover index
    if (coverIndex === index) {
      setCoverIndex(0);
    } else if (index < coverIndex) {
      setCoverIndex((ci) => Math.max(0, ci - 1));
    }
  };

  // reorder images
  const moveImage = (from, to) => {
    if (to < 0 || to >= preview.length) return;
    const arr = [...preview];
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);
    setPreview(arr);

    if (coverIndex === from) setCoverIndex(to);
    else if (from < coverIndex && to >= coverIndex) setCoverIndex((ci) => ci - 1);
    else if (from > coverIndex && to <= coverIndex) setCoverIndex((ci) => ci + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !category || !description) {
      alert("Please fill all required fields.");
      return;
    }

    // Build ordered existingImages array (only existing urls, in current preview order)
    const existingImages = preview.filter((p) => p.type === "existing").map((p) => p.url);

    // Files to append must match the preview order of "new" items
    const newFilesInOrder = preview.filter((p) => p.type === "new").map((p) => p.file);

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("description", description);
    // server expects JSON string (or absence) for existingImages
    if (existingImages.length > 0) formData.append("existingImages", JSON.stringify(existingImages));

    // append new files in order
    newFilesInOrder.forEach((file) => formData.append("images", file));

    // coverIndex must be index in final array: existingImages.length + index-of-new-file (if cover is a new image)
    // but we just pass the coverIndex chosen on frontend relative to preview order: server will clamp it
    formData.append("coverImageIndex", String(coverIndex));

    // Provide plain payload variant for onAdd (some code paths prefer structured payload)
    onAdd({
      formData,
      // also send helpful structured values — AdminDashboard expects these
      productName,
      category,
      description,
      existingImages,
      files: newFilesInOrder,
      coverImageIndex: coverIndex,
      preview,
    });

    // keep the form open or reset depending on caller — do not auto-reset while editing
    if (!product) resetForm();
  };

  const resetForm = () => {
    setProductName("");
    setCategory("");
    setDescription("");
    // revoke object URLs
    preview.forEach((p) => {
      if (p.type === "new" && p.url) {
        try {
          URL.revokeObjectURL(p.url);
        } catch {}
      }
    });
    setPreview([]);
    setFiles([]);
    setCoverIndex(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{product ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input value={productName} onChange={(e) => setProductName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-medium mb-1">Category</label>
          <button type="button" onClick={() => setDropdownOpen((s) => !s)} className="w-full px-3 py-2 border rounded text-left">
            {category || "Select Category"}
          </button>
          {dropdownOpen && (
            <ul className="absolute z-10 w-full bg-white border rounded mt-1 shadow-md">
              {categories.map((cat) => (
                <li key={cat} className="px-3 py-2 cursor-pointer hover:bg-yellow-500 hover:text-black" onClick={() => { setCategory(cat); setDropdownOpen(false); }}>
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{product ? "Edit Images" : "Product Images"}</label>
          <label className="inline-block bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-yellow-500 hover:text-black">
            Browse
            <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
          </label>

          <div className="grid grid-cols-3 gap-2 mt-3">
            {preview.map((p, i) => (
              <div key={i} className="relative border rounded p-1">
                <img src={p.url} alt="" className="w-24 h-24 object-cover rounded" />
                <button type="button" className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded px-1" onClick={() => removeImage(i)}>X</button>

                <button type="button" className={`absolute bottom-0 left-0 px-2 py-1 text-xs rounded ${coverIndex === i ? "bg-green-600 text-white" : "bg-gray-200 text-black"}`} onClick={() => setCoverIndex(i)}>
                  {coverIndex === i ? "Default" : "Set Default"}
                </button>

                <div className="absolute bottom-0 right-0 flex space-x-1">
                  <button type="button" className="bg-gray-200 text-black text-xs px-1 rounded" onClick={() => moveImage(i, i - 1)}>↑</button>
                  <button type="button" className="bg-gray-200 text-black text-xs px-1 rounded" onClick={() => moveImage(i, i + 1)}>↓</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500"> {product ? "Update Product" : "Add Product"} </button>
          <button type="button" onClick={() => { onCancel(); resetForm(); }} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForms;