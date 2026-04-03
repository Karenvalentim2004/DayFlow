import { useEffect, useState } from "react";
import Nav from "../../components/navbar/Nav";

import {
  getAgendamentos,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento
} from "../../services/AgendamentosService";

import { getPacientes } from "../../services/PacientesServices";

import {
  Calendar,
  momentLocalizer
} from "react-big-calendar";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import moment from "moment";
import Modal from "react-modal";
import { toast } from "react-toastify";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const Agendamentos = () => {
  const [events, setEvents] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [filtroData, setFiltroData] = useState("");

  const [form, setForm] = useState({
    paciente_id: "",
    medico_id: "",
    status: "agendado"
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const ag = await getAgendamentos();
      const pac = await getPacientes();

      const med = await fetch("http://localhost:3000/api/usuarios?tipo=medico")
        .then(res => res.json());

      const formatted = ag.map((a) => ({
        id: a.id,
        title: `${a.paciente_nome} - ${a.medico_nome}`,
        start: new Date(a.data),
        end: new Date(new Date(a.data).getTime() + 30 * 60000),
        status: a.status,
        paciente_id: a.paciente_id,
        medico_id: a.medico_id
      }));

      setEvents(formatted);
      setPacientes(pac);
      setMedicos(med);

    } catch {
      toast.error("Erro ao carregar dados");
    }
  };

  // 🔍 FILTROS
  const filteredEvents = events.filter((e) => {
    const matchPaciente = filtroPaciente
      ? e.paciente_id == filtroPaciente
      : true;

    const matchData = filtroData
      ? moment(e.start).format("YYYY-MM-DD") === filtroData
      : true;

    return matchPaciente && matchData;
  });

  // 🧠 BLOQUEIO POR MÉDICO
  const isSlotOccupied = (start, medico_id) => {
    return events.some(
      (e) =>
        e.medico_id == medico_id &&
        new Date(e.start).getTime() === new Date(start).getTime()
    );
  };

  // 📅 NOVO AGENDAMENTO
  const handleSelectSlot = ({ start }) => {
    setEditingEvent(null);
    setSelectedDate(start);
    setForm({
      paciente_id: "",
      medico_id: "",
      status: "agendado"
    });
    setModalOpen(true);
  };

  // ✏️ EDITAR
  const handleSelectEvent = (event) => {
    setEditingEvent(event);
    setSelectedDate(event.start);

    setForm({
      paciente_id: event.paciente_id,
      medico_id: event.medico_id,
      status: event.status
    });

    setModalOpen(true);
  };

  // 💾 SALVAR
  const handleSave = async () => {
    if (!form.paciente_id || !form.medico_id) {
      toast.warning("Preencha tudo");
      return;
    }

    if (isSlotOccupied(selectedDate, form.medico_id) && !editingEvent) {
      toast.warning("Médico já tem consulta nesse horário");
      return;
    }

    try {
      if (editingEvent) {
        await updateAgendamento(editingEvent.id, {
          ...form,
          data: selectedDate
        });

        toast.success("Atualizado!");
      } else {
        await createAgendamento({
          ...form,
          data: selectedDate
        });

        toast.success("Criado!");
      }

      setModalOpen(false);
      fetchData();

    } catch {
      toast.error("Erro ao salvar");
    }
  };

  // 🗑️ EXCLUIR
  const handleDelete = async () => {
    if (!editingEvent) return;

    if (!window.confirm("Excluir?")) return;

    await deleteAgendamento(editingEvent.id);
    toast.success("Excluído!");
    setModalOpen(false);
    fetchData();
  };

  // 🎨 CORES
  const eventStyleGetter = (event) => {
    let color = "#999";

    if (event.status === "agendado") color = "#16a34a";
    if (event.status === "cancelado") color = "#dc2626";
    if (event.status === "concluido") color = "#2563eb";

    return {
      style: {
        backgroundColor: color,
        borderRadius: "8px",
        color: "white",
        border: "none",
        padding: "5px"
      }
    };
  };

  // 🧲 DRAG & DROP
  const moveEvent = async ({ event, start }) => {
    if (isSlotOccupied(start, event.medico_id)) {
      toast.warning("Horário ocupado");
      return;
    }

    await updateAgendamento(event.id, {
      paciente_id: event.paciente_id,
      medico_id: event.medico_id,
      data: start,
      status: event.status
    });

    toast.success("Reagendado!");
    fetchData();
  };

  return (
    <div className="layout">
      <Nav />

      <div style={{ height: "90vh", padding: "20px" }}>
        <h1>Agenda Médica</h1>

        {/* 🔍 FILTROS */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <select onChange={(e) => setFiltroPaciente(e.target.value)}>
            <option value="">Todos pacientes</option>
            {pacientes.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>

          <input
            type="date"
            onChange={(e) => setFiltroData(e.target.value)}
          />
        </div>

        <DnDCalendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={moveEvent}
          draggableAccessor={() => true}
          resizable
          eventPropGetter={eventStyleGetter}
          defaultView="week"
          views={["day", "week", "agenda"]}
          step={30}
          timeslots={2}
        />

        {/* MODAL */}
        <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
          <h2>{editingEvent ? "Editar" : "Novo"} Agendamento</h2>

          <select
            value={form.paciente_id}
            onChange={(e) =>
              setForm({ ...form, paciente_id: e.target.value })
            }
          >
            <option value="">Paciente</option>
            {pacientes.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>

          <select
            value={form.medico_id}
            onChange={(e) =>
              setForm({ ...form, medico_id: e.target.value })
            }
          >
            <option value="">Médico</option>
            {medicos.map((m) => (
              <option key={m.id} value={m.id}>{m.nome}</option>
            ))}
          </select>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="agendado">🟢 Agendado</option>
            <option value="cancelado">🔴 Cancelado</option>
            <option value="concluido">🔵 Concluído</option>
          </select>

          <button onClick={handleSave}>
            {editingEvent ? "Atualizar" : "Salvar"}
          </button>

          {editingEvent && (
            <button onClick={handleDelete} style={{ background: "red" }}>
              Excluir
            </button>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Agendamentos;