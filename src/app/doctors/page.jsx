"use client";

import { useEffect, useMemo, useState } from "react";

import { HiOutlineSearch } from "react-icons/hi";

import DoctorCard from "@/components/doctors/DoctorCard";

import Loading from "@/components/shared/Loading";

import { getDoctors } from "@/services/doctors";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setError("");
        const data = await getDoctors();
        setDoctors(data.data || []);
      } catch (err) {
        console.error(err);
        setDoctors([]);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Could not load doctors. Check NEXT_PUBLIC_SERVER_URL and Render CORS (CLIENT_URL)."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return doctors;

    return doctors.filter((doctor) =>
      (doctor.name || "").toLowerCase().includes(query)
    );
  }, [doctors, search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-4xl font-bold text-slate-900">
        All Appointments
      </h1>
      <p className="mt-2 text-slate-500">
        Browse all available doctors and book a visit
      </p>

      <div className="relative mt-8 max-w-md">
        <HiOutlineSearch
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by doctor name…"
          className="input input-bordered w-full pl-10"
        />
      </div>

      {error ? (
        <p className="mt-12 text-center text-red-600">{error}</p>
      ) : null}

      {!error && doctors.length === 0 ? (
        <p className="mt-12 text-center text-slate-500">
          No doctors in the database yet. Add doctors in MongoDB Atlas.
        </p>
      ) : null}

      {!error && doctors.length > 0 && filtered.length === 0 ? (
        <p className="mt-12 text-center text-slate-500">
          No doctors match your search.
        </p>
      ) : null}

      {!error && filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doctor) => (
            <DoctorCard
              key={String(doctor._id)}
              doctor={doctor}
            />
          ))}
        </div>
      ) : null}
    </main>
  );
}
