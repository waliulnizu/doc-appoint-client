"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const signOut = async () => {
      try {
        await authClient.signOut();
      } catch (error) {
        console.log(error);
      } finally {
        router.replace("/login");
        router.refresh();
      }
    };

    signOut();
  }, [router]);

  return (
    <main className="flex min-h-[50vh] items-center justify-center text-slate-600">
      Signing out…
    </main>
  );
}
