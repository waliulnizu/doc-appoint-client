import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-6xl font-bold text-blue-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-slate-500">
        The link may be broken or the page was removed. Go back home and
        continue browsing doctors.
      </p>
      <Link
        href="/"
        className="btn btn-primary mt-8 border-none bg-blue-600 text-white hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </main>
  );
}
