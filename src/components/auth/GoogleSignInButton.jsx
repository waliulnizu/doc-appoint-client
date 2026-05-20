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
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
    } catch (error) {
      console.error(error);
      showError(
        "Google sign-in failed. Check server Google OAuth env variables."
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
