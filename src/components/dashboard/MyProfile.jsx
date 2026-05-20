"use client";

import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { Button } from "@heroui/react";

import { HiOutlinePhotograph, HiOutlineUser } from "react-icons/hi";

import AuthField, { AuthInput } from "@/components/auth/AuthField";

import { authClient } from "@/lib/auth-client";

import { showError, showSuccess } from "@/lib/toast";

import {
  getAvatarFallback,
  getProfileFormValues,
  getUserImage,
} from "@/utils/userProfile";

export default function MyProfile({ user, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imgError, setImgError] = useState(false);

  const profileImage = getUserImage(user);
  const avatarSrc =
    !imgError && profileImage
      ? profileImage
      : getAvatarFallback(user?.name, user?.email);

  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: getProfileFormValues(user),
  });

  useEffect(() => {
    reset(getProfileFormValues(user));
  }, [user, reset]);

  const openEdit = () => {
    reset(getProfileFormValues(user));
    setEditing(true);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const result = await authClient.updateUser({
        name: data.name,
        image: data.image?.trim() || undefined,
      });

      if (result.error) {
        showError(result.error.message);
        return;
      }

      await authClient.getSession();
      showSuccess("Profile updated successfully!");
      setEditing(false);
      onUpdated?.();
    } catch (err) {
      console.error(err);
      showError("Failed to update profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <img
          key={avatarSrc}
          src={avatarSrc}
          alt={user?.name || "Profile"}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-24 w-24 rounded-full border-4 border-blue-100 object-cover"
        />

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-slate-900">
            {user?.name}
          </h2>
          <p className="mt-1 text-slate-500">{user?.email}</p>

          <Button
            variant="primary"
            className="mt-4"
            onPress={openEdit}
          >
            Update Profile
          </Button>
        </div>
      </div>

      {editing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-4 border-t border-slate-100 pt-6"
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field, fieldState }) => (
              <AuthField
                label="Name"
                error={fieldState.error?.message}
              >
                <div className="relative">
                  <HiOutlineUser
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-lg text-slate-400"
                    aria-hidden
                  />
                  <AuthInput
                    className="pl-10"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </div>
              </AuthField>
            )}
          />

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <AuthField label="Photo URL">
                <div className="relative">
                  <HiOutlinePhotograph
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-lg text-slate-400"
                    aria-hidden
                  />
                  <AuthInput
                    type="url"
                    placeholder="https://…"
                    className="pl-10"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </div>
              </AuthField>
            )}
          />

          <p className="text-sm text-slate-500">
            Email cannot be changed here (read-only for security).
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              type="submit"
              variant="primary"
              isDisabled={submitting}
            >
              {submitting ? "Saving…" : "Save changes"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onPress={() => setEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
