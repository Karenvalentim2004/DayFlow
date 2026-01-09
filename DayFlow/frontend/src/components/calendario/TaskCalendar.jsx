import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import "./Calendario.css";

function TaskCalendar({ tasks }) {
  return (
    <div className="calendar-container">
      <h2>Calendário</h2>

      {tasks.length === 0 && <p>Nenhuma tarefa cadastrada.</p>}

      {tasks.map((task) => (
        <div key={task.id} className="calendar-task">
          📅 {task.dueDate} — {task.title}
        </div>
      ))}
    </div>
  );
}

export default TaskCalendar;