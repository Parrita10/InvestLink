import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useTranslation } from "react-i18next";
import { FaBuilding, FaUsers, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Empresas = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const companies = [
    {
      name: "Inmobiliaria Expansión",
      category: "Bienes Raíces",
      investors: 120,
      description: "Empresa líder en desarrollo inmobiliario.",
    },
    {
      name: "AgroGan S.A.",
      category: "Ganadería",
      investors: 95,
      description: "Innovación y crecimiento en el sector agropecuario.",
    },
    {
      name: "TechFuture",
      category: "Tecnología",
      investors: 150,
      description: "Soluciones tecnológicas para el futuro.",
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <Navbar darkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center p-10"
      >
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
          {t("Explora Empresas")} 🚀
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {t("Encuentra empresas en las que puedas invertir o con las que puedas colaborar.")}
        </p>
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            placeholder={t("Buscar empresas o sectores...")}
            className="p-3 w-96 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700 transition">
            🔍
          </button>
        </div>
      </motion.section>

      {/* Listado de Empresas */}
      <section className="px-10 pb-10">
        <h3 className="text-2xl font-bold mb-6">{t("Empresas Registradas")}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400 font-semibold text-lg">
                <FaBuilding />
                {company.name}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{company.category}</p>
              <p className="text-sm flex items-center gap-2 text-gray-500 mt-1">
                <FaUsers /> {company.investors} inversionistas
              </p>
              <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{company.description}</p>
              <button className="w-full mt-4 border rounded px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition">
                {t("Ver Perfil")}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} InvestLink. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-6 mt-3 text-lg">
          <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-400 transition"><FaLinkedinIn /></a>
        </div>
      </footer>
    </div>
  );
};

export default Empresas;