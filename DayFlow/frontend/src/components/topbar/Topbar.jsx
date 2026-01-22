import "./Topbar.css";

export default function Topbar({ view, setView }) {
  return (
    <header className="topbar">
      <div>
        <h1>Meu trabalho</h1>

        <div className="tabs">
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

      <button className="new-task">Novo elemento</button>
    </header>
  );
}
