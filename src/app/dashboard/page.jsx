"use client";

import { useState } from "react";

import MyBookings from "@/components/dashboard/MyBookings";

import MyProfile from "@/components/dashboard/MyProfile";

import Loading from "@/components/shared/Loading";

import { useSession } from "@/hooks/useSession";

export default function DashboardPage() {
  const { user, loading, refetch } = useSession();
  const [tab, setTab] = useState("bookings");

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Dashboard
      </h1>
      <p className="mt-1 text-slate-500">
        Manage your bookings and profile
      </p>

      <div
        role="tablist"
        className="mt-8 flex gap-2 border-b border-slate-200"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "bookings"}
          onClick={() => setTab("bookings")}
          className={`px-4 py-2 text-sm font-semibold transition ${
            tab === "bookings"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          My Bookings
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "profile"}
          onClick={() => setTab("profile")}
          className={`px-4 py-2 text-sm font-semibold transition ${
            tab === "profile"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          My Profile
        </button>
      </div>

      <div className="mt-8">
        {tab === "bookings" ? (
          <MyBookings userEmail={user.email} />
        ) : (
          <MyProfile user={user} onUpdated={refetch} />
        )}
      </div>
    </main>
  );
}
