import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">DayFlow</h2>

      <nav>
        <span className="active">Meu trabalho</span>
        <span>Anotador IA</span>
        <span>Mais</span>
      </nav>
    </aside>
  );
}
