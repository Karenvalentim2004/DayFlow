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

  return (
    <nav className={`sidebar ${isClosed ? "close" : ""}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="/logo.png" alt="logo" />
          </span>

          <div className="text header-text">
            <span className="name">DayFlow</span>
            <span className="profession">Organize seu dia</span>
          </div>
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
            <li className="nav-link">
              <Link to="/dashboard">
                <i className="bx bx-home-alt icon" />
                <span className="text nav-text">Home</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/tarefas">
                <i className="bx bx-calendar icon" />
                <span className="text nav-text">Minhas Tarefas</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/evolucao">
                <i className="bx bx-bar-chart-alt icon" />
                <span className="text nav-text">Evolução</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/notificacoes">
                <i className="bx bx-bell icon" />
                <span className="text nav-text">Notificações</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/financeiro">
                <i className="bx bx-wallet icon" />
                <span className="text nav-text">Financeiro</span>
              </Link>
            </li>

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
