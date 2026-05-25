import axios from "axios";

const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

// Browser: same-origin /api → Vercel rewrites → Render (avoids wrong baked URL + CORS).
// Server-side fetch (if any): direct Render/local URL.
const baseURL =
  typeof window !== "undefined"
    ? "/api"
    : `${serverUrl.replace(/\/$/, "")}/api`;

const api = axios.create({
  baseURL,
});

export default api;


