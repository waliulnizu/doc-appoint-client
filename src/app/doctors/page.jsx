"use client";

import { useEffect, useState } from "react";

import { getDoctors } from "@/services/doctors";

import Loading from "@/components/shared/Loading";

import DoctorCard from "@/components/doctors/DoctorCard";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await getDoctors();

        setDoctors(data.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-10">
        Our Doctors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard
            key={String(doctor._id)}
            doctor={doctor}
          />
        ))}
      </div>
    </main>
  );
}