"use client";

import Link from "next/link";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { Button } from "@heroui/react";

import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlinePhotograph,
} from "react-icons/hi";

import AuthField, { AuthInput } from "@/components/auth/AuthField";

import AuthShell from "@/components/auth/AuthShell";

import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

import { authClient } from "@/lib/auth-client";

import { showError, showSuccess } from "@/lib/toast";

export default function RegisterPage() {
  const router = useRouter();

  const meta = {
    title: "Register | DocAppoint",
  };

  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const result =
        await authClient.signUp.email({
          name: data.name,
          email: data.email,
          password: data.password,
          image: data.image || undefined,
        });

      console.log("Register response:", result);

      if (result.error) {
        showError(result.error.message);
        return;
      }

      showSuccess("Registration successful! Please sign in.");
      router.push("/login");
    } catch (error) {
      console.error(error);
      showError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Register"
      subtitle="Join DocAppoint to find doctors and manage appointments easily."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Login
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <AuthField
          label="Full name"
          error={errors.name?.message}
        >
          <div className="relative">
            <HiOutlineUser
              className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-lg text-slate-400"
              aria-hidden
            />
            <AuthInput
              type="text"
              placeholder="Jane Doe"
              autoComplete="name"
              className="pl-10"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
          </div>
        </AuthField>

        <AuthField
          label="Email address"
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
          label="Profile photo URL"
          hint="Optional — paste a link to your photo"
          error={errors.image?.message}
        >
          <div className="relative">
            <HiOutlinePhotograph
              className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-lg text-slate-400"
              aria-hidden
            />
            <AuthInput
              type="url"
              placeholder="https://…"
              className="pl-10"
              {...register("image")}
            />
          </div>
        </AuthField>

        <AuthField
          label="Password"
          hint="At least 6 characters with uppercase and lowercase letters"
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
              autoComplete="new-password"
              className="pl-10"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message:
                    "Include both uppercase and lowercase letters",
                },
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
          {submitting ? "Creating account…" : "Register"}
        </Button>

        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          or
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <GoogleSignInButton callbackURL="/dashboard" />
      </form>
    </AuthShell>
  );
}
