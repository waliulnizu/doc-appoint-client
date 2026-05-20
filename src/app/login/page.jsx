"use client";

import Link from "next/link";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";

import { Button } from "@heroui/react";

import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

import AuthField, { AuthInput } from "@/components/auth/AuthField";

import AuthShell from "@/components/auth/AuthShell";

import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

import { authClient } from "@/lib/auth-client";

import { showError } from "@/lib/toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo =
    searchParams.get("redirect") || "/dashboard";

  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        showError(result.error.message);
        return;
      }

      await authClient.getSession();
      router.refresh();
      router.push(redirectTo);
    } catch (error) {
      console.error(error);
      showError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Login"
      subtitle="Sign in to book appointments with trusted doctors."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Register
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <AuthField
          label="Email"
          error={errors.email?.message}
        >
          <div className="relative">
            <HiOutlineMail
              className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-lg text-slate-400"
              aria-hidden
            />
            <AuthInput
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="pl-10"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
          </div>
        </AuthField>

        <AuthField
          label="Password"
          error={errors.password?.message}
        >
          <div className="relative">
            <HiOutlineLockClosed
              className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-lg text-slate-400"
              aria-hidden
            />
            <AuthInput
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="pl-10"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>
        </AuthField>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          className="mt-1 min-h-11 text-base font-semibold"
          isDisabled={submitting}
        >
          {submitting ? "Signing in…" : "Login"}
        </Button>

        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          or
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <GoogleSignInButton callbackURL={redirectTo} />
      </form>
    </AuthShell>
  );
}
