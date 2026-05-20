"use client";

import { useState } from "react";

import { createAppointment } from "@/services/appointments";

import { showError, showSuccess } from "@/lib/toast";

export default function BookAppointmentModal({
  doctor,
  user,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    patientName: user?.name || "",
    userEmail: user?.email || "",
    gender: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.gender) {
      setError("Please select gender (Male or Female).");
      return;
    }

    const payload = {
      ...form,
      doctorId: doctor._id,
      doctorName: doctor.name,
    };

    // DevTools → Console এ payload দেখতে পারবেন
    console.log("Sending appointment:", payload);

    setLoading(true);

    try {
      const response = await createAppointment(payload);

      // DevTools → Console এ server response
      console.log("Appointment saved:", response);

      showSuccess("Appointment booked successfully!");
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Booking failed:", err);

      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to book appointment";

      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-1 text-xl font-bold text-slate-900">
          Book Appointment
        </h2>
        <p className="mb-4 text-sm text-slate-500">
          Dr. {doctor.name} — {doctor.specialty}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            placeholder="Your Name *"
            required
            className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-blue-500"
          />

          <input
            name="userEmail"
            type="email"
            value={form.userEmail}
            readOnly
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-600"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select gender *
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone number *"
            required
            className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-blue-500"
          />

          <input
            type="date"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-blue-500"
          />

          <input
            type="time"
            name="appointmentTime"
            value={form.appointmentTime}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-blue-500"
          />

          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full text-center text-sm text-red-500 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
