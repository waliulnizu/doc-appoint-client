"use client";

import { useState } from "react";

import Link from "next/link";

import { useSession } from "@/hooks/useSession";

import {
  getAvatarFallback,
  getUserImage,
} from "@/utils/userProfile";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Find Doctors", href: "/doctors" },
  { label: "Appointments", href: "/appointments" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const { session, loading } = useSession();
  const [imgError, setImgError] = useState(false);

  const user = session?.user;
  const profileImage = getUserImage(user);
  const avatarSrc =
    !imgError && profileImage
      ? profileImage
      : getAvatarFallback(user?.name, user?.email);

  return (
    <nav className="sticky top-0 z-40 border-b border-blue-800/30 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 shadow-lg shadow-blue-900/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl shadow-inner ring-1 ring-white/25 transition group-hover:scale-110 group-hover:bg-white/25">
            🩺
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Doc
            <span className="text-sky-200">Appoint</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-[15px] font-semibold text-white/90 transition hover:bg-white/20 hover:text-white md:px-4"
            >
              {link.label}
            </Link>
          ))}

          {/* AUTH SECTION */}
          {loading ? null : user ? (
            <div className="ml-1 flex items-center gap-3 border-l border-white/25 pl-3 md:ml-2 md:pl-4">
              <img
                key={avatarSrc}
                src={avatarSrc}
                alt={user.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-white/50 transition hover:ring-white"
              />

              <span className="hidden max-w-[140px] truncate text-sm font-semibold text-white sm:block">
                {user.name}
              </span>

              <Link
                href="/logout"
                className="rounded-lg bg-white/15 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-red-500 hover:shadow-lg hover:shadow-red-900/20"
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="ml-1 flex items-center gap-2 border-l border-white/25 pl-3 md:ml-2 md:pl-4">
              <Link
                href="/login"
                className="rounded-full border border-white/50 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
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