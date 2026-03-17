import Item from "../item/Item";
import "./List.css";

export default function List({ reminders }) {
  return (
    <div className="reminder-list">
      {reminders.map((r) => (
        <Item key={r.id} reminder={r} />
      ))}
    </div>
  );
}
