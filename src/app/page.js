"use client";

import { useEffect, useState } from "react";

import { getDoctors } from "@/services/doctors";

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const loadDoctors = async () => {
      const data = await getDoctors();

      setDoctors(data.data);
    };

    loadDoctors();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        DocAppoint Doctors
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="border p-5 rounded-xl"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-60 object-cover rounded-lg"
            />

            <h2 className="text-2xl font-bold mt-4">
              {doctor.name}
            </h2>

            <p>{doctor.specialty}</p>

            <p>{doctor.hospital}</p>

            <p>৳ {doctor.fee}</p>
          </div>
        ))}
      </div>
    </div>
  );
}