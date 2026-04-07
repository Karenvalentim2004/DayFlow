import { useEffect, useState } from "react";

import Nav from "../../components/navbar/Nav";
import api from "../../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState({
    total: 0,
    agendados: 0,
    cancelados: 0,
    concluidos: 0,
    porDia: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");

      const formatted = res.data.porDia.map((d) => ({
        ...d,
        dia: new Date(d.dia).toLocaleDateString("pt-BR")
      }));

      setData({
        ...res.data,
        porDia: formatted
      });

    } catch (err) {
      console.log("Erro dashboard:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Nav />

      <div className="dashboard">
        <h1 className="title">Dashboard</h1>

        {loading ? (
          <div className="skeleton-grid">
            <div className="skeleton card"></div>
            <div className="skeleton card"></div>
            <div className="skeleton card"></div>
            <div className="skeleton card"></div>
            <div className="skeleton chart"></div>
          </div>
        ) : (
          <>
            {/* CARDS */}
            <div className="cards">
              <div className="card total">
                <h3>Total</h3>
                <p>{data.total}</p>
              </div>

              <div className="card green">
                <h3>Agendados</h3>
                <p>{data.agendados}</p>
              </div>

              <div className="card red">
                <h3>Cancelados</h3>
                <p>{data.cancelados}</p>
              </div>

              <div className="card blue">
                <h3>Concluídos</h3>
                <p>{data.concluidos}</p>
              </div>
            </div>

            {/* GRÁFICO */}
            <div className="chart">
              <h2>Agendamentos por dia</h2>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.porDia}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;