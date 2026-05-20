import Link from "next/link";

import { Card } from "@heroui/react";

import { resolveDoctorId } from "@/utils/doctorId";

export default function DoctorCard({
  doctor,
}) {
  const id = resolveDoctorId(doctor);

  const detailHref =
    id !== "" ? `/doctors/${id}` : "#";

  const cardInner = (
    <>
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-full h-60 object-cover rounded-xl"
      />

      <h2 className="text-2xl font-bold mt-4">
        {doctor.name}
      </h2>

      <p>{doctor.specialty}</p>

      <p>{doctor.hospital}</p>

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
      className="block h-full rounded-2xl no-underline text-inherit outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <Card className="h-full transition-shadow hover:shadow-md">
        <Card.Content>{cardInner}</Card.Content>
      </Card>
    </Link>
  );
}