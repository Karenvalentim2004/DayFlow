import { useState } from "react";
import "./Form.css";

export default function Form({ setReminders, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const [repeat, setRepeat] = useState("Nunca");
  const [notify, setNotify] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    setReminders((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        description,
        datetime,
        repeat,
        notify,
        linkedTaskId: null,
      },
    ]);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <form className="reminder-card" onSubmit={handleSubmit}>
        <h2>Criar Lembrete</h2>

        <input
          placeholder="Título do lembrete"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="row">
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
          />
        </div>

        <div className="repeat">
          {["Nunca", "Semanalmente", "Mensalmente"].map((r) => (
            <button
              type="button"
              key={r}
              className={repeat === r ? "active" : ""}
              onClick={() => setRepeat(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="toggle">
          <span>Ativar Notificação</span>
          <input
            type="checkbox"
            checked={notify}
            onChange={() => setNotify(!notify)}
          />
        </div>

        <footer>
          <button type="submit" className="save">
            Salvar Lembrete
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </footer>
      </form>
    </div>
  );
}