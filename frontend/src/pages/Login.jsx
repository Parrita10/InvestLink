import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("empresa");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (accountType === "empresa") {
      const storedEmpresas = JSON.parse(localStorage.getItem("empresas")) || [];
      const empresa = storedEmpresas.find(
        (e) => e.email === email && e.password === password
      );

      if (empresa) {
        localStorage.setItem("empresaLogueada", JSON.stringify(empresa));
        navigate(`/perfil-empresa/${empresa.id}`);
      } else {
        setLoginError("Credenciales inválidas para empresa");
      }
    } else if (accountType === "inversionista") {
      const storedInversionistas = JSON.parse(localStorage.getItem("usuarios")) || [];
      console.log("Inversionistas guardados:", storedInversionistas);
      const inversionista = storedInversionistas.find(
        (inv) =>
          inv.email?.trim().toLowerCase() === email.trim().toLowerCase() &&
          inv.password === password &&
          inv.rol === "inversionista"
      );

      if (inversionista) {
        localStorage.setItem("inversionistaLogueado", JSON.stringify(inversionista));
        navigate(`/perfil-inversionista/${inversionista.id}`);
      } else {
        console.log("Email ingresado:", email.trim().toLowerCase());
        console.log("Usuarios almacenados:", storedInversionistas);
        setLoginError("Credenciales inválidas para inversionista");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="flex-grow flex justify-center items-center py-10">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-1">InvestLink</h1>
          <h2 className="text-2xl font-bold text-center mb-1">{t("Iniciar Sesión")}</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            {t("Selecciona tu tipo de cuenta e ingresa tus credenciales.")}
          </p>
          {loginError && (
            <div className="text-red-600 text-center font-medium mb-4">
              {loginError}
            </div>
          )}

          <div className="text-center mb-4">
            <p className="text-lg font-semibold text-blue-700">
              {accountType === "empresa" ? "Ingreso para Empresas" : "Ingreso para Inversionistas"}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="flex items-center gap-2 border rounded px-3 py-2">
              <FaEnvelope className="text-blue-600" />
              <input
                type="email"
                placeholder={t("Correo Electrónico")}
                className="w-full bg-transparent outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 border rounded px-3 py-2">
              <FaLock className="text-blue-600" />
              <input
                type="password"
                placeholder={t("Contraseña")}
                className="w-full bg-transparent outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 border rounded px-3 py-2">
              <FaUser className="text-blue-600" />
              <select
                className="w-full bg-transparent outline-none"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="empresa">{t("Soy Empresa")}</option>
                <option value="inversionista">{t("Soy Inversionista")}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              {t("Iniciar Sesión")}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            {t("¿No tienes cuenta?")}&nbsp;
            <Link
              to={accountType === "empresa" ? "/registrarempresa" : "/registrarinversionista"}
              className="text-blue-600 font-semibold hover:underline"
            >
              {t("Regístrate")}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;