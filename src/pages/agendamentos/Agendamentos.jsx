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

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [filtroData, setFiltroData] = useState("");

  const [form, setForm] = useState({
    paciente_id: "",
    profissional_id: "",
    status: "agendado"
  });

 useEffect(() => {
  let mounted = true;

  const load = async () => {
    if (!mounted) return;
    await fetchData();
  };

  load();

  return () => {
    mounted = false;
  };
}, []);

  // 🔥 BUSCAR DADOS
  const fetchData = async () => {
    try {
      setLoading(true);

      const [ag, pac, medRes] = await Promise.all([
        getAgendamentos(),
        getPacientes(),
        fetch("http://localhost:3000/api/usuarios?tipo=medico")
      ]);

      if (!medRes.ok) throw new Error("Erro ao buscar médicos");

      const med = await medRes.json();

      const formatted = ag.map((a) => {
        const startDate = new Date(`${a.data}T${a.hora}`);

        return {
          id: a.id,
          title: `${a.paciente_nome} - ${a.profissional_nome}`,
          start: startDate,
          end: new Date(startDate.getTime() + 30 * 60000),
          status: a.status,
          paciente_id: a.paciente_id,
          profissional_id: a.profissional_id
        };
      });

      setEvents(formatted);
      setPacientes(pac);
      setMedicos(med);

    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 FILTROS
  const filteredEvents = events.filter((e) => {
    const matchPaciente = filtroPaciente
      ? e.paciente_id === Number(filtroPaciente)
      : true;

    const matchData = filtroData
      ? moment(e.start).format("YYYY-MM-DD") === filtroData
      : true;

    return matchPaciente && matchData;
  });

  // 🚫 BLOQUEIO
  const isSlotOccupied = (start, profissional_id) => {
    return events.some(
      (e) =>
        e.profissional_id === Number(profissional_id) &&
        new Date(e.start).getTime() === new Date(start).getTime()
    );
  };

  // 🧲 DRAG & DROP
  const moveEvent = async ({ event, start }) => {
    if (isSlotOccupied(start, event.profissional_id)) {
      toast.warning("Horário ocupado");
      return;
    }

    const data = moment(start).format("YYYY-MM-DD");
    const hora = moment(start).format("HH:mm:ss");

    try {
      await updateAgendamento(event.id, {
        paciente_id: event.paciente_id,
        profissional_id: event.profissional_id,
        data,
        hora,
        status: event.status
      });

      toast.success("Reagendado!");
      fetchData();

    } catch (err) {
      console.error(err);
      toast.error("Erro ao reagendar");
    }
  };

  // 📅 NOVO AGENDAMENTO
  const abrirNovoAgendamento = () => {
    setEditingEvent(null);
    setSelectedDate(new Date());

    setForm({
      paciente_id: "",
      profissional_id: "",
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
      profissional_id: event.profissional_id,
      status: event.status
    });

    setModalOpen(true);
  };

  // 📅 CLICK NO CALENDÁRIO
  const handleSelectSlot = ({ start }) => {
    setEditingEvent(null);
    setSelectedDate(start);

    setForm({
      paciente_id: "",
      profissional_id: "",
      status: "agendado"
    });

    setModalOpen(true);
  };

  // 💾 SALVAR
  const handleSave = async () => {
    if (!form.paciente_id || !form.profissional_id) {
      return toast.warning("Preencha tudo");
    }

    if (isSlotOccupied(selectedDate, form.profissional_id) && !editingEvent) {
      return toast.warning("Horário ocupado");
    }

    const data = moment(selectedDate).format("YYYY-MM-DD");
    const hora = moment(selectedDate).format("HH:mm:ss");

    try {
      if (editingEvent) {
        await updateAgendamento(editingEvent.id, {
          ...form,
          data,
          hora
        });
        toast.success("Atualizado!");
      } else {
        await createAgendamento({
          ...form,
          data,
          hora
        });
        toast.success("Criado!");
      }

      setModalOpen(false);
      fetchData();

    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar");
    }
  };

  // 🗑️ DELETE
  const handleDelete = async () => {
    if (!editingEvent) return;

    if (!window.confirm("Excluir agendamento?")) return;

    await deleteAgendamento(editingEvent.id);
    toast.success("Excluído!");
    setModalOpen(false);
    fetchData();
  };

  // 🎨 CORES
  const eventStyleGetter = (event) => {
    const colors = {
      agendado: "#16a34a",
      cancelado: "#dc2626",
      concluido: "#2563eb"
    };

    return {
      style: {
        backgroundColor: colors[event.status] || "#999",
        borderRadius: "8px",
        color: "#fff",
        border: "none"
      }
    };
  };

  if (loading) {
    return <h2 style={{ padding: 20 }}>Carregando agenda...</h2>;
  }

  return (
    <div className="layout">
      <Nav />

      <div style={{ height: "90vh", padding: "20px" }}>
        <h1>Agenda Médica</h1>

        {/* BOTÃO */}
        <button
          onClick={abrirNovoAgendamento}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "8px",
            marginBottom: "10px",
            cursor: "pointer"
          }}
        >
          + Novo Agendamento
        </button>

        <p style={{ fontSize: "14px", color: "#666" }}>
          Clique no calendário ou use o botão para agendar
        </p>

        {/* FILTROS */}
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
            value={form.profissional_id}
            onChange={(e) =>
              setForm({ ...form, profissional_id: e.target.value })
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