import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBuilding
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RegistrarInversionista = () => {
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
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar darkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <main className="flex-grow flex flex-col items-center justify-center py-10 px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">InvestLink</h1>
        <h2 className="text-2xl font-bold mb-2">
          {t("Regístrate en InvestLink")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md text-center">
          {t("Completa el formulario para comenzar a invertir o registrar tu empresa.")}
        </p>

        <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
          <div className="flex items-center border rounded px-3 mb-4">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder={t("Nombre Completo")}
              className="w-full p-2 bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 mb-4">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder={t("Correo Electrónico")}
              className="w-full p-2 bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 mb-4">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder={t("Contraseña")}
              className="w-full p-2 bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 mb-6">
            <FaBuilding className="text-gray-400 mr-2" />
            <select className="w-full p-2 bg-transparent focus:outline-none">
              <option>{t("Soy Inversionista")}</option>
              <option>{t("Soy Empresa")}</option>
            </select>
          </div>

          <button className="bg-blue-600 text-white w-full py-2 rounded font-semibold hover:bg-blue-700 transition">
            {t("Registrarse")}
          </button>

          <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-300">
            {t("¿Ya tienes cuenta?")}{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              {t("Inicia sesión")}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegistrarInversionista;