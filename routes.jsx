import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./src/contexts/AuthContext";

import Login from "./src/pages/login/Login";
import Dashboard from "./src/pages/dashboard/Dashboard";

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

        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
