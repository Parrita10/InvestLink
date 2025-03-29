import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaChartLine, FaMoneyBillWave } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Invertir = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const inversiones = [
    {
      nombre: "Fondo Expansión",
      sector: "Bienes Raíces",
      rendimiento: "10% Anual",
      descripcion: "Inversión en proyectos inmobiliarios con alto rendimiento.",
    },
    {
      nombre: "AgroInversiones",
      sector: "Ganadería",
      rendimiento: "8% Anual",
      descripcion: "Apoya el crecimiento del sector agropecuario.",
    },
    {
      nombre: "TechVentures",
      sector: "Tecnología",
      rendimiento: "15% Anual",
      descripcion: "Startups innovadoras con alto potencial de escalabilidad.",
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 px-4"
      >
        <h2 className="text-3xl font-bold mb-2">
          {t("Explora Oportunidades de Inversión")} 💰
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t("Descubre inversiones en sectores estratégicos con alto rendimiento.")}
        </p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder={t("Buscar inversiones o sectores...")}
            className="p-3 w-96 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700 transition">
            🔍
          </button>
        </div>
      </motion.section>

      {/* Lista de Inversiones */}
      <section className="px-10 pb-16">
        <h3 className="text-2xl font-bold mb-6">
          {t("Inversiones Disponibles")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inversiones.map((inv, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <FaMoneyBillWave className="text-green-500 text-3xl" />
                <div>
                  <h4 className="text-xl font-bold">{inv.nombre}</h4>
                  <p className="text-gray-500 dark:text-gray-300">{inv.sector}</p>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <FaChartLine className="text-blue-500" />
                    <span>{inv.rendimiento}</span>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{inv.descripcion}</p>
                  <button className="mt-4 w-full py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold">
                    {t("Invertir Ahora")}
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

export default Invertir;