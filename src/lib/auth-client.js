import { createAuthClient } from "better-auth/react";

const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

export const authClient = createAuthClient({
  baseURL: serverUrl,
  basePath: "/api/auth",
});