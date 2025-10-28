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
    <div className="min-h-screen flex justify-center items-center bg-black p-4 sm:p-6 md:p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-black text-white w-full max-w-4xl space-y-6 sm:space-y-8"
      >
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
            Join Our Beauty Community
          </h1>
          <p className="text-base sm:text-lg text-gray-300">
            We Value You – Share Your Details to Explore
          </p>
        </div>

        {/* Name Section */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Phone Section */}
        <div>
          <label className="block text-lg font-semibold mb-2">Phone</label>
          <div className="flex items-center space-x-2">
            <input
              type="tel"
              name="phone"
              placeholder="0802 123 4567"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Email Section */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Product Interest */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Product Interest
          </label>
          <select
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 bg-black text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
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
        <div className="pt-4 text-center sm:text-left">
          <button
            type="submit"
            className="bg-yellow-500 text-black font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-md hover:bg-yellow-600 transition-all duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;