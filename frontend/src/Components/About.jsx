import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import img1 from "../assets/img1.jpg"; // Hero image
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const About = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        const allProducts = res.data.items || [];
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        const randomTen = shuffled.slice(0, 10);
        setProducts(randomTen);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 text-black min-h-screen">
      {/* HERO SECTION */}
      <section
        className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          className="relative z-10 text-center px-6 text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Anochemical Cosmetics Industries Ltd
          </h1>
          <p className="text-lg md:text-2xl">
            Nigeria’s Leading Cosmetics Manufacturer Since 1987
          </p>
        </motion.div>
      </section>

      {/* ABOUT DESCRIPTION */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            About Us
          </h2>
          <p className="text-lg leading-relaxed text-black">
            Anochemical Cosmetics Industries Ltd stands as a trusted name in the beauty and personal care industry. Founded with a vision to deliver high-quality, affordable cosmetic and personal care products, we have grown into one of Nigeria’s most respected manufacturers in the sector.
            <br /><br />
            Our commitment to innovation, safety, and excellence drives everything we do — from research and formulation to production and packaging. Each product is carefully developed by a team of skilled chemists and production experts using modern technology and globally certified ingredients.
            <br /><br />
            For over three decades, we’ve combined expertise with passion to create beauty solutions that inspire confidence and celebrate individuality. From hair care to skin care, Anochemical continues to raise industry standards while expanding our reach across Africa and beyond.
            <br /><br />
            At Anochemical, quality is not just a promise — it’s our identity.
          </p>
        </motion.div>
      </section>

      {/* AUTO-SLIDING PRODUCT CAROUSEL */}
      <section className="relative bg-gray-900 py-6 sm:py-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

        <h3 className="relative text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-yellow-500 z-10">
          Our Products
        </h3>

        <div
          className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 z-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-3 sm:gap-4"
            animate={{ x: isPaused ? 0 : ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] rounded-xl overflow-hidden shadow-lg cursor-pointer bg-gray-800"
                onClick={() => navigate(`/products/${product.slug}`)}
              >
                <div className="w-full aspect-square overflow-hidden">
                  <img
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.productName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-2 text-center bg-gray-900">
                  <h4 className="text-sm sm:text-base font-medium truncate text-yellow-500">
                    {product.productName}
                  </h4>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-4 sm:mt-6 z-10 relative">
          <button
            onClick={() => navigate("/products")}
            className="bg-yellow-500 text-black px-5 sm:px-7 py-2 sm:py-3 rounded-full text-base sm:text-lg hover:bg-yellow-400 hover:text-black cursor-pointer transition duration-300"
          >
            Explore Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;