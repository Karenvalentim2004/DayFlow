import "./TaskGroup.css";
import TaskRow from "../taskrow/TaskRow";

export default function TaskGroup({ title, tasks = [] }) {
  return (
    <section className="task-group">
      <div className="group-header">
        <span>{title}</span>
        <small>{tasks.length} elementos</small>
      </div>

      <div className="task-table">
        <div className="task-header">
          <span>Item</span>
          <span>Status</span>
          <span>Data</span>
          <span>Pessoa</span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty">+ Adicionar tarefa</div>
        ) : (
          tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))
        )}
      </div>
    </section>
  );
}

