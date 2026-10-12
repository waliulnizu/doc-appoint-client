const DEFAULT_STEPS = [
  {
    n: "01",
    title: "Search For Doctors",
    text: "Search for a doctor based on specialization, location, or availability.",
    icon: "🔍",
    color: "bg-blue-600",
  },
  {
    n: "02",
    title: "Check Doctor Profile",
    text: "Explore detailed doctor profiles to make informed decisions.",
    icon: "👨‍⚕️",
    color: "bg-emerald-600",
  },
  {
    n: "03",
    title: "Appointment",
    text: "Choose a convenient time slot and confirm your appointment.",
    icon: "📅",
    color: "bg-violet-600",
  },
  {
    n: "04",
    title: "Get Your Solution",
    text: "Discuss your concerns and receive personalized advice.",
    icon: "💊",
    color: "bg-pink-600",
  },
];

export default function HowItWorks({ steps: stepsProp }) {
  const steps =
    Array.isArray(stepsProp) && stepsProp.length > 0 ? stepsProp : DEFAULT_STEPS;

  return (
    <section
      className="bg-cover bg-center py-16 text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,23,42,0.88), rgba(15,23,42,0.88)), url('/images/howitworks-bg.jpg')",
      }}
    >
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-center">
          <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
            ● How It Works ●
          </span>
        </p>
        <h2 className="mt-4 text-center text-3xl font-bold text-white md:text-4xl">
          Book Your Appointment in 4 Easy Steps
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-white/20 md:block" />
              )}
              <div
                className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-full ${s.color} text-2xl shadow-lg`}
              >
                {s.icon}
              </div>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.text}</p>
              <p className="mt-4 text-6xl font-extrabold text-slate-800">
                {s.n}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
