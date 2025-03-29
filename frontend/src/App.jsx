import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Empresas from "./pages/Empresas";
import Invertir from "./pages/Invertir";
import Categorias from "./pages/Categorias";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import RegistrarInversionista from "./pages/RegistrarInversionista";
import RegistrarEmpresa from "./pages/RegistrarEmpresa";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/empresas" element={<Empresas />} />
      <Route path="/invertir" element={<Invertir />} />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrarempresa" element={<RegistrarEmpresa />} />
      <Route path="/registrarInversionista" element={<RegistrarInversionista />} />

    </Routes>
  );
}

export default App;