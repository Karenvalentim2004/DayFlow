import { useEffect, useState } from "react";
import Nav from "../../components/navbar/Nav";
import api from "../../services/api";

import "./Relatorios.css";

const Relatorios = () => {
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState({
    dataInicio: "",
    dataFim: "",
    status: "",
    busca: ""
  });

  const [resumo, setResumo] = useState({
    total: 0,
    agendado: 0,
    cancelado: 0,
    concluido: 0
  });

  useEffect(() => {
    fetchRelatorio();
  }, []);

  const fetchRelatorio = async () => {
    try {
      const res = await api.get("/agendamentos");

      setDados(res.data);
      calcularResumo(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const calcularResumo = (lista) => {
    const total = lista.length;

    const agendado = lista.filter(a => a.status === "agendado").length;
    const cancelado = lista.filter(a => a.status === "cancelado").length;
    const concluido = lista.filter(a => a.status === "concluido").length;

    setResumo({ total, agendado, cancelado, concluido });
  };

  // FILTRO
  const dadosFiltrados = dados.filter((a) => {
    const data = new Date(a.data);

    const inicio = filtro.dataInicio ? new Date(filtro.dataInicio) : null;
    const fim = filtro.dataFim ? new Date(filtro.dataFim) : null;

    const matchData =
      (!inicio || data >= inicio) &&
      (!fim || data <= fim);

    const matchStatus =
      !filtro.status || a.status === filtro.status;

    const matchBusca =
      !filtro.busca ||
      a.paciente_nome?.toLowerCase().includes(filtro.busca.toLowerCase());

    return matchData && matchStatus && matchBusca;
  });

  // EXPORT CSV
  const exportCSV = () => {
    const rows = [
      ["Paciente", "Médico", "Data", "Status"],
      ...dadosFiltrados.map(a => [
        a.paciente_nome,
        a.medico_nome,
        a.data,
        a.status
      ])
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "relatorio.csv";
    link.click();
  };

  return (
    <div className="layout">
      <Nav />

      <div className="relatorios">
        <h1>Relatórios</h1>

        {/* RESUMO */}
        <div className="resumo">
          <div className="box">Total: {resumo.total}</div>
          <div className="box green">Agendado: {resumo.agendado}</div>
          <div className="box red">Cancelado: {resumo.cancelado}</div>
          <div className="box blue">Concluído: {resumo.concluido}</div>
        </div>

        {/* FILTROS */}
        <div className="filtros">
          <input
            type="date"
            onChange={(e) =>
              setFiltro({ ...filtro, dataInicio: e.target.value })
            }
          />

          <input
            type="date"
            onChange={(e) =>
              setFiltro({ ...filtro, dataFim: e.target.value })
            }
          />

          <select
            onChange={(e) =>
              setFiltro({ ...filtro, status: e.target.value })
            }
          >
            <option value="">Todos</option>
            <option value="agendado">Agendado</option>
            <option value="cancelado">Cancelado</option>
            <option value="concluido">Concluído</option>
          </select>

          <input
            type="text"
            placeholder="Buscar paciente..."
            onChange={(e) =>
              setFiltro({ ...filtro, busca: e.target.value })
            }
          />

          <button onClick={exportCSV}>Exportar CSV</button>
        </div>

        {/* TABELA */}
        <table>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {dadosFiltrados.map((a) => (
              <tr key={a.id}>
                <td>{a.paciente_nome}</td>
                <td>{a.medico_nome}</td>
                <td>{new Date(a.data).toLocaleString()}</td>
                <td className={a.status}>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Relatorios;