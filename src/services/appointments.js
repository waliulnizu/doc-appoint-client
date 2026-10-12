import api from "./api";

// Create appointment
export const createAppointment = async (payload) => {
  const res = await api.post("/appointments", payload);
  return res.data;
};
// Get user appointments
export const getUserAppointments = async (email) => {
  const res = await api.get(`/appointments/user/${email}`);
  return res.data;
};

// Update appointment
export const updateAppointment = async (id, payload) => {
  const res = await api.put(`/appointments/${id}`, payload);
  return res.data;
};

// Delete appointment
export const deleteAppointment = async (id) => {
  const res = await api.delete(`/appointments/${id}`);
  return res.data;
};

// Get available/booked 30-min slots for a doctor on a date
export const getDoctorSlots = async (doctorId, date) => {
  const res = await api.get(`/appointments/slots/${doctorId}`, {
    params: { date },
  });
  return res.data;
};