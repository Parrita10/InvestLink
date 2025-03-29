import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-10">
      <p>© {new Date().getFullYear()} InvestLink. Todos los derechos reservados.</p>
      <div className="flex justify-center gap-6 mt-3 text-xl">
        <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
        <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
        <a href="#" className="hover:text-blue-400 transition"><FaLinkedinIn /></a>
      </div>
    </footer>
  );
};

export default Footer;