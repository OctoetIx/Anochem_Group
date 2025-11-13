import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import img1 from "../assets/img1.jpg" // Replace with your hero image
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const animate = async () => {
      while (isMounted) {
        if (!isPaused) {
          await controls.start({
            x: -600,
            transition: { duration: 10, ease: "linear" },
          });
          await controls.start({ x: 0, transition: { duration: 0 } });
        } else {
          await new Promise((resolve) => setTimeout(resolve, 100)); // short delay when paused
        }
      }
    };

    animate();
    return () => {
      isMounted = false;
    };
  }, [controls, isPaused]);

  return (
    <div className="bg-gray-50 text-black min-h-screen">
{/* HERO SECTION */}
<section
  className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: `url(${img1})`,
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Text Content */}
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
      <section className="bg-black py-16 overflow-hidden">
        <h3 className="text-3xl font-bold text-center mb-10 text-black">
          Our Products
        </h3>
        <div
          className="relative max-w-6xl mx-auto cursor-grab"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div className="flex gap-6" animate={controls}>
            {[img1, img2, img3, img4, img2, img1].map(
              (image, index) => (
                <div
                  key={index}
                  className="min-w-[250px] sm:min-w-[300px] rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )
            )}
          </motion.div>
        </div>

        {/* EXPLORE BUTTON */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/products")}
            className="bg-yellow-500 text-black px-8 py-3 rounded-full text-lg hover:bg-yellow-500 hover:text-white transition duration-300"
          >
            Explore Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
