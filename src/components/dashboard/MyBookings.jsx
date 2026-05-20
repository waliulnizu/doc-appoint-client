"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import EditAppointmentModal from "@/components/appointments/EditAppointmentModal";

import Loading from "@/components/shared/Loading";

import {
  deleteAppointment,
  getUserAppointments,
} from "@/services/appointments";

import { showError, showSuccess } from "@/lib/toast";

import { resolveDoctorId } from "@/utils/doctorId";

export default function MyBookings({ userEmail }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setError("");
        const result = await getUserAppointments(userEmail);
        setAppointments(result.data || []);
      } catch (err) {
        console.error(err);
        setError("Could not load appointments.");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [userEmail]);

  const handleUpdateSuccess = (updated) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item._id === updated._id ? { ...item, ...updated } : item
      )
    );
    setEditing(null);
    showSuccess("Appointment updated successfully!");
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Delete appointment with ${item.doctorName || "this doctor"} on ${item.appointmentDate}?`
    );

    if (!confirmed) return;

    setDeletingId(item._id);

    try {
      await deleteAppointment(item._id);
      setAppointments((prev) =>
        prev.filter((a) => a._id !== item._id)
      );
      if (editing?._id === item._id) {
        setEditing(null);
      }
      showSuccess("Appointment deleted successfully!");
    } catch (err) {
      console.error(err);
      showError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete appointment"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (appointments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
        <p className="text-slate-600">No appointments yet.</p>
        <Link
          href="/doctors"
          className="mt-4 inline-block font-medium text-blue-600 hover:underline"
        >
          Book your first appointment
        </Link>
      </div>
    );
  }

  return (
    <>
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

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {item.gender}
                </span>
                <button
                  type="button"
                  onClick={() => setEditing(item)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  disabled={deletingId === item._id}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === item._id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>

            {resolveDoctorId(item) ? (
              <Link
                href={`/doctors/${resolveDoctorId(item)}#reviews`}
                className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                Leave a review →
              </Link>
            ) : null}

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

      {editing ? (
        <EditAppointmentModal
          appointment={editing}
          onClose={() => setEditing(null)}
          onSuccess={handleUpdateSuccess}
        />
      ) : null}
    </>
  );
}
