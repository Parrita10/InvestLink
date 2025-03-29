// src/pages/Categorias.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaLayerGroup } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Categorias = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const categorias = [
    {
      nombre: "Bienes Raíces",
      descripcion: "Inversiones en el sector inmobiliario y desarrollo de propiedades.",
    },
    {
      nombre: "Ganadería",
      descripcion: "Apoyo financiero a la producción y comercialización de ganado.",
    },
    {
      nombre: "Tecnología",
      descripcion: "Startups innovadoras y proyectos tecnológicos con alto potencial.",
    },
    {
      nombre: "Energía Renovable",
      descripcion: "Proyectos sostenibles de energías limpias y renovables.",
    },
    {
      nombre: "Salud y Bienestar",
      descripcion: "Empresas enfocadas en el sector médico y bienestar personal.",
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 px-4"
      >
        <h2 className="text-3xl font-bold mb-2">
          {t("Explora Categorías de Inversión")} 📂
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t("Selecciona una categoría para ver oportunidades disponibles.")}
        </p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder={t("Buscar categorías...")}
            className="p-3 w-96 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700 transition">
            🔍
          </button>
        </div>
      </motion.section>

      {/* Categorías */}
      <section className="px-10 pb-16">
        <h3 className="text-2xl font-bold mb-6">{t("Categorías Disponibles")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categorias.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex gap-4">
                <FaLayerGroup className="text-blue-500 text-3xl" />
                <div>
                  <h4 className="text-xl font-bold">{cat.nombre}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{cat.descripcion}</p>
                  <button className="w-full py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold">
                    {t("Ver Inversiones")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categorias;