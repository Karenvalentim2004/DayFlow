import { useState, useMemo } from "react";
import Nav from "../../components/navbar/Nav";
import FinanceiroForm from "./FinanceiroForm";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

import "./Financeiro.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function Financeiro() {
    const [mes, setMes] = useState(new Date().getMonth());
    const [ano, setAno] = useState(new Date().getFullYear());

    const [entradas, setEntradas] = useState([]);
    const [saidas, setSaidas] = useState([]);

    // RECEBE DADOS DO FORMULÁRIO
    const handleAddLancamento = (item) => {
        if (item.tipo === "entrada") {
            setEntradas(prev => [...prev, item]);
        } else {
            setSaidas(prev => [...prev, item]);
        }
    };

    // Filtro por mês/ano
    const filtrar = (lista) =>
        lista.filter(item => {
            const d = new Date(item.data);
            return d.getMonth() === mes && d.getFullYear() === ano;
        });

    const entradasFiltradas = filtrar(entradas);
    const saidasFiltradas = filtrar(saidas);

    const totalEntradas = entradasFiltradas.reduce((s, i) => s + i.valor, 0);
    const totalSaidas = saidasFiltradas.reduce((s, i) => s + i.valor, 0);
    const saldoFinal = totalEntradas - totalSaidas;

    // Gráfico dinâmico
    const dadosGrafico = useMemo(() => {
        const categorias = {};

        entradasFiltradas.forEach(e => {
            categorias[e.categoria] =
                (categorias[e.categoria] || 0) + e.valor;
        });

        return {
            labels: Object.keys(categorias),
            datasets: [
                {
                    data: Object.values(categorias),
                    backgroundColor: [
                        "#1e88e5",
                        "#42a5f5",
                        "#90caf9",
                        "#bbdefb"
                    ]
                }
            ]
        };
    }, [entradasFiltradas]);

    return (
        <div className="financeiro-layout">
            <Nav />

            <div className="financeiro-content">

                <header className="financeiro-header">
                    ✨ Planejamento Financeiro Pessoal ✨
                </header>

                <main className="financeiro-main">

                    {/* FORMULÁRIO */}
                    <FinanceiroForm onAdd={handleAddLancamento} />

                    {/* FILTRO */}
                    <section className="financeiro-filtro">
                        <div>
                            <label>Mês</label>
                            <select value={mes} onChange={e => setMes(Number(e.target.value))}>
                                {meses.map((m, i) => (
                                    <option key={i} value={i}>{m}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Ano</label>
                            <select value={ano} onChange={e => setAno(Number(e.target.value))}>
                                {[2024, 2025, 2026, 2027].map(a => (
                                    <option key={a} value={a}>{a}</option>
                                ))}
                            </select>
                        </div>
                    </section>

                    {/* RESUMO */}
                    <section className="financeiro-resumo">
                        <div className="box blue">Saldo inicial<br />R$ 0,00</div>
                        <div className="box green">Total de Receitas<br />R$ {totalEntradas.toFixed(2)}</div>
                        <div className="box red">Total de Despesas<br />R$ {totalSaidas.toFixed(2)}</div>
                        <div className="box blue">Saldo final<br />R$ {saldoFinal.toFixed(2)}</div>
                    </section>

                    {/* GRID */}
                    <section className="financeiro-grid">
                        <div className="financeiro-chart">
                            <h3>Receitas por categoria</h3>
                            {dadosGrafico.labels.length ? (
                                <Pie data={dadosGrafico} />
                            ) : (
                                <p className="empty">Adicione receitas para ver o gráfico</p>
                            )}
                        </div>

                        <div className="financeiro-table">
                            <h3>Entradas</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Categoria</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entradasFiltradas.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="empty">Sem entradas</td>
                                        </tr>
                                    )}
                                    {entradasFiltradas.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.data}</td>
                                            <td>{item.categoria}</td>
                                            <td>R$ {item.valor.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="financeiro-table">
                            <h3>Saídas</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Categoria</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {saidasFiltradas.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="empty">Sem saídas</td>
                                        </tr>
                                    )}
                                    {saidasFiltradas.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.data}</td>
                                            <td>{item.categoria}</td>
                                            <td>R$ {item.valor.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
