const DEFAULT_STATS = [
  { value: "500+", label: "Doctors Available", color: "bg-emerald-500", icon: "👨‍⚕️" },
  { value: "18+", label: "Specialities", color: "bg-purple-500", icon: "🩺" },
  { value: "30K", label: "Bookings Done", color: "bg-indigo-500", icon: "📅" },
  { value: "97+", label: "Hospitals & Clinic", color: "bg-pink-500", icon: "🏥" },
  { value: "317+", label: "Lab Tests Available", color: "bg-amber-500", icon: "🧪" },
];

export default function StatsSection({ stats }) {
  const items = stats
    ? [
        { value: stats.totalDoctors ?? 0, label: "Doctors Available", color: "bg-emerald-500", icon: "👨‍⚕️" },
        { value: stats.totalSpecialties ?? 0, label: "Specialities", color: "bg-purple-500", icon: "🩺" },
        { value: stats.totalAppointments ?? 0, label: "Bookings Done", color: "bg-indigo-500", icon: "📅" },
        { value: stats.totalHospitals ?? 0, label: "Hospitals & Clinic", color: "bg-pink-500", icon: "🏥" },
        { value: stats.totalReviews ?? 0, label: "Patient Reviews", color: "bg-amber-500", icon: "⭐" },
      ]
    : DEFAULT_STATS;

  return (
    <section
      className="bg-cover bg-center py-14"
      style={{
        backgroundImage:
          "linear-gradient(rgba(239,246,255,0.88), rgba(239,246,255,0.88)), url('/images/stats-bg.jpg')",
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 md:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="group rounded-2xl bg-white/70 p-5 text-center shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl transition group-hover:scale-110">
              {item.icon}
            </span>
            <p className="mt-3 text-4xl font-extrabold text-slate-900">
              {item.value}
            </p>
            <div className={`mx-auto mt-2 h-1 w-16 rounded-full ${item.color}`} />
            <p className="mt-2 text-sm text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
