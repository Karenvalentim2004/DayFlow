import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/"); // Volta para o login
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Poppins" }}>
      <h1>Dashboard</h1>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "15px", display: "inline-block", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <img src={user?.picture} alt="Perfil" style={{ borderRadius: "50%", width: "100px" }} />
        <h2>Bem-vindo, {user?.name}!</h2>
        <p>Email: {user?.email}</p>
        <button onClick={handleLogout} className="btn" style={{ background: "#ff4d4d", width: "150px", marginTop: "20px" }}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Dashboard;