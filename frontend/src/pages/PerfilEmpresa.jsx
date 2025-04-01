// src/pages/PerfilEmpresa.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBuilding, FaEnvelope, FaGlobe, FaPhone } from "react-icons/fa";

const PerfilEmpresa = () => {
  const { id } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: ""
  });

  // Obtener datos desde localStorage
  const empresas = JSON.parse(localStorage.getItem("empresas")) || [];
  const empresa = empresas.find((e) => String(e.id) === String(id));
  const empresaLogueada = JSON.parse(localStorage.getItem("empresaLogueada"));

  // Verificar si el usuario actual es el administrador
  const esAdministrador = empresaLogueada && String(empresaLogueada.id) === String(id);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const productosGuardados = JSON.parse(localStorage.getItem(`productos_${id}`)) || [];
    setProductos(productosGuardados);
  }, [id, isDarkMode]);

  const handleAgregarProducto = (e) => {
    e.preventDefault();

    if (!nuevoProducto.nombre.trim() || !nuevoProducto.descripcion.trim()) return;

    const actualizados = [...productos, nuevoProducto];
    setProductos(actualizados);
    localStorage.setItem(`productos_${id}`, JSON.stringify(actualizados));
    setNuevoProducto({ nombre: "", descripcion: "" });
  };

  if (!empresa) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center">
        <p className="text-2xl font-bold text-red-600">Empresa no encontrada</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar darkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <main className="flex-grow max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-8">
          InvestLink - Panel de Empresa
        </h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-8 text-center">
          <FaBuilding className="text-blue-500 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-blue-600">{empresa.nombre}</h2>
          <p className="flex items-center justify-center mt-2">
            <FaEnvelope className="mr-2 text-blue-500" /> {empresa.email}
          </p>
          <p className="flex items-center justify-center mt-1">
            <FaGlobe className="mr-2 text-blue-500" /> {empresa.web}
          </p>
          <p className="flex items-center justify-center mt-1">
            <FaPhone className="mr-2 text-blue-500" /> {empresa.telefono}
          </p>
        </div>

        <h3 className="text-xl font-bold mb-4 text-center">Productos y Servicios</h3>
        {productos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {productos.map((producto, index) => (
              <div key={index} className="bg-gray-200 dark:bg-gray-700 p-4 rounded">
                <h4 className="font-bold text-blue-600">{producto.nombre}</h4>
                <p>{producto.descripcion}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
            No hay productos registrados aún.
          </p>
        )}

        {/* Solo visible si el usuario es administrador de su perfil */}
        {esAdministrador && (
          <>
            <h3 className="text-lg font-bold mb-4 text-center">
              Agregar Nuevo Proyecto de Inversión
            </h3>
            <form
              onSubmit={handleAgregarProducto}
              className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4 mb-10"
            >
              <input
                type="text"
                placeholder="Nombre del Producto o Servicio"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                }
                className="w-full px-4 py-2 rounded border focus:outline-none"
                required
              />
              <textarea
                placeholder="Descripción"
                value={nuevoProducto.descripcion}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })
                }
                className="w-full px-4 py-2 rounded border focus:outline-none"
                rows={4}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
              >
                Agregar
              </button>
            </form>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PerfilEmpresa;