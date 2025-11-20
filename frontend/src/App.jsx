// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Home";
import About from "./Components/About";
import LoginPage from "./auth/Login";
import InquiryForm from "./Components/InquiryForm";
import ContactPage from "./Components/ContactPage";
import ProductPage from "./Components/ProductPage";
import ProductDetails from "./Components/ProductDetails";
import AdminDashboard from "./Components/admin/AdminDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import RegisterPage from "./auth/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"; //
import { ProductProvider } from "./context/ProductContext";
import CategoryPages from "./Components/CategoryPages";

const App = () => {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/products" element={<ProductPage />} />

          <Route path="/products/category/:slug" element={<CategoryPages />} />

          <Route path="/products/:slug" element={<ProductDetails />} />

          <Route path="/about" element={<About />} />
          <Route path="/inquiry" element={<InquiryForm />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </BrowserRouter>
    </ProductProvider>
  );
};

export default App;
