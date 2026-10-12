import Link from "next/link";

const DEFAULT_FEATURES = [
  "Regular health screenings & check-ups",
  "Chronic disease management (diabetes, BP, heart)",
  "Mobility & physiotherapy support",
  "Medication review & mental wellness care",
];

const DEFAULT_STATS = [
  { value: "60+", label: "Age Group Served" },
  { value: "24/7", label: "Helpline Support" },
  { value: "50+", label: "Geriatric Specialists" },
];

export default function GeriatricsSection({ geriatrics }) {
  const features = geriatrics?.features?.length
    ? geriatrics.features
    : DEFAULT_FEATURES;
  const stats = geriatrics?.stats?.length ? geriatrics.stats : DEFAULT_STATS;

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* image side */}
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl bg-blue-100" />
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-sky-100" />
          <img
            src={geriatrics?.image || "/images/geriatrics.jpg"}
            alt="Doctor giving vaccination to an elderly patient"
            className="relative h-[420px] w-full rounded-3xl object-cover shadow-2xl"
          />
          {/* floating card */}
          <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white">
                🧓
              </span>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">
                  {geriatrics?.patients || "25K+"}
                </p>
                <p className="text-xs text-slate-500">Senior patients cared</p>
              </div>
            </div>
          </div>
        </div>

        {/* content side */}
        <div>
          <p className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
            ● Geriatrics ●
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
            {geriatrics?.title || (
              <>
                Compassionate Care for{" "}
                <span className="text-blue-600">Golden Years</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-slate-500">
            {geriatrics?.description ||
              "Just as children need specialised attention, our senior citizens deserve care that respects their age, comfort and dignity. Our geriatric specialists focus on preventive health, chronic care and overall quality of life."}
          </p>

          <ul className="mt-6 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-600">
                  ✓
                </span>
                <span className="text-slate-600">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-blue-600">
                  {s.value}
                </p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/doctors"
              className="rounded-full bg-blue-600 px-7 py-3 font-bold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Find a Geriatrician
            </Link>
            <Link
              href="/register"
              className="rounded-full border-2 border-blue-600 px-7 py-3 font-bold text-blue-600 transition hover:bg-blue-50"
            >
              Book a Visit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
