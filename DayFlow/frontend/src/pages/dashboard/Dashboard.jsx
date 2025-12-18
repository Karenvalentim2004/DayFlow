import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Nav from "../../components/navbar/Nav";

const Dashboard = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/"); 
  };

  return (
    
    <div>
      <Nav />
      <h1>Dashboard</h1>
      <button onClick={handleLogout} className="btn" style={{ background: "#ff4d4d", width: "150px", marginTop: "20px" }}>
        Sair

      </button>
    </div>
   
  );
};

export default Dashboard;