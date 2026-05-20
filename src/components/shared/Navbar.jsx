import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          DocAppoint
        </Link>

        <div className="flex gap-5">
          <Link href="/">Home</Link>

          <Link href="/appointments">
            All Appointments
          </Link>

          <Link href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}