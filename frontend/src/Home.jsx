import React, { useRef, useEffect, useState } from "react";
import Carousel from "./Components/Carousel";
import img4 from "./assets/img4.jpg";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import { motion, useAnimation, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeaturedProductCard from "./Components/FeaturedProductCard";
import axiosInstance from "./api/axiosInstance";

const Home = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const navigate = useNavigate();
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const productImages = [img1, img2, img3, img4];
  const duplicatedImages = [...productImages, ...productImages];


const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      const allProducts = res.data.items || [];

      // Shuffle products randomly
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());

      // Pick the first 8
      const randomEight = shuffled.slice(0, 8);

      setProducts(randomEight);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);


  return (
    <>
      {/* HERO CAROUSEL */}
      <div className="mt-20 relative w-full h-[80vh] md:h-[90vh] lg:h-[95vh] overflow-hidden">
        <Carousel />
      </div>

      {/* INTRO SECTION */}
      <div className="text-center px-4 sm:px-6 mt-8 md:px-8 lg:px-12 space-y-4">
        <h3 className="text-base sm:text-lg md:text-xl">
          Since 1987 — The Beauty of Trust and Innovation
        </h3>
        <h1 className="my-4 font-bold text-2xl sm:text-3xl md:text-4xl">
          WELCOME TO ANOCHEMICAL INDUSTRIES LTD
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
          At Anochemical Cosmetics, beauty isn’t just what we create — it’s what
          we believe in. Born from a simple dream to make world-class cosmetics
          accessible to everyone, Anochemical has grown into a symbol of
          quality, trust, and care. Every product tells a story — crafted with
          science, perfected with passion, and inspired by you. From the heart
          of Nigeria, our team of experts blends innovation with experience to
          deliver products that not only enhance beauty but also empower
          confidence. We don’t just manufacture cosmetics — we build
          relationships based on excellence, reliability, and results. Because
          when you choose Anochemical, you choose a legacy of beauty that lasts.
        </p>
      
      </div>

      {/* ABOUT / FADE-IN SECTION */}
     <section
  ref={ref}
  className="relative bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 md:py-24 overflow-hidden"
>
  {/* Decorative blur */}
  <div className="absolute -top-24 -right-24 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl" />

  <motion.div
    className="relative max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 px-4 sm:px-6 lg:px-8"
    variants={containerVariants}
    initial="hidden"
    animate={controls}
  >
    {/* TEXT SECTION */}
    <motion.div
      variants={itemVariants}
      className="md:w-1/2 text-center md:text-left"
    >
      <span className="inline-block mb-3 text-sm sm:text-base tracking-widest uppercase text-yellow-600 font-semibold">
        Since 1987
      </span>

      <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight text-gray-900">
        #1 Cosmetics Company <br className="hidden sm:block" />
        in Nigeria
      </h1>

      <p className="mt-6 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
        Anochemical Cosmetics delivers advanced quality control where excellence
        is expected. From laboratory formulation to large-scale production,
        every step is designed to guarantee premium products and packaging you
        can trust.
      </p>

      <button
        onClick={() => navigate("/products")}
        className="mt-8 cursor-pointer inline-flex items-center gap-2 bg-black text-yellow-500 px-6 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-md"
      >
        Explore Our Products
      </button>
    </motion.div>

    {/* IMAGE SECTION */}
    <motion.div
      variants={itemVariants}
      className="md:w-1/2 flex justify-center"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-500/20 rounded-2xl blur-xl scale-105" />
        <img
          src={img4}
          alt="About Anochemical"
          className="relative w-[280px] sm:w-[360px] md:w-[440px] rounded-2xl shadow-2xl object-cover"
        />
      </div>
    </motion.div>
  </motion.div>
</section>


{/* AUTO-SLIDING PRODUCT CAROUSEL */}
<section className="relative bg-gray-900 py-6 sm:py-8 overflow-hidden">
  {/* Optional overlay for subtle effect */}
  <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

  {/* Section Title */}
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
  {products
    .sort(() => 0.5 - Math.random())
    .slice(0, 10)
    .map((product) => (
      <div
        key={product._id}
        className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] rounded-xl overflow-hidden shadow-lg cursor-pointer bg-gray-800"
        onClick={() => navigate(`/products/${product.slug}`)}
      >
        {/* Make image square */}
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

  {/* Explore Button */}
  <div className="text-center mt-4 sm:mt-6 z-10 relative">
    <button
      onClick={() => navigate("/products")}
      className="bg-yellow-500 text-black px-5 sm:px-7 py-2 sm:py-3 rounded-full text-base sm:text-lg hover:bg-yellow-400 hover:text-black cursor-pointer transition duration-300"
    >
      Explore Products
    </button>
  </div>
</section>
    </>
  );
};

export default Home;