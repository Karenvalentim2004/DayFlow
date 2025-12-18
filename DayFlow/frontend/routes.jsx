import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./src/contexts/AuthContext"; // Ajuste o caminho se necessário
import Login from "./src/pages/login/Login";
import Dashboard from "./src/pages/dashboard/Dashboard";

// Componente de Proteção
const PrivateRoute = ({ children }) => {
  const { signed } = useContext(AuthContext);
  // Se não estiver logado (signed: false), redireciona para o "/"
  return signed ? children : <Navigate to="/" />;
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rota Protegida */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        
        {/* Caso o usuário tente uma rota que não existe */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;