import Link from "next/link";

const DEFAULT_FAQS = [
  {
    q: "How do I book an appointment?",
    a: "Browse doctors, open a profile, pick a date and time, and confirm. Your booking appears in your dashboard instantly.",
  },
  {
    q: "Can I reschedule or cancel?",
    a: "Yes. Go to Dashboard → My Bookings, then edit or delete the appointment anytime.",
  },
  {
    q: "Is my information secure?",
    a: "Yes. Authentication is handled by Better Auth with secure sessions, and your data is only visible to you.",
  },
  {
    q: "How do reviews work?",
    a: "After you complete an appointment, you can rate and review that doctor to help other patients.",
  },
];

export default function FAQSection({ faqs: faqsProp }) {
  const faqs =
    Array.isArray(faqsProp) && faqsProp.length > 0 ? faqsProp : DEFAULT_FAQS;

  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-cover bg-center py-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('/images/faq-bg.jpg')",
      }}
    >
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-center">
          <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
            Get Your Answer
          </span>
        </p>
        <h2 className="mt-4 text-center text-3xl font-bold text-slate-900 md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-slate-500">
          Quick answers about booking and managing appointments.
        </p>

        <div className="mt-10 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
                {item.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-500">{item.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Still have questions?{" "}
          <Link
            href="/#cta"
            className="font-semibold text-blue-600 hover:underline"
          >
            Contact our support team →
          </Link>
        </p>
      </div>
    </section>
  );
}
