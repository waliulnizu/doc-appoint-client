import Link from "next/link";

import { HiOutlineCalendar } from "react-icons/hi";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-sky-800 text-white">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-20 text-center md:flex-row md:text-left">
        <div className="flex-1">
          <p className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
            Doctor Appointment Manager
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Book the right doctor, at the right time
          </h1>
          <p className="mt-4 max-w-xl text-lg text-blue-100">
            Browse specialists, view profiles, and schedule appointments online
            with DocAppoint — fast, simple, and secure.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              href="/doctors"
              className="btn border-none bg-white text-blue-700 hover:bg-blue-50"
            >
              Browse Doctors
            </Link>
            <Link
              href="/register"
              className="btn btn-outline border-white text-white hover:bg-white/10 hover:text-white"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm md:h-56 md:w-56">
          <HiOutlineCalendar
            className="text-8xl text-white/90"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
