import React from "react";
import Carousel from "./Components/Carousel";
import ContactForm from "./Components/ContactForm";
import Footer from "./Components/Footer";

const Home = () => {
  return (
    <>
      <div className="">
        <Carousel />
      </div>
      <div className="text-center text-2xl p-6 space-y-4">
        {/* Additional home page content can go here */}
        <h3>Since 1987</h3>
        <h1 className="my-4">
            WELCOME TO ANOCHEMICAL INDUSTRIES LTD
        </h1>
        <p>
            ANOCHEMICAL COSMETICS started in 2000 with a vision to serve the market with quality cosmetic
             beauty Products at a reasonable price. Our management team consists of experienced persons in 
             the cosmetics field as well as energetic, enthusiastic, young persons. This gives a perfect 
             combination of prompt action balanced with experience.
        </p>
        <button className="bg-black cursor-pointer px-6 py-4 my-4 rounded-lg text-yellow-500 font-medium transition">
            Our Products
        </button>
      </div>
      <div>
        <ContactForm />
      </div>

      <Footer />
    </>
  );
};

export default Home;
