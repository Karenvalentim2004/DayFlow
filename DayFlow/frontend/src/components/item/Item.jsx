import "./item.css";

export default function Item({ reminder }) {
  return (
    <div className="mini-card">
      <div>
        <strong>{reminder.title}</strong>
        <small>
          {new Date(reminder.datetime).toLocaleString()}
        </small>
        {reminder.repeat !== "Nunca" && (
          <span className="repeat">
            Repetir: {reminder.repeat}
          </span>
        )}
      </div>

      <label className="switch">
        <input type="checkbox" checked={reminder.notify} readOnly />
        <span />
      </label>
    </div>
  );
}
