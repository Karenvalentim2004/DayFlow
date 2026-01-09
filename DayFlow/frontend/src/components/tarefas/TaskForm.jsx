import { useState } from "react";
import "./Tarefas.css";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !dueDate) return;

    addTask({
      id: Date.now(),
      title,
      dueDate,
      status: "Em andamento",
    });

    setTitle("");
    setDueDate("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        placeholder="Nova tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">Adicionar</button>
    </form>
  );
}
