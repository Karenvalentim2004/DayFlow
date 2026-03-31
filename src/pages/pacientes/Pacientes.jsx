import { useEffect, useState } from "react";

import api from "../../services/api";
import Nav from "../../components/navbar/Nav";
import "./Pacientes.css";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const response = await api.get("/pacientes");

      setPacientes(response.data);
    } catch (error) {
      console.log("Erro ao buscar pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Nav />

      <div className="content">
        <h1>Pacientes</h1>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {pacientes.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.email}</td>
                  <td>
                    <button className="edit">Editar</button>
                    <button className="delete">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Pacientes;