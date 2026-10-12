import Link from "next/link";

export default function AppDownloadSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div
        className="relative overflow-hidden rounded-3xl bg-cover bg-center p-10 text-white shadow-xl md:flex md:items-center md:justify-between md:p-14"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.88), rgba(6,182,212,0.88)), url('/images/appdownload-bg.jpg')",
        }}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-xl">
          <p className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold backdrop-blur-sm">
            ● Mobile App ●
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Download the DocAppoint App today!
          </h2>
          <p className="mt-3 text-blue-100">
            Book appointments, chat with doctors, and manage your health
            records — all from your phone.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-left shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50">
              <span className="text-2xl">🍎</span>
              <span>
                <span className="block text-[10px] uppercase text-slate-500">
                  Download on the
                </span>
                <span className="block font-bold text-slate-900">App Store</span>
              </span>
            </button>
            <button className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3 text-left ring-1 ring-white/40 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">
              <span className="text-2xl">▶</span>
              <span>
                <span className="block text-[10px] uppercase text-white/70">
                  Get it on
                </span>
                <span className="block font-bold text-white">Google Play</span>
              </span>
            </button>
          </div>
        </div>
        <div className="relative mt-8 text-8xl md:mt-0">📱</div>
      </div>
    </section>
  );
}
