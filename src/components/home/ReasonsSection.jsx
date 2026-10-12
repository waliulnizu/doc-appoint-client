const DEFAULT_REASONS = [
  {
    icon: "📞",
    title: "Follow-Up Care",
    text: "We ensure continuity of care through regular follow-ups and communication.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: "🤝",
    title: "Patient-Centered Approach",
    text: "We prioritize your comfort and tailor services to meet your individual needs.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: "📅",
    title: "Convenient Access",
    text: "Book appointments online or through customer service, with flexible hours.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    text: "Your health records and personal data stay protected with encrypted storage.",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: "⭐",
    title: "Verified Specialists",
    text: "Every doctor on the platform is verified for credentials and experience.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: "💬",
    title: "24/7 Support",
    text: "Our care team is available around the clock to help with bookings and queries.",
    color: "bg-sky-100 text-sky-600",
  },
];

export default function ReasonsSection({ reasons: reasonsProp }) {
  const reasons =
    Array.isArray(reasonsProp) && reasonsProp.length > 0
      ? reasonsProp
      : DEFAULT_REASONS;

  return (
    <section
      className="bg-cover bg-center py-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('/images/reasons-bg.jpg')",
      }}
    >
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-center">
          <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
            ● Why Choose Us ●
          </span>
        </p>
        <h2 className="mt-4 text-center text-3xl font-bold text-slate-900 md:text-4xl">
          Compelling Reasons to Choose
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <span
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-3xl transition group-hover:scale-110 ${r.color}`}
              >
                {r.icon}
              </span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
