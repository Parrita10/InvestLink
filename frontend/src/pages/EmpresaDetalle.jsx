import React from "react";
import { useParams, Link } from "react-router-dom";
import { companies } from "../data/companies";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion"; //eslint-disable-line no-unused-vars
import { FaUserFriends } from "react-icons/fa";

const EmpresaDetalle = () => {
  const { id } = useParams();
  const empresa = companies.find((comp) => comp.id === parseInt(id));

  if (!empresa) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center">
        <p className="text-2xl font-bold text-red-600">Empresa no encontrada</p>
      </div>
    );
  }

  const progreso = (empresa.raised / empresa.goal) * 100;

  // Función para convertir el nombre del plan a una ruta
  // Convierte a slug seguro (sin tildes ni espacios)
    const generarRutaPlan = (nombrePlan) => {
        return `/plan/${nombrePlan
            .toLowerCase()
            .normalize("NFD") // separa letras de acentos
            .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
            .replace(/\s+/g, "")}`;
    };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navbar />

      <main className="max-w-5xl mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md"
        >
          {/* Info general */}
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">{empresa.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{empresa.category}</p>
          <p className="mt-2 text-gray-700 dark:text-gray-400">{empresa.description}</p>
          <div className="flex items-center mt-4 text-sm text-gray-600 dark:text-gray-300">
            <FaUserFriends className="mr-2" />
            {empresa.investors} inversionistas
          </div>

          {/* Progreso */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Progreso de Inversión</h2>
            <p>Meta: ${empresa.goal.toLocaleString()}</p>
            <p>Recaudado: ${empresa.raised.toLocaleString()}</p>
            <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded mt-2">
              <div
                className="bg-blue-900 h-4 rounded transition-all duration-500"
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
          </div>

          {/* Planes */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Planes de Inversión</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {empresa.plans.map((plan, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow"
                >
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p>Mínimo: ${plan.minimum}</p>
                  <p>ROI: {plan.roi}</p>

                  <Link to={generarRutaPlan(plan.name)}>
                    <button className="mt-4 w-full border border-gray-400 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                      Invertir en este plan
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default EmpresaDetalle;