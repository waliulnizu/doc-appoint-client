"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Loading from "@/components/shared/Loading";

import { useSession } from "@/hooks/useSession";

import { getUserAppointments } from "@/services/appointments";

export default function AppointmentsPage() {
  const router = useRouter();
  const { user, loading: sessionLoading } = useSession();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionLoading) return;

    if (!user?.email) {
      router.replace("/login");
      return;
    }

    const loadAppointments = async () => {
      try {
        const result = await getUserAppointments(user.email);
        setAppointments(result.data || []);
      } catch (err) {
        console.error(err);
        setError("Could not load appointments.");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [user?.email, sessionLoading, router]);

  if (sessionLoading || loading) {
    return <Loading />;
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            My Appointments
          </h1>
          <p className="mt-1 text-slate-500">
            All bookings for {user.email}
          </p>
        </div>

        <Link
          href="/"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Find more doctors
        </Link>
      </div>

      {error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : appointments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
          <p className="text-slate-600">No appointments yet.</p>
          <Link
            href="/"
            className="mt-4 inline-block font-medium text-blue-600 hover:underline"
          >
            Book your first appointment
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((item) => (
            <article
              key={item._id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {item.doctorName || "Doctor"}
                  </h2>
                  <p className="text-sm text-slate-500">
                    Patient: {item.patientName}
                  </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {item.gender}
                </span>
              </div>

              <dl className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-slate-800">Date</dt>
                  <dd>{item.appointmentDate}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-800">Time</dt>
                  <dd>{item.appointmentTime}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-800">Phone</dt>
                  <dd>{item.phone}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-800">Email</dt>
                  <dd>{item.userEmail}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
