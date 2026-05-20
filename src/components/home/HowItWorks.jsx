export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Browse doctors",
      text: "Explore specialists on the home page or All Appointments list.",
    },
    {
      step: "02",
      title: "View details",
      text: "Open a doctor profile to see experience, hospital, and fees.",
    },
    {
      step: "03",
      title: "Book & manage",
      text: "Book a slot, then update or delete from your dashboard anytime.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h2 className="text-center text-3xl font-bold text-slate-900">
        How it works
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-slate-500">
        Three simple steps from search to confirmed appointment.
      </p>

      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map(({ step, title, text }) => (
          <li
            key={step}
            className="relative rounded-2xl border border-slate-200 p-6 pt-10"
          >
            <span className="absolute -top-4 left-6 rounded-lg bg-blue-600 px-3 py-1 text-sm font-bold text-white">
              {step}
            </span>
            <h3 className="text-lg font-semibold text-slate-900">
              {title}
            </h3>
            <p className="mt-2 text-sm text-slate-500">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
