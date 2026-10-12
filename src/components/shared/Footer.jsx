import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa6";

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Find a Doctor", href: "/doctors" },
      { label: "Appointments", href: "/appointments" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Specialities",
    links: [
      { label: "Cardiology", href: "/doctors?specialty=Cardiology" },
      { label: "Dermatology", href: "/doctors?specialty=Dermatology" },
      { label: "Neurology", href: "/doctors?specialty=Neurology" },
      { label: "Pediatrics", href: "/doctors?specialty=Pediatrics" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/#faq" },
      { label: "FAQs", href: "/#faq" },
      { label: "Login", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],
  },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF, hover: "hover:bg-blue-600" },
  { label: "Twitter", href: "https://twitter.com", icon: FaTwitter, hover: "hover:bg-sky-500" },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram, hover: "hover:bg-pink-600" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn, hover: "hover:bg-blue-700" },
];

const contact = [
  { icon: FaLocationDot, text: "123 Health Avenue, Medical District, NY 10001" },
  { icon: FaPhone, text: "+1 (565) 895-4598" },
  { icon: FaEnvelope, text: "support@docappoint.com" },
  { icon: FaClock, text: "Mon - Sat: 8:00 AM - 8:00 PM" },
];

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* pre-footer CTA */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 md:flex-row">
          <p className="text-lg font-semibold text-white">
            Need immediate medical help? Call our 24/7 helpline.
          </p>
          <a
            href="tel:+15658954598"
            className="rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            📞 +1 (565) 895-4598
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden bg-slate-950 text-slate-300">
        {/* decorative glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            {/* brand + contact */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 text-xl shadow-lg shadow-blue-600/30">
                  🩺
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  Doc<span className="text-blue-400">Appoint</span>
                </span>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                Book trusted doctors online, manage your appointments, and keep
                every health record in one secure place.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {contact.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-blue-400 ring-1 ring-white/10">
                      <Icon />
                    </span>
                    <span className="text-slate-400">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3">
                {socials.map(({ label, href, icon: Icon, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition hover:-translate-y-0.5 ${hover}`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* link columns */}
            {columns.map((col) => (
              <nav key={col.title}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                  {col.title}
                </h3>
                <span className="mt-3 block h-0.5 w-8 rounded-full bg-blue-500" />
                <ul className="mt-5 space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500/60 transition group-hover:bg-blue-400" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* newsletter */}
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 md:flex-row">
            <div>
              <h4 className="text-lg font-bold text-white">
                Subscribe to our newsletter
              </h4>
              <p className="mt-1 text-sm text-slate-400">
                Health tips, doctor updates and offers — straight to your inbox.
              </p>
            </div>
            <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 rounded-full border border-white/10 bg-slate-900 px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* bottom bar */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-slate-500 md:flex-row">
            <p>
              © {new Date().getFullYear()} DocAppoint. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/#faq" className="transition hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/#faq" className="transition hover:text-white">
                Terms &amp; Conditions
              </Link>
              <span className="flex items-center gap-2">
                Made with <span className="text-pink-500">❤</span> for healthier
                lives
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
