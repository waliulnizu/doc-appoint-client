"use client";

import { useEffect, useState } from "react";

import { createAppointment, getDoctorSlots } from "@/services/appointments";

import Calendar from "./Calendar";

import { showError, showSuccess } from "@/lib/toast";

const RELATIONS = [
  "Spouse",
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandfather",
  "Grandmother",
  "Friend",
];

/** "2026-10-14" -> "14 Oct 2026, Wed" */
const formatDisplayDate = (dateStr) => {
  const d = new Date(`${dateStr}T00:00:00`);

  if (Number.isNaN(d.getTime())) return dateStr;

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${days[d.getDay()]}`;
};

export default function BookAppointmentModal({
  doctor,
  user,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [clinicHours, setClinicHours] = useState("");

  // Calendar open/close with smooth animation.
  // `calendarMounted` keeps it in the DOM until the close animation finishes.
  const [calendarMounted, setCalendarMounted] = useState(true);
  const [calendarClosing, setCalendarClosing] = useState(false);

  const [form, setForm] = useState({
    bookedFor: "self",
    relation: "",
    patientName: user?.name || "",
    gender: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const isFamily = form.bookedFor === "family";

  /** Open the calendar (with open animation) */
  const openCalendar = () => {
    setCalendarClosing(false);
    setCalendarMounted(true);
  };

  /** Close the calendar, wait for the animation, then unmount */
  const closeCalendar = () => {
    setCalendarClosing(true);

    setTimeout(() => {
      setCalendarMounted(false);
      setCalendarClosing(false);
    }, 200);
  };

  /** Toggle from the date bar */
  const toggleCalendar = () => {
    if (calendarMounted && !calendarClosing) {
      closeCalendar();
    } else {
      openCalendar();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      // Clear selected slot when date changes
      ...(name === "appointmentDate" ? { appointmentTime: "" } : {}),
    }));

    setError("");
  };

  // Load slots whenever date changes
  useEffect(() => {
    if (!form.appointmentDate || !doctor?._id) {
      setSlots([]);
      return;
    }

    let cancelled = false;

    const loadSlots = async () => {
      setSlotsLoading(true);

      try {
        const res = await getDoctorSlots(
          doctor._id,
          form.appointmentDate
        );

        if (cancelled) return;

        setSlots(res?.data?.slots || []);
        setClinicHours(res?.data?.clinicHours || "");
      } catch (err) {
        if (cancelled) return;
        setSlots([]);
      } finally {
        if (!cancelled) setSlotsLoading(false);
      }
    };

    loadSlots();

    return () => {
      cancelled = true;
    };
  }, [form.appointmentDate, doctor?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.gender) {
      setError("Please select gender.");
      return;
    }

    if (!form.appointmentTime) {
      setError("Please select a time slot.");
      return;
    }

    const payload = {
      bookedFor: form.bookedFor,
      relation: isFamily ? form.relation : "",
      patientName: form.patientName,
      userEmail: user?.email || "",
      gender: form.gender,
      phone: form.phone,
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      doctorId: doctor._id,
      doctorName: doctor.name,
    };

    setLoading(true);

    try {
      await createAppointment(payload);

      showSuccess("Appointment booked successfully!");
      onSuccess?.();
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to book appointment";

      setError(message);
      showError(message);

      // Reload slots so the taken one shows as booked
      if (form.appointmentDate && doctor?._id) {
        try {
          const res = await getDoctorSlots(
            doctor._id,
            form.appointmentDate
          );
          setSlots(res?.data?.slots || []);
        } catch {
          // ignore
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const availableCount = slots.filter(
    (s) => s.status === "Available"
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
        {/* header */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Book Appointment
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {doctor?.name} — {doctor?.specialty}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-500 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* ---------- who is this booking for ---------- */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Who is this appointment for?
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    bookedFor: "self",
                    relation: "",
                    patientName: user?.name || "",
                  }))
                }
                className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition ${
                  !isFamily
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-2xl">🙋</span>
                <span className="text-sm font-semibold text-slate-800">
                  Myself
                </span>
                <span className="text-[11px] text-slate-500">
                  My own visit
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    bookedFor: "family",
                    patientName: prev.patientName === user?.name ? "" : prev.patientName,
                  }))
                }
                className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition ${
                  isFamily
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-2xl">👨‍👩‍👧</span>
                <span className="text-sm font-semibold text-slate-800">
                  Family / Relative
                </span>
                <span className="text-[11px] text-slate-500">
                  Book on behalf
                </span>
              </button>
            </div>
          </div>

          {/* ---------- relation (family only) ---------- */}
          {isFamily && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Relation with patient *
              </label>
              <select
                name="relation"
                value={form.relation}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="" disabled>
                  Select relation
                </option>
                {RELATIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ---------- patient name ---------- */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              {isFamily ? "Patient name *" : "Your name *"}
            </label>
            <input
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              placeholder="Full name"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* ---------- booked by (account email) ---------- */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Booked by
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600"
            />
            <p className="mt-1 text-xs text-slate-400">
              Bookings are saved under your account.
            </p>
          </div>

          {/* ---------- gender + phone ---------- */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Gender *
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Phone *
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* ---------- date with compact calendar ---------- */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Appointment date *
            </label>

            {/* Selected date display + toggle */}
            <button
              type="button"
              onClick={toggleCalendar}
              className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 text-left transition hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <span
                className={`text-sm ${
                  form.appointmentDate
                    ? "font-semibold text-slate-800"
                    : "text-slate-400"
                }`}
              >
                {form.appointmentDate
                  ? formatDisplayDate(form.appointmentDate)
                  : "Select a date"}
              </span>
              <span
                className={`text-sm leading-none text-blue-600 transition-transform duration-200 ${
                  calendarMounted && !calendarClosing ? "rotate-180" : ""
                }`}
              >
                ▲
              </span>
            </button>

            {/* Compact inline calendar with smooth open/close */}
            {calendarMounted && (
              <div
                className={
                  calendarClosing
                    ? "animate-calendar-close"
                    : "animate-calendar-open"
                }
              >
                <div className="pt-2">
                  <Calendar
                    value={form.appointmentDate}
                    onChange={(date) => {
                      setForm((prev) => ({
                        ...prev,
                        appointmentDate: date,
                        appointmentTime: "",
                      }));
                      setError("");
                    }}
                    onSelect={closeCalendar}
                  />
                </div>
              </div>
            )}

            {/* Hidden input so the form still submits the date */}
            <input
              type="hidden"
              name="appointmentDate"
              value={form.appointmentDate}
              required
            />
          </div>

          {/* ---------- time slots ---------- */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">
                Choose a time slot *
              </label>
              {clinicHours && form.appointmentDate && (
                <span className="text-xs text-slate-400">
                  Clinic: {clinicHours}
                </span>
              )}
            </div>

            {!form.appointmentDate ? (
              <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-6 text-center text-sm text-slate-400">
                Pick a date first to see available slots
              </p>
            ) : slotsLoading ? (
              <p className="rounded-lg bg-slate-50 px-3 py-6 text-center text-sm text-slate-500">
                Loading slots…
              </p>
            ) : slots.length === 0 ? (
              <p className="rounded-lg bg-slate-50 px-3 py-6 text-center text-sm text-slate-500">
                No slots available on this date.
              </p>
            ) : (
              <>
                <p className="mb-2 text-xs text-slate-500">
                  <span className="font-semibold text-emerald-600">
                    {availableCount} available
                  </span>{" "}
                  · 30 minute slots
                </p>

                <div className="grid max-h-52 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
                  {slots.map((slot) => {
                    const isAvailable = slot.status === "Available";
                    const isSelected =
                      form.appointmentTime === slot.time;

                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            appointmentTime: slot.time,
                          }))
                        }
                        className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                          !isAvailable
                            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 line-through"
                            : isSelected
                              ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/30"
                              : "border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50"
                        }`}
                      >
                        <span className="block">
                          {slot.label}
                        </span>
                        <span className="mt-0.5 block text-[10px] font-normal">
                          {isAvailable ? "Available" : "Booked"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:shadow-xl disabled:translate-y-0 disabled:opacity-60"
          >
            {loading ? "Booking…" : "Confirm Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}