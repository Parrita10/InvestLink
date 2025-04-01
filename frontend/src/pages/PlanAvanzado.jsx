import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PlanAvanzado = () => {
  const meta = 500000;
  const recaudado = 350000;
  const progreso = (recaudado / meta) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <main className="flex-grow px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">Plan Avanzado</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Este plan ofrece una rentabilidad competitiva en el sector tecnológico con un enfoque en empresas emergentes.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Progreso de Financiamiento</h2>
          <p>Meta de financiamiento: ${meta.toLocaleString()}</p>
          <p>Fondos recaudados: ${recaudado.toLocaleString()}</p>
          <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded mt-2">
            <div
              className="bg-blue-900 h-4 rounded transition-all duration-500"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Beneficios del Plan</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
            <li>Rentabilidad estable y garantizada</li>
            <li>Diversificación de cartera</li>
            <li>Acceso a reportes trimestrales</li>
          </ul>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition">
            Invertir Ahora
          </button>
          <button className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            Más Información
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlanAvanzado;