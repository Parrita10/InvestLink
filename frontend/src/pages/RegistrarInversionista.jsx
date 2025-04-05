import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBuilding,
  FaPhone
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RegistrarInversionista = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    celular: "",
    rol: "inversionista"
  });
  const navigate = useNavigate();

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
          {t("Registro como Inversionista")}
        </h2>
        <p className="text-sm font-medium text-blue-600 mb-2">🧾 Registro de Inversionista</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {t("Este formulario es exclusivo para personas que desean invertir en proyectos.")}
        </p>

        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md text-center">
          {t("Completa el formulario para comenzar a invertir o registrar tu empresa.")}
        </p>

        <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
          <div className="flex items-center border rounded px-3 mb-4">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder={t("Nombre Completo")}
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full p-2 bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 mb-4">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder={t("Correo Electrónico")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 mb-4">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder={t("Contraseña")}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 mb-4">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              placeholder={t("Celular (opcional)")}
              value={formData.celular}
              onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
              className="w-full p-2 bg-transparent focus:outline-none"
            />
          </div>

          <button
            className="bg-blue-600 text-white w-full py-2 rounded font-semibold hover:bg-blue-700 transition"
            onClick={() => {
              const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
              const existe = usuarios.some(u => u.email === formData.email);
              if (existe) {
                alert("Este correo ya está registrado como inversionista.");
                return;
              }
              const id = Date.now();
              const nuevoUsuario = {
                id,
                ...formData,
                rol: "inversionista",
                fechaRegistro: new Date().toISOString()
              };
              usuarios.push(nuevoUsuario);
              localStorage.setItem("usuarios", JSON.stringify(usuarios));
              setRegistroExitoso(true);
              setFormData({ nombre: "", email: "", password: "", celular: "", rol: "inversionista" });
              setTimeout(() => {
                navigate(`/perfil-inversionista/${id}`, { replace: true, state: { desdeRegistro: true } });
              }, 2000);
            }}
          >
            {t("Registrarse")}
          </button>

          <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-300">
            {t("¿Ya tienes cuenta?")}{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              {t("Inicia sesión")}
            </Link>
          </p>
        </div>

        {registroExitoso && (
          <div className="text-green-600 text-center font-medium mb-4">
            ✅ Registro exitoso como inversionista.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RegistrarInversionista;