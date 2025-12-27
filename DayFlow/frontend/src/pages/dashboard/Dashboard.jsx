import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Nav from "../../components/navbar/Nav";

const Dashboard = () => {
  return (
    
    <div>
      <Nav />
      <h1>Dashboard</h1>
    </div>
   
  );
};

export default Dashboard;