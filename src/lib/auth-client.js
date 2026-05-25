import { createAuthClient } from "better-auth/react";

// Auth requests go through Next.js rewrite → same origin as the app.
// Google redirect URI: http://localhost:3000/api/auth/callback/google
const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL: appUrl,
  basePath: "/api/auth",
});