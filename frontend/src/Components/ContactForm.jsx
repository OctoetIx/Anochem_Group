import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    productInterest: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center p-2">
      <form
        onSubmit={handleSubmit}
        className="bg-black text-white w-full max-w-md space-y-4 p-4 rounded-lg shadow-md"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-semibold mb-1">Join Our Beauty Community</h1>
          <p className="text-sm text-gray-300">We Value You – Share Your Details</p>
        </div>

        {/* Name Section */}
        <div>
          <label className="block text-sm font-semibold mb-1">Name *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              name="firstName"
              placeholder="First"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-400 bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-400 bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Phone Section */}
        <div>
          <label className="block text-sm font-semibold mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="0802 123 4567"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Email Section */}
        <div>
          <label className="block text-sm font-semibold mb-1">Email *</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-400 bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Product Interest */}
        <div>
          <label className="block text-sm font-semibold mb-1">Product Interest</label>
          <select
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-400 bg-black text-white text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          >
            <option value="">Select a product</option>
            <option value="skincare">Skin Care</option>
            <option value="haircare">Hair Care</option>
            <option value="bodylotion">Body Lotion</option>
            <option value="antiseptics">Antiseptics</option>
            <option value="toiletries">Toiletries</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-600 text-sm transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;