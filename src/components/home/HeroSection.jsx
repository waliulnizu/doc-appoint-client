"use client";

import { useEffect, useState } from "react";

const DEFAULT_SLIDES = [
  {
    badge: "🩺 Doctor Appointment Manager",
    title: "Discover Health: Find Your Trusted Doctors Today",
    subtitle:
      "Browse specialists, book appointments, and manage your visits online — all in one place.",
    image: "/images/hero-1.jpg",
  },
  {
    badge: "❤️ Trusted Care",
    title: "Book Appointments in Minutes",
    subtitle:
      "No phone calls. No long waits. Just fast, simple online booking for every specialty.",
    image: "/images/hero-2.jpg",
  },
  {
    badge: "🏥 Hospitals & Clinics",
    title: "Top Specialists for Every Need",
    subtitle:
      "Cardiology, Dermatology, Neurology, Pediatrics, Geriatrics and many more.",
    image: "/images/hero-3.jpg",
  },
  {
    badge: "👨‍⚕️ Expert Surgeons",
    title: "Advanced Care, Modern Facilities",
    subtitle:
      "State-of-the-art operation theatres and experienced surgical teams you can rely on.",
    image: "/images/hero-4.jpg",
  },
];

export default function HeroSection({ slides: slidesProp }) {
  const slides = Array.isArray(slidesProp) && slidesProp.length > 0 ? slidesProp : DEFAULT_SLIDES;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setAnimate(true);
      }, 400);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goTo = (i) => {
    setAnimate(false);
    setTimeout(() => {
      setIndex(i);
      setAnimate(true);
    }, 400);
  };

  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-white transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: `linear-gradient(rgba(15,23,42,0.72), rgba(15,23,42,0.55)), url('${slide.image}')`,
      }}
    >
      <div className="mx-auto flex min-h-[620px] max-w-7xl flex-col items-center justify-center px-5 py-20 text-center md:min-h-[700px] md:text-left">
        <div
          className={`max-w-3xl transition-all duration-700 ease-in-out ${
            animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <p className="mb-6 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold backdrop-blur-sm">
            {slide.badge}
          </p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-5 text-lg text-white/90">{slide.subtitle}</p>

          <form
            action="/doctors"
            method="GET"
            className="mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-full bg-white p-2 shadow-xl md:flex-row md:items-center"
          >
            <input
              type="text"
              name="search"
              placeholder="Search doctors, clinics, hospitals…"
              className="flex-1 rounded-full px-5 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-7 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              🔍 SEARCH
            </button>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-5 text-sm text-white/90 md:justify-start">
            <span>📅 Book Appointment</span>
            <span>💬 Talk to Doctors</span>
            <span>🏥 Hospitals</span>
          </div>
        </div>
      </div>

      {/* prev / next arrows */}
      <button
        onClick={() => goTo((index - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl backdrop-blur-sm transition hover:bg-white/30 md:flex"
      >
        ‹
      </button>
      <button
        onClick={() => goTo((index + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl backdrop-blur-sm transition hover:bg-white/30 md:flex"
      >
        ›
      </button>

      {/* dots */}
      <div className="flex justify-center gap-2 pb-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
