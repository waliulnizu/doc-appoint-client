"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { Card } from "@heroui/react";

import { useSession } from "@/hooks/useSession";

import { resolveDoctorId } from "@/utils/doctorId";

export default function DoctorCard({ doctor }) {
  const router = useRouter();
  const { user } = useSession();

  const id = resolveDoctorId(doctor);
  const detailHref =
    id !== "" ? `/doctors/${id}` : "#";

  const handleViewDetails = (e) => {
    if (!user) {
      e.preventDefault();
      router.push(
        `/login?redirect=${encodeURIComponent(detailHref)}`
      );
    }
  };

  const cardInner = (
    <>
      <img
        src={doctor.image}
        alt={doctor.name}
        className="h-60 w-full rounded-xl object-cover"
      />

      <h2 className="mt-4 text-2xl font-bold">
        {doctor.name}
      </h2>

      <p>{doctor.specialty}</p>
      <p>{doctor.hospital}</p>
      {doctor.rating != null ? (
        <p className="text-sm text-amber-600">
          ★ {doctor.rating}
        </p>
      ) : null}
      <p>৳ {doctor.fee}</p>

      <span className="mt-5 flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
        View Details
      </span>
    </>
  );

  if (id === "") {
    return (
      <Card className="h-full opacity-80">
        <Card.Content>{cardInner}</Card.Content>
      </Card>
    );
  }

  return (
    <Link
      href={detailHref}
      onClick={handleViewDetails}
      className="block h-full rounded-2xl no-underline text-inherit outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <Card className="h-full transition-shadow hover:shadow-md">
        <Card.Content>{cardInner}</Card.Content>
      </Card>
    </Link>
  );
}
