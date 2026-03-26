import { useState, useContext, useEffect } from "react";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [isActive, setIsActive] = useState(false);

  // LOGIN
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  // CADASTRO
  const [nome, setNome] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signIn, signed } = useContext(AuthContext);

  useEffect(() => {
    if (signed) {
      navigate("/dashboard");
    }
  }, [signed, navigate]);

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email: emailLogin,
        senha: passwordLogin
      });

      localStorage.setItem("token", response.data.token);
      signIn(response.data.user);

      navigate("/dashboard");

    } catch (error) {
      console.log(error.response?.data);
      setError("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  // CADASTRO
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/register", {
        nome,
        email: emailRegister,
        senha: passwordRegister,
        identificar: role
      });

      console.log(response.data.user);
      alert("Usuário cadastrado com sucesso!");

      // limpa campos
      setNome("");
      setEmail("");
      setPassword("");
      setRole("");

      setIsActive(false);

    } catch (error) {
      console.log(error.response?.data);
      alert("Erro ao cadastrar");
    }
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`}>

      {/* LOGIN */}
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Senha"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Entrando..." : "Login"}
          </button>
        </form>
      </div>

      {/* CADASTRO */}
      <div className="form-box register">
        <form onSubmit={handleRegister}>
          <h1>Cadastre-se</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={emailRegister}
              onChange={(e) => setEmailRegister(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Senha"
              value={passwordRegister}
              onChange={(e) => setPasswordRegister(e.target.value)}
            />
          </div>

          <div className="input-box">
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="recepcionista">Recepcionista</option>
              <option value="enfermeiro">Enfermeiro</option>
              <option value="medico">Médico</option>
              <option value="paciente">Paciente</option>
            </select>
          </div>

          <button type="submit" className="btn">Cadastre-se</button>
        </form>
      </div>

      {/* TOGGLE */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Olá, Bem-Vindo</h1>
          <p>Ainda não tem uma conta?</p>
          <button className="btn" onClick={() => setIsActive(true)}>
            Cadastre-se
          </button>
        </div>

        <div className="toggle-panel toggle-right">
          <h1>Bem-Vindo!</h1>
          <p>Já tem uma conta?</p>
          <button className="btn" onClick={() => setIsActive(false)}>
            Login
          </button>
        </div>
      </div>

    </div>
  );
};

export default Login;