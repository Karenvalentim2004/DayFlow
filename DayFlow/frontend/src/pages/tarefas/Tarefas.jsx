import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Nav from "../../components/navbar/Nav";
import Topbar from "../../components/topbar/Topbar";
import TaskGroup from "../../components/taskgroup/TaskGroup";

import "./Tarefas.css";

const Tarefas = () => {
  const [view, setView] = useState("board");

  return (
    <div className="dayflow-layout">
      <Nav />

      <main className="dayflow-main">
        <Topbar view={view} setView={setView} />

        {view === "board" && (
          <div className="board">
            <TaskGroup title="Datas passadas" />
            <TaskGroup title="Hoje" />
            <TaskGroup title="Esta semana" />
            <TaskGroup title="Semana que vem" />
            <TaskGroup title="Mais tarde" />
            <TaskGroup title="Sem data" />
          </div>
        )}

        {view === "calendar" && (
          <div className="calendar-placeholder">
            Calendário (em construção)
          </div>
        )}
      </main>
    </div>
  );
}

export default Tarefas;


