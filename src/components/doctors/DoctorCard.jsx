import { Card, CardBody } from "@heroui/react";

export default function DoctorCard({
  doctor,
}) {
  return (
    <Card>
      <CardBody>
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
      </CardBody>
    </Card>
  );
}