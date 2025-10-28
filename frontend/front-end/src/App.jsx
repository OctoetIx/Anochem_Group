// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Home";
import About from "./Components/About";
import Login from "./auth/Login";
import InquiryForm from "./Components/InquiryForm";
import ContactPage from "./Components/ContactPage";
import ProductPage from "./Components/ProductPage";
import AdminDashboard from "./Components/admin/AdminDashboard";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductPage/>} />
        <Route path="/about" element={<About />} />
        <Route path="/inquiry" element={<InquiryForm/>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
