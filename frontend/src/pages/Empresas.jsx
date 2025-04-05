import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; //eslint-disable-line no-unused-vars
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaUsers,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const Empresas = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [empresasRegistradas, setEmpresasRegistradas] = useState([]);
  const [filtro, setFiltro] = useState("");

  const empresasBase = [
    {
      id: 1,
      name: "Inmobiliaria Expansión",
      category: "Bienes Raíces",
      investors: 120,
      description: "Empresa líder en desarrollo inmobiliario.",
    },
    {
      id: 2,
      name: "AgroGan S.A.",
      category: "Ganadería",
      investors: 95,
      description: "Innovación y crecimiento en el sector agropecuario.",
    },
    {
      id: 3,
      name: "TechFuture",
      category: "Tecnología",
      investors: 150,
      description:
        "TechFuture es una startup que desarrolla inteligencia artificial para la industria del comercio electrónico.",
    },
  ];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const data = localStorage.getItem("empresas");
    if (data) {
      const empresasLocal = JSON.parse(data);
      const formateadas = empresasLocal.map((empresa) => ({
        id: empresa.id,
        name: empresa.nombre,
        category: empresa.categoria || "Sin Categoría",
        investors: 0,
        description: empresa.web,
        esRegistrada: true,
      }));

      setEmpresasRegistradas(formateadas);
    }
  }, []);

  const todasEmpresas = [...empresasBase, ...empresasRegistradas];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col justify-between">
      <Navbar
        darkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Banner de acceso para empresas */}
      <div className="bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-white py-2 px-4 text-sm text-center shadow-sm">
        ¿Eres una empresa?{" "}
        <Link to="/login" className="underline hover:text-blue-900 dark:hover:text-blue-300">Inicia sesión</Link> o{" "}
        <Link to="/registrarempresa" className="underline hover:text-blue-900 dark:hover:text-blue-300">regístrate</Link>.
      </div>

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
          {t(
            "Encuentra empresas en las que puedas invertir o con las que puedas colaborar."
          )}
        </p>

        {/* Buscador */}
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder={t("Buscar empresas o sectores...")}
            className="p-3 w-96 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700 transition">
            🔍
          </button>
        </div>

        {/* Filtros de categoría */}
        <div className="mt-4 flex justify-center flex-wrap gap-3">
          {["Bienes Raíces", "Ganadería", "Tecnología", "Energía Renovable", "Salud y Bienestar"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                filtro === cat
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Botón para limpiar filtro */}
          {filtro && (
            <button
              onClick={() => setFiltro("")}
              className="px-4 py-2 border rounded-full text-sm font-medium transition hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400"
            >
              {t("Quitar Filtro")}
            </button>
          )}

          {/* Botón para mostrar más categorías (no funcional aún, solo visual) */}
          <button
            onClick={() => alert("Aquí puedes implementar lógica para mostrar más categorías.")}
            className="px-4 py-2 border rounded-full text-sm font-medium transition hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-300"
          >
            {t("Ver más categorías")}
          </button>
        </div>
      </motion.section>

      {/* Listado de Empresas */}
      <>
      <section className="px-10 pb-10 flex-grow">
        <h3 className="text-2xl font-bold mb-6">{t("Empresas Registradas")}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {todasEmpresas
            .filter((company) =>
              company.name.toLowerCase().includes(filtro.toLowerCase()) ||
              company.category.toLowerCase().includes(filtro.toLowerCase())
            )
            .map((company) => (
              <motion.div
                key={company.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400 font-semibold text-lg">
                  <FaBuilding />
                  {company.name}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {company.category}
                </p>
                <p className="text-sm flex items-center gap-2 text-gray-500 mt-1">
                  <FaUsers /> {company.investors} inversionistas
                </p>
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                  {company.description}
                </p>

                <Link
                  to={
                    company.esRegistrada
                      ? `/perfil-empresa/${company.id}`
                      : `/empresa/${company.id}`
                  }
                >
                  <button className="w-full mt-4 border rounded px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition">
                    {t("Ver Perfil")}
                  </button>
                </Link>
              </motion.div>
            ))}
        </div>
      </section>
      </>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} InvestLink. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-6 mt-3 text-lg">
          <a href="#" className="hover:text-blue-400 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <FaLinkedinIn />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Empresas;