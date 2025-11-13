// useAutoLogout.jsx
import { useEffect, useRef } from "react";
import { handleLogout, isTokenExpired } from "../utils/authHelper";

const useAutoLogout = () => {
  const logoutTriggered = useRef(false); // track if logout already happened

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("accessToken");

      if (!token || isTokenExpired(token)) {
        if (!logoutTriggered.current) {
          logoutTriggered.current = true; // mark logout triggered
          handleLogout("Session expired. Please log in again.");
        }
      }
    }, 10000); // check every 10 seconds

    return () => clearInterval(interval);
  }, []);
};

export default useAutoLogout;