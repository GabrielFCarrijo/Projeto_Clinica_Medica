import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Perfil from "../pages/Perfi";
import Usuario from "../pages/Usuario"
import Consulta from "../pages/Consulta"
import Empresa from "../pages/Empresa";

import useAuth from "../hooks/useAuth";


function Logado({ Item }) {
  // Autenticação se está logado
  const { logado } = useAuth();

  return <Item />; // Apenas para testes
  return logado ? <Item /> : <Login />;
}

function RoutesApp() {

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/login" element={ <Login /> } />
          <Route path="/registrar" element={ <Register /> } />
          <Route path="/perfil" element={ <Logado Item={ Perfil } /> } />
          <Route path="/" element={ <Logado Item={ Home } /> } />
          <Route path="/usuario" element={ <Logado Item={ Usuario } /> } />
          <Route path="/consulta" element={ <Logado Item={ Consulta } /> } />
          <Route path="/empresa" element={ <Logado Item={ Empresa } /> } />

          <Route path="*" element={ <Login /> } />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );

}


export default RoutesApp;

