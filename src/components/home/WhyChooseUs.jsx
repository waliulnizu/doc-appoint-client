import {
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from "react-icons/hi";

const features = [
  {
    icon: HiOutlineUserGroup,
    title: "Trusted specialists",
    description:
      "Browse verified doctors across multiple hospitals and specialties.",
  },
  {
    icon: HiOutlineClock,
    title: "Quick booking",
    description:
      "Pick a date and time in minutes without phone calls or long waits.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Secure account",
    description:
      "Your bookings and profile are protected with Better Auth sessions.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="text-center text-3xl font-bold text-slate-900">
          Why choose DocAppoint?
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-500">
          Everything you need to find care and manage appointments in one
          place.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Icon className="text-2xl" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
