import axios from "axios";

const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

const api = axios.create({
  baseURL: `${serverUrl}/api`,
});

export default api;


