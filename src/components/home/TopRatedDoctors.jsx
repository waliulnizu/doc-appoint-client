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
          <p className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
            ● Top Rated Doctors ●
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Top Rated Doctors
          </h2>
          <p className="mt-2 text-slate-500">
            Highly rated specialists chosen for you
          </p>
        </div>
        <Link
          href="/doctors"
          className="rounded-full border-2 border-blue-600 px-6 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
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
