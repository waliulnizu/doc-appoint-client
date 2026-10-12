const DEFAULT_TESTIMONIALS = [
  {
    name: "Jennifer Robinson",
    city: "Seattle, WA",
    title: "Nice Treatment",
    text: "Every visit feels personal — the doctors remember our history and genuinely care. The online booking reminder system makes it convenient.",
    rating: 5,
  },
  {
    name: "Maria Lopez",
    city: "Austin, TX",
    title: "Good Hospitality",
    text: "My daughter used to be scared of doctor visits, but the doctor made her feel completely at ease.",
    rating: 5,
  },
  {
    name: "Kevin Anderson",
    city: "Chicago, IL",
    title: "Excellent Care",
    text: "She identified the problem right away and set up a treatment plan that worked beautifully.",
    rating: 5,
  },
];

export default function TestimonialsSection({ testimonials: testimonialsProp }) {
  const testimonials =
    Array.isArray(testimonialsProp) && testimonialsProp.length > 0
      ? testimonialsProp
      : DEFAULT_TESTIMONIALS;

  return (
    <section
      className="bg-cover bg-center py-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(239,246,255,0.88), rgba(239,246,255,0.88)), url('/images/testimonials-bg.jpg')",
      }}
    >
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-center">
          <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
            ● Testimonials ●
          </span>
        </p>
        <h2 className="mt-4 text-center text-3xl font-bold text-slate-900 md:text-4xl">
          15k Users Trust DocAppoint Worldwide
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <span className="absolute -top-4 left-6 text-5xl text-blue-200">
                &ldquo;
              </span>
              <div className="text-amber-400">
                {"★".repeat(t.rating || 5)}
                {"☆".repeat(5 - (t.rating || 5))}
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{t.title}</h3>
              <blockquote className="mt-2 text-sm text-slate-500">
                {t.text}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.city || ""}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
