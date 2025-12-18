import { useState, useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./Login.css";

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signIn, signed } = useContext(AuthContext);

  useEffect(() => {
    if (signed) {
      navigate("/dashboard");
    }
  }, [signed, navigate]);

  const responseGoogle = (response) => {
    const userObject = jwtDecode(response.credential);

    signIn({
      name: userObject.name,
      email: userObject.email,
      picture: userObject.picture
    });

    alert("Logado com sucesso!");
    navigate("/dashboard");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });
      signIn(response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError("Email ou senha inválidos");
    } finally {
      setLoading(false);
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error" style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Entrando..." : "Login"}
          </button>

          <p>ou faça login com o Google:</p>

          <div className="social-icons">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => console.log("Erro ao logar com Google")}
              useOneTap={false}
              type="standard"
              shape="rectangular"
              size="large"
              width="250"
            />
          </div>

        </form>
      </div>

      {/* REGISTER */}
      <div className="form-box register">
        <form>
          <h1>Cadastre-se</h1>
          <div className="input-box">
            <input type="text" placeholder="Nome" required />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Senha" required />
          </div>
          <button type="submit" className="btn">Cadastre-se</button>
          <p>ou cadastre-se com o Google:</p>
          <div className="social-icons">
            {/* Renderiza apenas se estiver ativo para evitar bugs de Iframe invisível */}
            {isActive && (
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => console.log("Erro ao logar com Google")}
              />
            )}
          </div>
        </form>
      </div>

      {/* TOGGLE BOX */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Olá, Bem-Vindo!</h1>
          <p>Ainda não tem uma conta?</p>
          <button className="btn" onClick={() => setIsActive(true)}>
            Cadastre-se
          </button>
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Bem-Vindo de volta!</h1>
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