
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
    <div className="min-h-screen flex justify-center items-center bg-black p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-black text-white max-w-3xl w-full space-y-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">
            Join Our Beauty Community
          </h1>
          <p className="text-lg">
            We Value You – Share Your Details to Explore
          </p>
        </div>

        {/* Name Section */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 text-white"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 text-white"
            />
          </div>
        </div>

        {/* Phone Section */}
        <div>
          <label className="block text-lg font-semibold mb-2">Phone</label>
          <div className="flex items-center space-x-2">
            <span className="text-2xl"></span>
            <input
              type="tel"
              name="phone"
              placeholder="0802 123 4567"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 text-white"
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
            className="w-full p-3 rounded-md border border-gray-300 text-white"
          />
        </div>

         {/* Product Interest */}
         <div className="mb-6">
           <label className="block text-lg font-semibold mb-2">
             Product Interest
           </label>
           <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 text-white bg-black"
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
        <div className="pt-4">
          <button
            type="submit"
            className="bg-yellow-500 text-black cursor-pointer hover:bg-yellow-600 px-8 py-3 rounded-md font-semibold transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;



// import React, { useState } from "react";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     product: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//     alert("Thank you! Your inquiry has been submitted.");
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       product: "",
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200"
//       >
//         <h2 className="text-2xl font-semibold text-center text-yellow-600 mb-6">
//           Product Inquiry Form
//         </h2>

//         {/* First Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">
//             First Name
//           </label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//           />
//         </div>

//         {/* Last Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">
//             Last Name
//           </label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//           />
//         </div>

//         {/* Phone */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//           />
//         </div>

//         {/* Product Interest */}
//         <div className="mb-6">
//           <label className="block text-gray-700 font-medium mb-1">
//             Product Interest
//           </label>
//           <select
//             name="product"
//             value={formData.product}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//           >
//             <option value="">Select a product</option>
//             <option value="Chemical A">Chemical A</option>
//             <option value="Chemical B">Chemical B</option>
//             <option value="Chemical C">Chemical C</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-yellow-600 text-white font-semibold py-2 rounded-lg hover:bg-yellow-700 transition duration-200"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };
