"use client";

import Link from "next/link";
import { useSession } from "@/hooks/useSession";

export default function Navbar() {
  const { session, loading } = useSession();

  const user = session?.user;

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          DocAppoint
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5">

          <Link href="/">Home</Link>

          <Link href="/appointments">
            All Appointments
          </Link>

          <Link href="/dashboard">
            Dashboard
          </Link>

          {/* AUTH SECTION */}
          {loading ? null : user ? (
            <div className="flex items-center gap-3">

              {/* User Image */}
              <img
                src={
                  user.image ||
                  "https://i.ibb.co/placeholder.png"
                }
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />

              {/* User Name */}
              <span className="text-sm font-medium">
                {user.name}
              </span>

              {/* Logout Button */}
              <Link
                href="/logout"
                className="text-red-500 hover:underline"
              >
                Logout
              </Link>

            </div>
          ) : (
            <div className="flex items-center gap-3">

              <Link
                href="/login"
                className="border px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}