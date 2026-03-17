import { useEffect, useState } from "react";

import Nav from "../../components/navbar/Nav";
import Form from "../../components/form/Form";
import List from "../../components/list/List";

import "./Notificacoes.css";

export default function Notificacoes() {
  const [reminders, setReminders] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="notifications-page">

      <Nav />

      <main className="notifications-content">
        <header className="notifications-header">
          <h1>Notificações</h1>

          <button
            type="button"
            className="btn-outline-blue"
            onClick={() => setOpen(true)}
          >
            Criar Novo Lembrete
          </button>
        </header>

        <List reminders={reminders} />
      </main>

      {open && (
        <Form
          setReminders={setReminders}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
