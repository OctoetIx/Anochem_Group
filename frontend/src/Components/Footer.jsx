import React from "react";
import { ArrowUp } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white bottom-0 left-0 w-full">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-12">
        {/* Logo & Description */}
        <div>
          <h2 className="text-[#d4a44d] text-2xl font-bold mb-2">
            ANOCHEMICAL
          </h2>
          <p className="text-sm text-[#d4a44d] mb-4">
            COSMETICS INDUSTRIES LTD
          </p>
          <p className="text-gray-300 leading-relaxed">
            Anochemical Cosmetics Industries Limited is a global player in the
            manufacture of first-class Hair and Body Care products of all types.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-bold text-lg mb-3">CONTACT</h3>
          <p className="text-gray-300">
            Km 33, Badagry Express Way,
            <br />
            Opp. Agbara Industrial Estate,
            <br />
            Morogbo, Lagos State.
          </p>
        </div>

        {/* Telephone Enquiry */}
        <div>
          <h3 className="font-bold text-lg mb-3">TELEPHONE ENQUIRY</h3>
          <ul className="space-y-1 text-gray-300">
            <li>0803 326 9398</li>
            <li>0803 526 0825</li>
            <li>0803 584 4624</li>
            <li>0806 079 9575</li>
          </ul>
        </div>

        {/* Opening Time */}
        <div>
          <h3 className="font-bold text-lg mb-3">OPENING TIME</h3>
          <p className="text-gray-300">
            Monday – Friday: <br />
            Open: <span className="font-semibold">8:00 AM</span> – <br />
            Close: <span className="font-semibold">18:00 PM</span>
            <br />
            Saturday – Sunday: Close
          </p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 pb-6">
        <a
          href="https://www.facebook.com/anochemical"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-[#d4a44d] hover:text-white transition"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://twitter.com/anochemical"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="text-[#d4a44d] hover:text-white transition"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://www.instagram.com/anochemical"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-[#d4a44d] hover:text-white transition"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://www.linkedin.com/company/anochemical"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-[#d4a44d] hover:text-white transition"
        >
          <FaLinkedinIn size={20} />
        </a>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1e1e1e] border-t border-gray-700 py-4 px-6 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
        <p className="text-center">
          Copyright © 2025 ANOCHEM GROUP. All Right Reserved.
        </p>

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-4 md:mt-0 bg-transparent border-2 border-[#d4a44d] rounded-full p-2 hover:bg-[#d4a44d] hover:text-black transition"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
