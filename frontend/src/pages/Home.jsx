import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; //eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { companies as defaultCompanies } from "../data/companies";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Home = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [combinedCompanies, setCombinedCompanies] = useState([]);
  const [mounted, setMounted] = useState(false);

  // Slider (solo se inicializa cuando mounted = true)
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 16,
        },
      },
    },
  });

  useEffect(() => {
    if (!slider) return;
    const interval = setInterval(() => {
      slider.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, [slider]);

  useEffect(() => {
    const localCompanies = JSON.parse(localStorage.getItem("empresas")) || [];
    const formatted = localCompanies.map((e) => ({
      name: e.nombre,
      category: "Empresa registrada",
      investors: "✨ Nueva empresa",
    }));
    setCombinedCompanies([...defaultCompanies, ...formatted]);
  }, []);

  // Activar "mounted" solo cuando las tarjetas estén listas
  useEffect(() => {
    if (combinedCompanies.length > 0) {
      setMounted(true);
    }
  }, [combinedCompanies]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navbar darkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      {/* Hero */}
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
      <section className="relative p-10">
        <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">
          {t("Empresas Destacadas")}
        </h3>

        {mounted && (
          <div className="relative group">
            {/* Botón Izquierdo */}
            <button
              onClick={() => slider.current?.prev()}
              className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 z-10 opacity-0 group-hover:opacity-100 transition hover:bg-blue-700"
            >
              <FaAngleLeft size={20} />
            </button>

            {/* Slider */}
            <div ref={sliderRef} className="keen-slider">
              {combinedCompanies.map((company, index) => (
                <div key={index} className="keen-slider__slide">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md h-full transition min-h-[150px]"
                  >
                    <h4 className="text-lg font-bold text-blue-700 dark:text-blue-300 truncate">
                      {company.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">{company.category}</p>
                    <p className="text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
                      {typeof company.investors === "number"
                        ? `👥 ${company.investors} inversionistas`
                        : company.investors}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Botón Derecho */}
            <button
              onClick={() => slider.current?.next()}
              className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 z-10 opacity-0 group-hover:opacity-100 transition hover:bg-blue-700"
            >
              <FaAngleRight size={20} />
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
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
          <Link to="/register">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-100 transition"
            >
              {t("Soy Inversionista")}
            </motion.button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;