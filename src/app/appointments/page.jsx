"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Loading from "@/components/shared/Loading";

export default function AppointmentsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return <Loading />;
}
