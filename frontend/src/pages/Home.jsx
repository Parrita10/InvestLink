import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Navbar from "../components/Navbar"; // Asegúrate de que la ruta sea correcta

const Home = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Aplica clase al HTML para modo oscuro
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <Navbar darkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-blue-100 dark:bg-blue-950 text-center p-10 rounded-md mx-10 mt-24"
      >
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">
          {t("Encuentra la mejor oportunidad de inversión 🚀")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {t("Explora empresas, descubre oportunidades y comienza a invertir hoy mismo.")}
        </p>
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            placeholder={t("Buscar empresas o categorías...")}
            className="p-3 w-96 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-3 rounded-r-md text-lg hover:bg-blue-700 transition">
            🔍
          </button>
        </div>
      </motion.section>

      {/* Empresas Destacadas */}
      <section className="p-10">
        <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">{t("Empresas Destacadas")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {[
            { name: "Inmobiliaria Expansión", category: "Bienes Raíces", investors: "🏢 120 inversionistas" },
            { name: "AgroGan S.A.", category: "Ganadería", investors: "🌾 95 inversionistas" },
            { name: "TechFuture", category: "Tecnología", investors: "💻 150 inversionistas" }
          ].map((company, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg hover:shadow-xl transition cursor-pointer"
            >
              <h4 className="text-lg font-bold text-blue-700 dark:text-blue-300">{company.name}</h4>
              <p className="text-gray-600 dark:text-gray-300">{company.category}</p>
              <p className="text-gray-500">{company.investors}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-100 dark:bg-blue-950 p-10 text-center rounded-md mx-10 mb-6">
        <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
          {t("Empieza a Invertir Hoy")}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {t("Únete a nuestra comunidad y accede a las mejores oportunidades de inversión.")}
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Link to="/registrarempresa">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              {t("Soy Empresa")}
            </motion.button>
          </Link>
          <Link to="/registrarInversionista">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-100 transition"
            >
              {t("Soy Inversionista")}
            </motion.button>
          </Link>
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

export default Home;