import api from "./api";

export const getDoctorReviews = async (doctorId) => {
  const res = await api.get(`/reviews/doctor/${doctorId}`);
  return res.data;
};

export const createReview = async (payload) => {
  const res = await api.post("/reviews", payload);
  return res.data;
};
