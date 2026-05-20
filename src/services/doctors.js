import api from "./api";

export const getDoctors = async () => {
  const response = await api.get("/doctors");

  return response.data;
};


export const getSingleDoctor = async (id) => {
  const response = await api.get(
    `/doctors/${id}`
  );

  return response.data;
};