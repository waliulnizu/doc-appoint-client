import Link from "next/link";

export default function CTASection() {
  return (
    <section id="cta" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16">
      <div
        className="relative overflow-hidden rounded-3xl bg-cover bg-center p-10 text-white shadow-xl md:flex md:items-center md:justify-between md:p-14"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.88), rgba(6,182,212,0.88)), url('/images/cta-bg.jpg')",
        }}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Working for Your Better Health.
          </h2>
          <p className="mt-3 max-w-xl text-blue-100">
            Join thousands of patients who book and manage their doctor visits
            online every day.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-full bg-white px-7 py-3 font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Get Started Free
            </Link>
            <Link
              href="/doctors"
              className="rounded-full border-2 border-white/60 px-7 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              View Doctors
            </Link>
          </div>
        </div>
        <div className="relative mt-8 flex flex-wrap gap-8 md:mt-0">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl">
              🎧
            </span>
            <div>
              <p className="text-xs text-white/80">Customer Support</p>
              <p className="font-bold">+1 56589 54598</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl">
              💬
            </span>
            <div>
              <p className="text-xs text-white/80">Drop Us an Email</p>
              <p className="font-bold">info@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
