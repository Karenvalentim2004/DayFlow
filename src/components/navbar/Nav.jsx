import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./Nav.css";

const Nav = () => {
  const [isClosed, setIsClosed] = useState(true);
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  const getInitials = (nome) => {
    if (!nome) return "";
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleShort = (role) => {
    const roles = {
      medico: "MED",
      paciente: "PAC",
      recepcionista: "RECEP",
      enfermeiro: "ENF",
    };
    return roles[role] || "";
  };

  return (
    <nav className={`sidebar ${isClosed ? "close" : ""}`}>

      <header>
        <div className="image-text">
          <span className="image">
            <img src="/logo.png" alt="logo" />
          </span>

          <div className="text header-text">
            <span className="name">SIGPS</span>
            <span className="titulo">Posto de Saúde</span>
          </div>
        </div>

        {/* Usuário logado */}
        <div className="user-info">
          <div className="avatar">
            {getInitials(user?.nome)}
          </div>

          {!isClosed && (
            <>
              <span className="full-name">{user?.nome}</span>
              <small className="role">{user?.identificar}</small>
            </>
          )}

          {isClosed && (
            <small className="role-short">
              {getRoleShort(user?.identificar)}
            </small>
          )}
        </div>

        <i
          className="bx bx-chevron-right toggle"
          onClick={() => setIsClosed(!isClosed)}
        />
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i className="bx bx-search icon" />
            {!isClosed && (
              <input type="search" placeholder="Pesquisar..." />
            )}
          </li>

          <ul className="menu-links">

            {/* DASHBOARD - todos */}
            <li className="nav-link">
              <Link to="/dashboard">
                <i className="bx bx-home-alt icon" />
                <span className="text nav-text">Dashboard</span>
              </Link>
            </li>

            {/* PACIENTES - recepcionista */}
            {user?.identificar === "recepcionista" && (
              <li className="nav-link">
                <Link to="/pacientes">
                  <i className="bx bx-user icon" />
                  <span className="text nav-text">Pacientes</span>
                </Link>
              </li>
            )}

            {/* AGENDAMENTOS - recepcionista e paciente */}
            {(user?.identificar === "recepcionista" || user?.identificar === "paciente") && (
              <li className="nav-link">
                <Link to="/agendamentos">
                  <i className="bx bx-calendar icon" />
                  <span className="text nav-text">Agendamentos</span>
                </Link>
              </li>
            )}

            {/* PRONTUÁRIOS - médico */}
            {user?.identificar === "medico" && (
              <li className="nav-link">
                <Link to="/prontuarios">
                  <i className="bx bx-file icon" />
                  <span className="text nav-text">Prontuários</span>
                </Link>
              </li>
            )}

            {/* RELATÓRIOS - profissionais */}
            {user?.identificar !== "paciente" && (
              <li className="nav-link">
                <Link to="/relatorios">
                  <i className="bx bx-bar-chart icon" />
                  <span className="text nav-text">Relatórios</span>
                </Link>
              </li>
            )}

          </ul>
        </div>

        <div className="bottom-content">
          <li className="nav-link" onClick={handleLogout}>
            <div className="logout">
              <i className="bx bx-log-out icon" />
              <span className="text nav-text">Sair</span>
            </div>
          </li>
        </div>

      </div>
    </nav>
  );
};

export default Nav;