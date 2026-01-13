import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./src/contexts/AuthContext";

import Login from "./src/pages/login/Login";
import Dashboard from "./src/pages/dashboard/Dashboard";
import Tarefas from "./src/pages/tarefas/Tarefas";
import Financeiro from "./src/pages/financeiro/Financeiro";

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

        {/* Minhas Tarefas */}
        <Route
          path="/tarefas"
          element={
            <PrivateRoute>
              <Tarefas />
            </PrivateRoute>
          }
        />

        {/* Financeiro */}
        <Route
          path="/financeiro"
          element={
            <PrivateRoute>
              <Financeiro />
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
