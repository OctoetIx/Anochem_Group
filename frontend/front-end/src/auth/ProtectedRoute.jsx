import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const ProtectedRoute = ({ children }) => {
  const [valid, setValid] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosInstance.get("/auth/verifyAdmin"); // backend route to verify token
        setValid(true);
      } catch(err) {
        console.log("auth failed:", err.response?.data);
        localStorage.removeItem("token");
        localStorage.removeItem("adminLoggedIn");
        setValid(false);
      }
    };
    checkAuth();
  }, []);

  if (valid === null) return <p>Checking authentication...</p>;
  if (!valid) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;