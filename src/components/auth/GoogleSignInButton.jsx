"use client";

import { useState } from "react";

import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";

import { showError } from "@/lib/toast";

export default function GoogleSignInButton({
  label = "Continue with Google",
  callbackURL = "/dashboard",
}) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_APP_URL ||
            "http://localhost:3000";

      const resolvedCallback = callbackURL.startsWith("http")
        ? callbackURL
        : `${origin}${callbackURL.startsWith("/") ? "" : "/"}${callbackURL}`;

      await authClient.signIn.social({
        provider: "google",
        callbackURL: resolvedCallback,
      });
    } catch (error) {
      console.error(error);
      showError(
        error?.message ||
          "Google sign-in failed. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET on the server, and set the redirect URI to {your-app}/api/auth/callback/google in Google Cloud Console."
      );
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="btn btn-outline w-full gap-2 border-slate-200 bg-white normal-case text-slate-800 hover:bg-slate-50"
    >
      <FcGoogle className="text-xl" aria-hidden />
      {loading ? "Connecting…" : label}
    </button>
  );
}
