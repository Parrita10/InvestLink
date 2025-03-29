// src/pages/RegistrarEmpresa.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useTranslation } from "react-i18next";
import { FaBuilding, FaEnvelope, FaLock, FaGlobe, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RegistrarEmpresa = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navbar darkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto mt-20 px-6 pb-16"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-2">
          InvestLink
        </h2>
        <h3 className="text-2xl font-bold text-center mb-2">{t("Registra tu Empresa")}</h3>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          {t("Completa el formulario para comenzar a recibir inversiones y expandir tu negocio.")}
        </p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <form className="space-y-4">
            <div className="flex items-center border rounded px-3 py-2">
              <FaBuilding className="text-blue-500 mr-3" />
              <input
                type="text"
                placeholder={t("Nombre de la Empresa")}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaEnvelope className="text-blue-500 mr-3" />
              <input
                type="email"
                placeholder={t("Correo Electrónico")}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaLock className="text-blue-500 mr-3" />
              <input
                type="password"
                placeholder={t("Contraseña")}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaGlobe className="text-blue-500 mr-3" />
              <input
                type="text"
                placeholder={t("Sitio Web de la Empresa")}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaPhone className="text-blue-500 mr-3" />
              <input
                type="text"
                placeholder={t("Número de Teléfono")}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
            >
              {t("Registrar Empresa")}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
            {t("¿Ya tienes cuenta?")}{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              {t("Inicia sesión")}
            </Link>
          </p>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default RegistrarEmpresa;