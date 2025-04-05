import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBuilding, FaEnvelope, FaGlobe, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaBoxes } from "react-icons/fa";

const PerfilEmpresa = () => {
  const { id } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    valor: "",
    porcentajeGanancia: "",
    tiempoGanancia: ""
  });
  const [sesionActiva, setSesionActiva] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarFormularioEdicion, setMostrarFormularioEdicion] = useState(false);
  const [datosEmpresaEditados, setDatosEmpresaEditados] = useState({
    nombre: "",
    email: "",
    web: "",
    telefono: ""
  });

  const empresas = JSON.parse(localStorage.getItem("empresas")) || [];
  const empresa = empresas.find((e) => String(e.id) === String(id));
  const empresaLogueada = JSON.parse(localStorage.getItem("empresaLogueada"));
  const esAdministrador = empresaLogueada && empresaLogueada.id === empresa?.id;

  useEffect(() => {
    setSesionActiva(!!empresaLogueada);
    if (empresaLogueada && esAdministrador) {
      setDatosEmpresaEditados({
        nombre: empresa?.nombre || "",
        email: empresa?.email || "",
        web: empresa?.web || "",
        telefono: empresa?.telefono || ""
      });
    }
  }, [empresa?.nombre, empresa?.email, empresa?.web, empresa?.telefono, empresaLogueada, esAdministrador]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const productosGuardados = JSON.parse(localStorage.getItem(`productos_${id}`)) || [];
    setProductos(productosGuardados);
  }, [id, isDarkMode]);

  const handleCerrarSesion = () => {
    localStorage.removeItem("empresaLogueada");
    window.location.reload();
  };

  const handleAgregarProducto = (e) => {
    e.preventDefault();
    if (
      !nuevoProducto.nombre.trim() ||
      !nuevoProducto.descripcion.trim() ||
      !nuevoProducto.valor.trim() ||
      !nuevoProducto.porcentajeGanancia.trim() ||
      !nuevoProducto.tiempoGanancia.trim()
    ) return;

    const actualizados = [...productos, nuevoProducto];
    setProductos(actualizados);
    localStorage.setItem(`productos_${id}`, JSON.stringify(actualizados));
    setNuevoProducto({
      nombre: "",
      descripcion: "",
      valor: "",
      porcentajeGanancia: "",
      tiempoGanancia: ""
    });
    setMostrarFormulario(false);
  };

  const handleEliminarProducto = (index) => {
    const actualizados = productos.filter((_, i) => i !== index);
    setProductos(actualizados);
    localStorage.setItem(`productos_${id}`, JSON.stringify(actualizados));
  };

  const handleEditarProducto = (index) => {
    const producto = productos[index];
    const nuevoNombre = prompt("Editar nombre del producto:", producto.nombre);
    const nuevaDescripcion = prompt("Editar descripción del producto:", producto.descripcion);
    if (nuevoNombre && nuevaDescripcion) {
      const actualizados = [...productos];
      actualizados[index] = { nombre: nuevoNombre, descripcion: nuevaDescripcion };
      setProductos(actualizados);
      localStorage.setItem(`productos_${id}`, JSON.stringify(actualizados));
    }
  };
  
  const confirmDialog = (message) => {
    const modal = document.createElement("div");
    modal.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
  
    const dialog = document.createElement("div");
    dialog.className = "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-6 w-full max-w-md shadow-lg text-center";
  
    const text = document.createElement("p");
    text.textContent = message;
    text.className = "mb-6";
  
    const buttons = document.createElement("div");
    buttons.className = "flex justify-center gap-4";
  
    const yesButton = document.createElement("button");
    yesButton.textContent = "Sí";
    yesButton.className = "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded";
    yesButton.onclick = () => {
      document.body.removeChild(modal);
      modal.confirmed = true;
    };
  
    const noButton = document.createElement("button");
    noButton.textContent = "No";
    noButton.className = "bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded";
    noButton.onclick = () => {
      document.body.removeChild(modal);
      modal.confirmed = false;
    };
  
    buttons.appendChild(yesButton);
    buttons.appendChild(noButton);
    dialog.appendChild(text);
    dialog.appendChild(buttons);
    modal.appendChild(dialog);
    document.body.appendChild(modal);
  
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        if (!document.body.contains(modal)) {
          resolve(modal.confirmed);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true });
    });
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

      <div className="flex justify-end px-6 mt-4">
        {sesionActiva && (
          <button
            onClick={handleCerrarSesion}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm"
          >
            Cerrar sesión
          </button>
        )}
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          InvestLink - Panel de Empresa
        </h1>

        {sesionActiva && (
          <div className="mb-6 px-2 sm:px-0 flex flex-col items-center text-center relative">
            <p className="text-md bg-green-100 text-green-800 font-semibold px-6 py-2 rounded shadow">
              ✅ Sesión activa como: <span className="underline">{empresaLogueada?.nombre}</span>
            </p>
          </div>
        )}


        <div className="bg-white dark:bg-gray-800 px-6 py-10 rounded-2xl shadow-xl mb-12 w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Columna 1: Datos principales */}
            <div className="flex flex-col gap-3 text-left">
              <FaBuilding className="text-blue-500 text-5xl" />
              <h2 className="text-3xl font-bold text-blue-600">{empresa.nombre}</h2>
              <p className="text-base flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> {empresa.email}
              </p>
              <p className="text-base flex items-center gap-2">
                <FaGlobe className="text-blue-500" /> {empresa.web}
              </p>
              <p className="text-base flex items-center gap-2">
                <FaPhone className="text-blue-500" /> {empresa.telefono}
              </p>
              {esAdministrador && !mostrarFormularioEdicion && (
                <button
                  onClick={() => setMostrarFormularioEdicion(true)}
                  className="mt-4 bg-purple-600 text-white px-4 py-2 text-sm rounded hover:bg-purple-700 w-max"
                >
                  Editar Información
                </button>
              )}
            </div>

            {/* Columna 2: Datos adicionales alineados */}
            <div className="flex flex-col justify-start gap-4 text-sm text-left mt-24">
              <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" /> <strong>Ubicación:</strong> {empresa.ubicacion || "No especificada"}
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" /> <strong>Fecha de vinculación:</strong> {empresa.fechaVinculacion || "No registrada"}
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaUsers className="text-blue-500" /> <strong>Inversionistas:</strong> {empresa.inversionistas || 0}
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaBoxes className="text-blue-500" /> <strong>Servicios Disponibles:</strong> {productos.length}
              </p>
            </div>

            {/* Columna 3: Imagen centrada */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden shadow-md border border-gray-300">
                {empresa?.imagenPerfil ? (
                  <img
                    src={empresa.imagenPerfil}
                    alt="Logo Empresa"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/default-avatar.png"
                    alt="Silueta Empresa"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {esAdministrador && (
                <label className="bg-blue-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-blue-700 text-xs">
                  Subir Foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const archivo = e.target.files[0];
                      if (archivo) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const nuevasEmpresas = empresas.map((e) =>
                            String(e.id) === String(id)
                              ? { ...e, imagenPerfil: reader.result }
                              : e
                          );
                          localStorage.setItem("empresas", JSON.stringify(nuevasEmpresas));
                          if (empresaLogueada?.id === empresa?.id) {
                            localStorage.setItem(
                              "empresaLogueada",
                              JSON.stringify({ ...empresaLogueada, imagenPerfil: reader.result })
                            );
                          }
                          window.location.reload();
                        };
                        reader.readAsDataURL(archivo);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {esAdministrador && mostrarFormularioEdicion && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const confirmar = await confirmDialog("¿Seguro que quieres guardar los cambios?");
              if (!confirmar) return;
              const nuevasEmpresas = empresas.map((e) =>
                String(e.id) === String(id) ? { ...e, ...datosEmpresaEditados } : e
              );
              localStorage.setItem("empresas", JSON.stringify(nuevasEmpresas));
              if (empresaLogueada && String(empresaLogueada.id) === String(id)) {
                localStorage.setItem("empresaLogueada", JSON.stringify({ ...empresaLogueada, ...datosEmpresaEditados }));
              }
              setMostrarFormularioEdicion(false);
              window.location.reload();
            }}
            className="bg-white dark:bg-gray-800 px-10 py-8 rounded-2xl shadow-xl mb-10 w-full max-w-7xl mx-auto"
          >
            <h3 className="text-xl font-bold mb-6 text-center">Editar Información de la Empresa</h3>
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm text-gray-700 dark:text-gray-300">
                Nombre de la empresa:
              </label>
              <input
                type="text"
                value={datosEmpresaEditados.nombre}
                onChange={(e) =>
                  setDatosEmpresaEditados({ ...datosEmpresaEditados, nombre: e.target.value })
                }
                className="w-full px-4 py-3 rounded border focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm text-gray-700 dark:text-gray-300">
                Correo electrónico:
              </label>
              <input
                type="email"
                value={datosEmpresaEditados.email}
                onChange={(e) =>
                  setDatosEmpresaEditados({ ...datosEmpresaEditados, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded border focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm text-gray-700 dark:text-gray-300">
                Página web:
              </label>
              <input
                type="text"
                value={datosEmpresaEditados.web}
                onChange={(e) =>
                  setDatosEmpresaEditados({ ...datosEmpresaEditados, web: e.target.value })
                }
                className="w-full px-4 py-3 rounded border focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm text-gray-700 dark:text-gray-300">
                Teléfono:
              </label>
              <input
                type="text"
                value={datosEmpresaEditados.telefono}
                onChange={(e) =>
                  setDatosEmpresaEditados({ ...datosEmpresaEditados, telefono: e.target.value })
                }
                className="w-full px-4 py-3 rounded border focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold text-sm text-gray-700 dark:text-gray-300">
                Ubicación:
              </label>
            <input
                type="text"
                defaultValue={empresa.ubicacion}
                onChange={(e) =>
                  setDatosEmpresaEditados({ ...datosEmpresaEditados, ubicacion: e.target.value })
                }
                className="w-full px-4 py-3 rounded border focus:outline-none"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setMostrarFormularioEdicion(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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

        <h3 className="text-2xl font-bold mb-6 text-center">Productos y Servicios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14 px-4">
          {productos.length > 0 ? (
            productos.map((producto, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 px-6 py-6 rounded-xl shadow-md">
                <h4 className="text-lg font-bold text-blue-600">{producto.nombre}</h4>
                <p className="mt-1">{producto.descripcion}</p>
                <p className="text-sm mt-2">💰 Valor: ${producto.valor}</p>
                <p className="text-sm">📈 Ganancia estimada: {producto.porcentajeGanancia}%</p>
                <p className="text-sm">⏳ Tiempo estimado: {producto.tiempoGanancia}</p>
                {esAdministrador && (
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => handleEditarProducto(index)}
                      className="text-sm px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminarProducto(index)}
                      className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 col-span-3">
              No hay productos registrados aún.
            </p>
          )}
        </div>

        {esAdministrador && (
          <div className="text-center mb-10">
            {!mostrarFormulario ? (
              <button
                onClick={() => setMostrarFormulario(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold"
              >
                Agregar servicio
              </button>
            ) : (
              <form
                onSubmit={handleAgregarProducto}
                className="bg-white dark:bg-gray-800 px-12 py-10 rounded-2xl shadow-xl max-w-7xl mx-auto mt-6"
              >
                <h3 className="text-xl font-bold mb-4 text-center">Nuevo Proyecto de Inversión</h3>
                {[
                  { name: "nombre", placeholder: "Nombre del producto o servicio" },
                  { name: "descripcion", type: "textarea", placeholder: "Descripción del proyecto" },
                  { name: "valor", placeholder: "Valor de inversión (USD)" },
                  { name: "porcentajeGanancia", placeholder: "Porcentaje de ganancia estimado (%)" },
                  { name: "tiempoGanancia", placeholder: "Tiempo estimado para ganancias" },
                ].map((input, i) => (
                  <div key={i} className="mb-4">
                    {input.type === "textarea" ? (
                      <textarea
                        placeholder={input.placeholder}
                        value={nuevoProducto[input.name]}
                        onChange={(e) =>
                          setNuevoProducto({ ...nuevoProducto, [input.name]: e.target.value })
                        }
                        rows={4}
                        className="w-full px-4 py-2 rounded border focus:outline-none"
                        required
                      />
                    ) : (
                      <input
                        type={input.name === "valor" ? "number" : "text"}
                        placeholder={input.placeholder}
                        value={nuevoProducto[input.name]}
                        onChange={(e) =>
                          setNuevoProducto({ ...nuevoProducto, [input.name]: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded border focus:outline-none"
                        required
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
                >
                  Agregar
                </button>
              </form>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PerfilEmpresa;