import React, { useRef, useEffect, useState } from "react";
import Carousel from "./Components/Carousel";
import ContactForm from "./Components/ContactForm";
import img4 from "./assets/img4.jpg";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import { motion, useAnimation, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      {/* HERO CAROUSEL */}
      <div className="pt-[90px]">
        <Carousel />
      </div>

      {/* INTRO SECTION */}
      <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 space-y-4">
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
        <button
          onClick={() => navigate("/products")}
          className="bg-black cursor-pointer px-5 sm:px-6 py-3 sm:py-4 my-4 rounded-lg text-yellow-500 font-medium transition hover:bg-yellow-600 hover:text-black text-sm sm:text-base md:text-lg"
        >
          Our Products
        </button>
      </div>

      {/* CONTACT FORM */}
      <div className="px-4 sm:px-6 md:px-8">
        <ContactForm />
      </div>

      {/* ABOUT / FADE-IN SECTION */}
      <section ref={ref} className="bg-white py-10 sm:py-14 md:py-16">
        <motion.div
          className="flex flex-col md:flex-row my-6 justify-center md:justify-around items-center px-4 sm:px-6 md:px-8 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Text Section */}
          <motion.div
            variants={itemVariants}
            className="text-center md:text-left md:w-1/2 px-2 sm:px-4 text-base sm:text-lg md:text-xl"
          >
            <h3 className="text-gray-700 text-base sm:text-lg md:text-xl">
              Since 1987
            </h3>
            <h1 className="my-4 font-bold text-2xl sm:text-3xl md:text-4xl text-black">
              #1 COSMETICS COMPANY IN NIGERIA
            </h1>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
              Anochemical Cosmetics provides advanced quality control in an
              industry where excellence is expected. Measures are applied
              throughout the manufacturing process — from the chemist in our
              labs to the production line — assuring you the finest products and
              packaging.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div variants={itemVariants} className="w-full md:w-[45%]">
            <img
              src={img4}
              alt="About Anochemical"
              className="w-full sm:w-[350px] md:w-[450px] rounded-lg shadow-lg mx-auto"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* AUTO-SLIDING PRODUCT CAROUSEL */}
      <section className="bg-black py-10 sm:py-14 md:py-16 overflow-hidden">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-white">
          Our Products
        </h3>

        <div
          className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-4 sm:gap-6"
            animate={{
              x: isPaused ? 0 : ["0%", "-50%"],
            }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="min-w-[200px] sm:min-w-[250px] md:min-w-[300px] rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* EXPLORE BUTTON */}
        <div className="text-center mt-8 sm:mt-10">
          <button
            onClick={() => navigate("/products")}
            className="bg-yellow-500 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg hover:bg-yellow-400 hover:text-black cursor-pointer transition duration-300"
          >
            Explore Products
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;