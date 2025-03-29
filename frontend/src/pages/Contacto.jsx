// src/pages/Contacto.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contacto = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Modo oscuro funcional
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navbar darkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      {/* Sección de encabezado */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 px-4"
      >
        <h2 className="text-3xl font-bold mb-2">
          {t("Contáctanos")} 📩
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("¿Tienes dudas o sugerencias? ¡Envíanos un mensaje y te responderemos pronto!")}
        </p>
      </motion.section>

      {/* Formulario de contacto */}
      <section className="px-4 max-w-2xl mx-auto mb-12">
        <form className="space-y-4">
          <input
            type="text"
            placeholder={t("Tu Nombre")}
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder={t("Tu Correo Electrónico")}
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows="5"
            placeholder={t("Tu Mensaje")}
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 transition"
          >
            {t("Enviar Mensaje")}
          </button>
        </form>
      </section>

      {/* Información de contacto */}
      <section className="text-center pb-16">
        <h3 className="text-xl font-bold mb-4">{t("Información de Contacto")}</h3>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p><FaEnvelope className="inline mr-2 text-blue-600" /> contacto@investlink.com</p>
          <p><FaPhoneAlt className="inline mr-2 text-blue-600" /> +123 456 7890</p>
          <p><FaMapMarkerAlt className="inline mr-2 text-blue-600" /> Calle Ficticia 123, Ciudad, País</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;