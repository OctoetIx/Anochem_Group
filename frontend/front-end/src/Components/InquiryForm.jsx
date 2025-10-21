import React from "react";

const InquiryForm = () => {

      const statesInNigeria = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
    "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa",
    "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
    "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  const ourProducts = [
    "Skincare", "Haircare", "Body Lotion", "Antiseptics", "Toiletries"
  ];


  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        LET’S CONNECT WITH YOU
      </h2>
      <p className="text-gray-600 text-center mb-10">
        We’d love to know what you’re interested in! Share your details and message, and we’ll reach out to assist you.
      </p>

      <form className="space-y-8">
        {/* Name */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Name <span className="text-red-600">*</span>
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Work Email */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Work Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your work email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Phone
          </label>
          <input
            type="tel"
            placeholder="+234 802 123 4567"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Address
          </label>
          <input
            type="text"
            placeholder="Address Line 1"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Address Line 2"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
      <select
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">--- Select State ---</option>
        {statesInNigeria.map((state, index) => (
          <option key={index} value={state.toLowerCase()}>
            {state}
          </option>
        ))}
      </select>
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Enter company name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Interest */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Product Interest
          </label>
             <select
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">--- Select product ---</option>
        {ourProducts.map((product, index) => (
          <option key={index} value={product.toLowerCase()}>
            {product}
          </option>
        ))}
      </select>
        </div>

        {/* Inquiry Details */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Inquiry Details
          </label>
          <textarea
            rows="5"
            placeholder="Write your inquiry here..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-black text-yellow-500 font-semibold px-6 py-3 rounded-md transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;
