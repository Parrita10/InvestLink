import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSun, FaMoon } from "react-icons/fa";


const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { t, i18n } = useTranslation();
  const usuarioInversionista = JSON.parse(localStorage.getItem("inversionistaLogueado"));
  const usuarioEmpresa = JSON.parse(localStorage.getItem("empresaLogueada"));
  const usuarioActivo = usuarioInversionista || usuarioEmpresa;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center px-10">
      {/* Logo que redirige al Home */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold text-blue-600 hover:underline dark:text-white">
          InvestLink
        </span>
      </Link>

      {/* Menú de navegación */}
      <ul className="flex gap-6 text-gray-700 dark:text-gray-200 font-medium">
        {[
          { path: "/", label: t("Inicio") },
          { path: "/empresas", label: t("Empresas") },
          { path: "/invertir", label: t("Invertir") },
          { path: "/categorias", label: t("Categorías") },
          { path: "/contacto", label: t("Contacto") },
        ].map((item, i) => (
          <li key={i}>
            <Link
              to={item.path}
              className="relative hover:text-blue-600 transition duration-200 after:block after:h-[2px] after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Modo oscuro e idioma */}
      <div className="flex items-center gap-3">
        {usuarioActivo && (
          <div className="flex items-center gap-4 mr-4">
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              {t("Hola")}, {usuarioActivo.nombre} ({usuarioInversionista ? "Inversionista" : "Empresa"})
            </span>
            <button
              onClick={() => {
                localStorage.removeItem("inversionistaLogueado");
                localStorage.removeItem("empresaLogueada");
                window.location.href = "/";
              }}
              className="text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              {t("Cerrar sesión")}
            </button>
          </div>
        )}
        <button
          onClick={toggleDarkMode}
          className="text-xl text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <button
          onClick={() => i18n.changeLanguage("es")}
          className="text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition shadow-sm"
        >
          ES
        </button>
        <button
          onClick={() => i18n.changeLanguage("en")}
          className="text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition shadow-sm"
        >
          EN
        </button>
      </div>
    </nav>
  );
};

export default Navbar;