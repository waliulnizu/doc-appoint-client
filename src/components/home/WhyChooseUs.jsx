export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-2">
        <div>
          <p className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold">
            Why Book With Us
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight">
            We are committed to understanding your{" "}
            <span className="text-blue-400">unique needs and delivering care</span>
          </h2>
          <p className="mt-4 text-slate-400">
            As a trusted healthcare provider, we promote health and wellness through outreach programs, health fairs, and educational workshops.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Our Vision",
              text: "We envision a community where everyone has access to high-quality healthcare and the resources they need.",
            },
            {
              title: "Our Mission",
              text: "We combine medical excellence with empathy to support your health journey.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
            >
              <h3 className="text-blue-400">
                0{i + 1} . {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
