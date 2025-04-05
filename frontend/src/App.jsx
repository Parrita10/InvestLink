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
import EmpresaDetalle from "./pages/EmpresaDetalle";
import PlanBasico from "./pages/PlanBasico";
import PlanAvanzado from "./pages/PlanAvanzado";
import PerfilEmpresa from "./pages/PerfilEmpresa";
import PerfilInversionista from "./pages/PerfilInversionista";

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
      <Route path="/empresa/:id" element={<EmpresaDetalle />} />
      <Route path="/plan/planbasico" element={<PlanBasico />} />
      <Route path="/plan/planpremium" element={<PlanAvanzado />} />
      <Route path="/perfil-empresa/:id" element={<PerfilEmpresa />} />
      <Route path="/perfil-inversionista/:id" element={<PerfilInversionista />} />
    
      


    </Routes>
  );
}

export default App;