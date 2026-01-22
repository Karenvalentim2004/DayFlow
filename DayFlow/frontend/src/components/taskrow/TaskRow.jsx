import "./TaskRow.css";

export default function TaskRow({ task }) {
  return (
    <div className="task-row">
      <span>{task.title}</span>

      <span className={`status ${task.status.replace(" ", "-")}`}>
        {task.status}
      </span>

      <span>{task.date}</span>
      <span className="person">{task.person}</span>
    </div>
  );
}
