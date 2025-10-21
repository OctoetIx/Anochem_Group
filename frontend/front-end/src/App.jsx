// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Home";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<h1>Our Products</h1>} />
        <Route path="/about" element={<h1>About Us</h1>} />
        <Route path="/inquiry" element={<h1>Inquiry</h1>} />
        <Route path="/contact" element={<h1>Contact Us</h1>} />
        <Route path="/skincare" element={<h1>Skin Care</h1>} />
        <Route path="/haircare" element={<h1>Hair Care</h1>} />
        <Route path="/bodylotion" element={<h1>Body Lotion</h1>} />
        <Route path="/antiseptics" element={<h1>Antiseptics</h1>} />
        <Route path="/toiletries" element={<h1>Toiletries</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
