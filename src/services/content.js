import api from "./api";

export const getContent = async () => {
  const res = await api.get("/content");
  return res.data;
};
