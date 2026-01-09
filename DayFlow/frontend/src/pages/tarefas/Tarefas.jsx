import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Nav from "../../components/navbar/Nav";

import TaskBoard from "../../components/card/TashBoard";
import TaskCalendar from "../../components/calendario/TaskCalendar";
import TaskForm from "../../components/tarefas/TaskForm";

import "./Tarefas.css";

const Tarefas = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("board");

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div className="tasks-page">
      <Nav />

      <div className="tasks-header">
        <h1>Minhas Tarefas</h1>

        <div className="view-buttons">
          <button
            className={view === "board" ? "active" : ""}
            onClick={() => setView("board")}
          >
            Quadro
          </button>

          <button
            className={view === "calendar" ? "active" : ""}
            onClick={() => setView("calendar")}
          >
            Calendário
          </button>
        </div>
      </div>

      <TaskForm addTask={addTask} />

      {view === "board" && <TaskBoard tasks={tasks} />}
      {view === "calendar" && <TaskCalendar tasks={tasks} />}
    </div>
  );
};

export default Tarefas;
