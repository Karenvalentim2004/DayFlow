import api from "./api";

export const getAgendamentos = async () => {
  const response = await api.get("/agendamentos");
  
  return response.data.agendamentos || response.data;
};

export const createAgendamento = async (data) => {
  const response = await api.post("/agendamentos", data);
  return response.data;
};

export const updateAgendamento = async (id, data) => {
  const response = await api.put(`/agendamentos/${id}`, data);
  return response.data;
};

export const deleteAgendamento = async (id) => {
  await api.delete(`/agendamentos/${id}`);
};