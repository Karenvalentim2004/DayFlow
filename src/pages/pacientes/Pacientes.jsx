import { useEffect, useState } from "react";
import {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente
} from "../../services/PacientesServices";

import Nav from "../../components/navbar/Nav";
import "./Pacientes.css";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    data_nascimento: "",
    endereco: "",
    telefone: ""
  });

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const data = await getPacientes();
      setPacientes(Array.isArray(data) ? data : data.pacientes);
    } catch (error) {
      console.log("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (paciente = null) => {
    setEditando(paciente);

    if (paciente) {
      setForm({
        nome: paciente.nome || "",
        email: paciente.email || "",
        cpf: paciente.cpf || "",
        data_nascimento: paciente.data_nascimento || "",
        endereco: paciente.endereco || "",
        telefone: paciente.telefone || ""
      });
    } else {
      setForm({ nome: "", email: "", endereco: "", telefone: "", cpf: "", data_nascimento: "" });
    }

    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setEditando(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await updatePaciente(editando.id, form);
      } else {
        await createPaciente(form);
      }

      fetchPacientes();
      fecharModal();

    } catch (error) {
      console.log("Erro ao salvar:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza?")) return;

    try {
      await deletePaciente(id);
      fetchPacientes();
    } catch (error) {
      console.log("Erro ao excluir:", error);
    }
  };

  const formatarData = (data) => {
    if (!data) return "";

    const [ano, mes, dia] = data.split("T")[0].split("-");

    return `${dia}/${mes}/${ano}`;

  };

  const [busca, setBusca] = useState("");

  const pacientesFiltrados = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.email?.toLowerCase().includes(busca.toLowerCase()) ||
    p.cpf?.includes(busca)
  );

  return (
    <div className="layout">
      <Nav />

      <div className="content">
        <div className="header">
          <h1>Pacientes</h1>

          <div className="header-actions">
            <input
              type="text"
              placeholder="Pesquisar paciente..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="input-search"
            />

            <button className="btn-primary" onClick={() => abrirModal()}>
              + Novo Paciente
            </button>
          </div>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Endereço</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {pacientesFiltrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.email}</td>
                  <td>{p.cpf}</td>
                  <td>{formatarData(p.data_nascimento)}</td>
                  <td>{p.endereco}</td>
                  <td>{p.telefone}</td>
                  <td>
                    <button className="btn-edit" onClick={() => abrirModal(p)}>
                      Editar
                    </button>

                    <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* MODAL */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editando ? "Editar Paciente" : "Novo Paciente"}</h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Nome"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                  type="text"
                  placeholder="cpf"
                  value={form.cpf}
                  onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                />

                <input
                  type="date"
                  placeholder="Data de Nascimento"
                  value={form.data_nascimento}
                  onChange={(e) => setForm({ ...form, data_nascimento: e.target.value })}
                />

                <input
                  type="text"
                  placeholder="Endereço"
                  value={form.endereco}
                  onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                />

                <input
                  type="text"
                  placeholder="Telefone"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                />

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={fecharModal}>
                    Cancelar
                  </button>

                  <button type="submit" className="btn-primary">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Pacientes;