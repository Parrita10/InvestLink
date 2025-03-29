import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="flex-grow flex justify-center items-center py-10">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-1">InvestLink</h1>
          <h2 className="text-2xl font-bold text-center mb-1">{t("Iniciar Sesión")}</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            {t("Selecciona tu tipo de cuenta e ingresa tus credenciales.")}
          </p>

          <form className="space-y-4">
            <div className="flex items-center gap-2 border rounded px-3 py-2">
              <FaEnvelope className="text-blue-600" />
              <input
                type="email"
                placeholder={t("Correo Electrónico")}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-2 border rounded px-3 py-2">
              <FaLock className="text-blue-600" />
              <input
                type="password"
                placeholder={t("Contraseña")}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-2 border rounded px-3 py-2">
              <FaUser className="text-blue-600" />
              <select className="w-full bg-transparent outline-none">
                <option>{t("Soy Empresa")}</option>
                <option>{t("Soy Inversionista")}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              {t("Iniciar Sesión")}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            {t("¿No tienes cuenta?")}&nbsp;
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              {t("Regístrate")}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;