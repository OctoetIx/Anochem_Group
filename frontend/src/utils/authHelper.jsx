import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";


export const isAccessTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() / 1000 > exp;
  } catch {
    return true;
  }
};

export const handleLogout = async (message) => {
  try {
    await axiosInstance.post("/auth/logout"); // invalidate refresh token in backend

    // Clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    sessionStorage.clear();

    if (message) {
      toast.info(message, { autoClose: 500 });
    }

    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  } catch (err) {
    console.error("Logout failed:", err);
    toast.error("Failed to logout. Try again.", { autoClose: 2000 });
  }
};