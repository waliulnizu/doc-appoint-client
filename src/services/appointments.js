import api from "./api";

// Create appointment
export const createAppointment = async (payload) => {
  const res = await api.post("/appointments", payload);
  return res.data;
};
// Get user appointments
export const getUserAppointments = async (email) => {
  const res = await api.get(`/appointments/${email}`);
  return res.data;
};