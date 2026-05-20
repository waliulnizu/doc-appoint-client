"use client";

import Link from "next/link";

import DoctorCard from "@/components/doctors/DoctorCard";

import Loading from "@/components/shared/Loading";

export default function TopRatedDoctors({
  doctors,
  loading,
}) {
  const topThree = [...doctors]
    .sort(
      (a, b) =>
        (Number(b.rating) || 0) - (Number(a.rating) || 0)
    )
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Top Rated Doctors
          </h2>
          <p className="mt-2 text-slate-500">
            Highly rated specialists chosen for you
          </p>
        </div>
        <Link
          href="/doctors"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          View all doctors →
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {topThree.map((doctor) => (
            <DoctorCard
              key={String(doctor._id)}
              doctor={doctor}
            />
          ))}
        </div>
      )}
    </section>
  );
}
