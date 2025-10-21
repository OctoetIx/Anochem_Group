import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo1 from "../assets/logo1.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <div className="text-yellow-500">
        <img src={logo1} alt="Logo" className="w-14 h-14 object-contain" />
      </div>

      {/* Nav Links */}
      <div className="space-x-6 flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-semibold"
              : "text-white hover:text-yellow-500 hover:underline"
          }
        >
          Home
        </NavLink>

        {/* Dropdown Menu (Our Products) */}
        <div
          className="relative inline-block"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button
            className="hover:text-yellow-500 font-semibold transition-colors"
          >
            Our Products ▾
          </button>

          {/* Dropdown Content */}
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-black rounded-2xl text-yellow-500 z-20 delay-300">
              <NavLink
                to="/skincare"
                className="block px-4 py-2 hover:bg-white hover:text-black"
              >
                Skin Care
              </NavLink>
              <NavLink
                to="/haircare"
                className="block px-4 py-2 hover:bg-white hover:text-black"
              >
                Hair Care
              </NavLink>
              <NavLink
                to="/bodylotion"
                className="block px-4 py-2 hover:bg-white hover:text-black"
              >
                Body Lotion
              </NavLink>
              <NavLink
                to="/antiseptics"
                className="block px-4 py-2 hover:bg-white hover:text-black"
              >
                Antiseptics
              </NavLink>
              <NavLink
                to="/toiletries"
                className="block px-4 py-2 hover:bg-white hover:text-black"
              >
                Toiletries
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-semibold"
              : "text-white hover:text-yellow-500"
          }
        >
          About Us
        </NavLink>

        <NavLink
          to="/inquiry"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-semibold"
              : "text-white hover:text-yellow-500"
          }
        >
          Inquiry
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-semibold"
              : "text-white hover:text-yellow-500"
          }
        >
          Contact Us
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
