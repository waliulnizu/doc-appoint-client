"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { Button, Card } from "@heroui/react";

import Loading from "@/components/shared/Loading";

import BookAppointmentModal from "@/components/appointments/appointments";

import { useSession } from "@/hooks/useSession";

import { getSingleDoctor } from "@/services/doctors";

export default function DoctorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useSession();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleBookClick = () => {
    if (!user) {
      router.push(
        `/login?redirect=${encodeURIComponent(`/doctors/${params.id}`)}`
      );
      return;
    }

    setOpen(true);
  };

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const data =
          await getSingleDoctor(
            params.id
          );

        setDoctor(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (!doctor) {
    return (
      <div className="text-center py-20">
        Doctor Not Found
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-5 py-10">
      <Card>
        <Card.Content>
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-[400px] object-cover rounded-xl"
          />

          <h1 className="text-4xl font-bold mt-6">
            {doctor.name}
          </h1>

          <p className="text-xl mt-2">
            {doctor.specialty}
          </p>

          <p className="mt-4">
            Experience:
            {doctor.experience}
          </p>

          <p>
            Hospital:
            {doctor.hospital}
          </p>

          <p>
            Location:
            {doctor.location}
          </p>

          <p className="mt-3 text-2xl font-bold">
            ৳ {doctor.fee}
          </p>

          <Button
            variant="primary"
            className="mt-6"
            onPress={handleBookClick}
          >
            Book Appointment
          </Button>
        </Card.Content>
      </Card>

      {/* 👇 MODAL */}
      {open && (
        <BookAppointmentModal
          doctor={doctor}
          user={user}
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            router.push("/appointments");
          }}
        />
      )}
    </main>
  );
}