import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const PerfilInversionista = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [sesionActiva, setSesionActiva] = useState(false);
  const [editando, setEditando] = useState(false);
  const [datosEditados, setDatosEditados] = useState({
    nombre: "",
    email: "",
    celular: ""
  });

  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("inversionistaLogueado"));
    if (sesion && String(sesion.id) === String(id)) {
      setSesionActiva(true);
      setUsuario(sesion);
      setDatosEditados({
        nombre: sesion.nombre || "",
        email: sesion.email || "",
        celular: sesion.celular || ""
      });
    }
  }, [id]);

  const handleGuardarCambios = (e) => {
    e.preventDefault();
    const confirmacion = confirm("¿Seguro que quieres guardar los cambios?");
    if (!confirmacion) return;

    const inversionistas = JSON.parse(localStorage.getItem("usuarios")) || [];
    const actualizados = inversionistas.map((u) =>
      String(u.id) === String(id) ? { ...u, ...datosEditados } : u
    );

    localStorage.setItem("usuarios", JSON.stringify(actualizados));
    localStorage.setItem("inversionistaLogueado", JSON.stringify({ ...usuario, ...datosEditados }));
    setUsuario({ ...usuario, ...datosEditados });
    setEditando(false);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("inversionistaLogueado");
    window.location.href = "/";
  };

  if (!usuario) {
    return null;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar darkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <main className="flex-grow max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Perfil del Inversionista
        </h1>

        {location.state?.desdeRegistro && (
          <div className="text-green-600 text-center font-medium mt-4">
            👋 Bienvenido(a), {usuario.nombre}!
          </div>
        )}

        {sesionActiva && (
          <div className="flex justify-between items-center mb-4">
            <p className="bg-green-100 text-green-700 px-4 py-2 rounded shadow">
              ✅ Sesión activa como: <span className="font-semibold">{usuario.nombre}</span>
            </p>
            <button
              onClick={handleCerrarSesion}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cerrar sesión
            </button>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
          <div className="flex items-center gap-3">
            <FaUser className="text-blue-500 text-2xl" />
            <span className="text-lg font-semibold">{usuario.nombre}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-500 text-2xl" />
            <span>{usuario.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-blue-500 text-2xl" />
            <span>{usuario.celular || "No especificado"}</span>
          </div>

          {sesionActiva && !editando && (
            <button
              onClick={() => setEditando(true)}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Editar Información
            </button>
          )}
        </div>

        {sesionActiva && editando && (
          <form
            onSubmit={handleGuardarCambios}
            className="bg-white dark:bg-gray-800 mt-6 p-6 rounded-xl shadow space-y-4"
          >
            <h2 className="text-xl font-bold text-center mb-4">Editar Datos</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={datosEditados.nombre}
              onChange={(e) => setDatosEditados({ ...datosEditados, nombre: e.target.value })}
              className="w-full px-4 py-2 rounded border"
              required
            />
            <input
              type="email"
              placeholder="Correo"
              value={datosEditados.email}
              onChange={(e) => setDatosEditados({ ...datosEditados, email: e.target.value })}
              className="w-full px-4 py-2 rounded border"
              required
            />
            <input
              type="text"
              placeholder="Celular"
              value={datosEditados.celular}
              onChange={(e) => setDatosEditados({ ...datosEditados, celular: e.target.value })}
              className="w-full px-4 py-2 rounded border"
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setEditando(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PerfilInversionista;
