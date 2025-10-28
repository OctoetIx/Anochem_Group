import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger + close icons
import logo1 from "../assets/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center text-yellow-500">
          <img src={logo1} alt="Logo" className="w-14 h-14 object-contain" />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 items-center">
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

          {/* Dropdown Menu */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <NavLink
              to="/products"
              className="hover:text-yellow-500 font-semibold transition-colors"
            >
              Our Products ▾
            </NavLink>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-black rounded-2xl text-yellow-500 z-20">
                <NavLink
                  to="/products/skincare"
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

        {/* Hamburger for mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-yellow-500 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 text-center space-y-4 py-4">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className="block text-white hover:text-yellow-500"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={toggleMenu}
            className="block text-white hover:text-yellow-500"
          >
            Our Products
          </NavLink>
          <NavLink
            to="/about"
            onClick={toggleMenu}
            className="block text-white hover:text-yellow-500"
          >
            About Us
          </NavLink>
          <NavLink
            to="/inquiry"
            onClick={toggleMenu}
            className="block text-white hover:text-yellow-500"
          >
            Inquiry
          </NavLink>
          <NavLink
            to="/contact"
            onClick={toggleMenu}
            className="block text-white hover:text-yellow-500"
          >
            Contact Us
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;