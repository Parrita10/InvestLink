// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { t, i18n } = useTranslation();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center px-10">
      <h1 className="text-2xl font-bold text-blue-600">InvestLink</h1>
      <ul className="flex gap-6 text-gray-700 dark:text-gray-200">
        <li><Link to="/">{t("Inicio")}</Link></li>
        <li><Link to="/empresas">{t("Empresas")}</Link></li>
        <li><Link to="/invertir">{t("Invertir")}</Link></li>
        <li><Link to="/categorias">{t("Categorías")}</Link></li>
        <li><Link to="/contacto">{t("Contacto")}</Link></li>
      </ul>
      <div className="flex items-center gap-3">
        <button onClick={toggleDarkMode} className="text-xl text-gray-700 dark:text-white">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <button onClick={() => i18n.changeLanguage("es")} className="text-sm">ES</button>
        <button onClick={() => i18n.changeLanguage("en")} className="text-sm">EN</button>
      </div>
    </nav>
  );
};

export default Navbar;