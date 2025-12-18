import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const slides = [
  {
    image: img1,
    title: "Redefining Beauty Through Science",
    subtitle:
      "World-class cosmetics crafted with precision, innovation, and care.",
  },
  {
    image: img2,
    title: "Trusted Since 1987",
    subtitle:
      "Decades of excellence delivering quality you can rely on every day.",
  },
  {
    image: img3,
    title: "Confidence Starts With Quality",
    subtitle:
      "Advanced formulations designed to enhance beauty and empower you.",
  },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const Carousel = () => {
  const navigate = useNavigate();
  const [[index, direction], setIndex] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);

  const paginate = (dir) => {
    setIndex(([prev]) => [
      (prev + dir + slides.length) % slides.length,
      dir,
    ]);
  };

  // Auto slide
  useEffect(() => {
    if (paused) return;

    timeoutRef.current = setTimeout(() => paginate(1), 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [index, paused]);

  return (
    <div
      className="
        relative w-full
        h-[45vh]
        sm:h-[55vh]
        md:h-[70vh]
        lg:h-[85vh]
        overflow-hidden
      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* SLIDES */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={slides[index].image}
          custom={direction}
          variants={{
            enter: (dir) => ({
              x: dir > 0 ? 120 : -120,
              opacity: 0,
              scale: 1.05,
            }),
            center: { x: 0, opacity: 1, scale: 1 },
            exit: (dir) => ({
              x: dir < 0 ? 120 : -120,
              opacity: 0,
              scale: 1.02,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 260, damping: 30 },
            opacity: { duration: 0.8 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) paginate(1);
            else if (swipe > swipeConfidenceThreshold) paginate(-1);
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />

      {/* TEXT + CTA */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl"
          >
            <h1 className="text-white font-extrabold text-2xl sm:text-4xl md:text-5xl leading-tight">
              {slides[index].title}
            </h1>

            <p className="mt-4 text-gray-200 text-sm sm:text-base md:text-lg">
              {slides[index].subtitle}
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(234,179,8,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="
                mt-6 inline-flex items-center justify-center
                bg-yellow-500 text-black
                px-7 py-3 rounded-full
                font-semibold text-sm sm:text-base
                transition-all duration-300
              "
            >
              Explore Products
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-yellow-500 scale-125"
                : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20 z-30">
        <motion.div
          key={index}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-yellow-500"
        />
      </div>
    </div>
  );
};

export default Carousel;
