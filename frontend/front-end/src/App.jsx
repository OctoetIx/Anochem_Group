// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Home";
import About from "./Components/About";
import Login from "./auth/Login";
import InquiryForm from "./Components/InquiryForm";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<h1>Our Products</h1>} />
        <Route path="/about" element={<About />} />
        <Route path="/inquiry" element={<InquiryForm/>} />
        <Route path="/contact" element={<h1>Contact Us</h1>} />
        <Route path="/skincare" element={<h1>Skin Care</h1>} />
        <Route path="/haircare" element={<h1>Hair Care</h1>} />
        <Route path="/bodylotion" element={<h1>Body Lotion</h1>} />
        <Route path="/antiseptics" element={<h1>Antiseptics</h1>} />
        <Route path="/toiletries" element={<h1>Toiletries</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
