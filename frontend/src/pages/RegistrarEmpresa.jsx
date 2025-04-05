import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; //eslint-disable-line no-unused-vars
import { useTranslation } from "react-i18next";
import { FaBuilding, FaEnvelope, FaLock, FaGlobe, FaPhone, FaTags, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RegistrarEmpresa = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    web: "",
    telefono: "",
    categoria: "",
    ubicacion: "",
    descripcionGeneral: "",
    fechaVinculacion: ""
  });

  const categorias = [
    "Tecnología",
    "Inmobiliaria / Bienes Raíces",
    "Ganadería",
    "Agricultura",
    "Energías Renovables",
    "Salud y Bienestar",
    "Educación",
    "Transporte y Logística",
    "Finanzas y Seguros",
    "Turismo y Hospitalidad",
    "Comercio Electrónico",
    "Alimentos y Bebidas",
    "Moda y Belleza",
    "Construcción e Infraestructura",
    "Entretenimiento y Medios",
    "Inteligencia Artificial / Big Data",
    "Ciberseguridad",
    "Servicios Profesionales",
    "Minería",
    "Otros",
  ];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const empresasGuardadas = JSON.parse(localStorage.getItem("empresas")) || [];

    const nuevaEmpresa = {
      id: Date.now(),
      ...formData,
      fechaVinculacion: new Date().toISOString().split("T")[0]
    };

    const nuevasEmpresas = [...empresasGuardadas, nuevaEmpresa];
    localStorage.setItem("empresas", JSON.stringify(nuevasEmpresas));
    localStorage.setItem("empresaLogueada", JSON.stringify(nuevaEmpresa));

    navigate(`/perfil-empresa/${nuevaEmpresa.id}`);
  };

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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center border rounded px-3 py-2">
              <FaBuilding className="text-blue-500 mr-3" />
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder={t("Nombre de la Empresa")}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaEnvelope className="text-blue-500 mr-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("Correo Electrónico")}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaLock className="text-blue-500 mr-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("Contraseña")}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaGlobe className="text-blue-500 mr-3" />
              <input
                type="text"
                name="web"
                value={formData.web}
                onChange={handleChange}
                placeholder={t("Sitio Web de la Empresa")}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaPhone className="text-blue-500 mr-3" />
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder={t("Número de Teléfono")}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            {/* Categoría de la empresa */}
            <div className="flex items-center border rounded px-3 py-2">
              <FaTags className="text-blue-500 mr-3" />
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
                required
              >
                <option value="">{t("Seleccione una categoría...")}</option>
                {categorias.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaGlobe className="text-blue-500 mr-3" />
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                placeholder={t("Ubicación de la Empresa")}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaCalendarAlt className="text-blue-500 mr-3" />
              <input
                type="text"
                name="fechaVinculacion"
                value={new Date().toISOString().split("T")[0]}
                readOnly
                className="w-full bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaInfoCircle className="text-blue-500 mr-3" />
              <textarea
                name="descripcionGeneral"
                value={formData.descripcionGeneral}
                onChange={handleChange}
                placeholder={t("Descripción General de la Empresa")}
                className="w-full bg-transparent focus:outline-none"
                rows={3}
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