import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./src/contexts/AuthContext";

import Login from "./src/pages/login/Login";
import Dashboard from "./src/pages/dashboard/Dashboard";
import Pacientes from "./src/pages/pacientes/Pacientes";
import Agendamentos from "./src/pages/agendamentos/Agendamentos";
// import Prontuarios from "./src/pages/prontuarios/Prontuarios";
import Relatorios from "./src/pages/relatorios/Relatorios";

// Rota protegida
const PrivateRoute = ({ children }) => {
  const { signed } = useContext(AuthContext);
  return signed ? children : <Navigate to="/" />;
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route

          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Pacientes */}
        <Route
          path="/pacientes"
          element={
            <PrivateRoute>
              <Pacientes />
            </PrivateRoute>
          }
        />

        {/* Agendamentos */}
        <Route
          path="/agendamentos"
          element={
            <PrivateRoute>
              <Agendamentos />
            </PrivateRoute>
          }
        />

        {/* Relatórios */}
        {/* <Route
          path="/prontuarios"
          element={
            <PrivateRoute>
              <Prontuarios />
            </PrivateRoute>
          }
        /> */}

        {/* Relatórios */}
        <Route
          path="/relatorios"
          element={
            <PrivateRoute>
              <Relatorios />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
