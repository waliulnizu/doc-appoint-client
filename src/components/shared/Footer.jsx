import Link from "next/link";

import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <Link
            href="/"
            className="text-2xl font-bold text-white"
          >
            DocAppoint
          </Link>
          <p className="mt-2 max-w-sm text-sm text-slate-400">
            Book trusted doctors online and manage your appointments in one
            place.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-blue-600"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-slate-700"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-blue-700"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <p className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} DocAppoint. All rights reserved.
      </p>
    </footer>
  );
}
