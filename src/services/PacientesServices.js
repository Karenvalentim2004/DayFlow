import api from "./api";

export const getPacientes = async () => {
  const response = await api.get("/pacientes");

  return response.data.pacientes || response.data;
};

export const createPaciente = async (data) => {
  const response = await api.post("/pacientes", data);
  return response.data;
};

export const updatePaciente = async (id, data) => {
  const response = await api.put(`/pacientes/${id}`, data);
  return response.data;
};

export const deletePaciente = async (id) => {
  const response = await api.delete(`/pacientes/${id}`);
  return response.data;
};