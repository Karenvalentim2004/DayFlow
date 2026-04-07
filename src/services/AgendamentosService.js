import api from "./api";

// GET
export const getAgendamentos = async () => {
  try {
    const response = await api.get("/agendamentos");

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (response.data?.agendamentos) {
      return response.data.agendamentos;
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return [];
  }
};

// CREATE
export const createAgendamento = async (data) => {
  const response = await api.post("/agendamentos", data);
  return response.data;
};

// UPDATE
export const updateAgendamento = async (id, data) => {
  const response = await api.put(`/agendamentos/${id}`, data);
  return response.data;
};

// DELETE
export const deleteAgendamento = async (id) => {
  const response = await api.delete(`/agendamentos/${id}`);
  return response.data;
};