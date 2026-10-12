import Link from "next/link";

const DEPARTMENT_ICONS = {
  Cardiologist: { icon: "❤️", gradient: "from-rose-500 to-red-600" },
  Neurologist: { icon: "🧠", gradient: "from-violet-500 to-purple-600" },
  "Orthopedic Surgeon": { icon: "🦴", gradient: "from-amber-500 to-orange-600" },
  Dermatologist: { icon: "🧴", gradient: "from-pink-500 to-rose-600" },
  Pediatrician: { icon: "👶", gradient: "from-sky-500 to-blue-600" },
  "ENT Specialist": { icon: "👂", gradient: "from-teal-500 to-emerald-600" },
  Psychiatrist: { icon: "🧘", gradient: "from-indigo-500 to-blue-700" },
  Urologist: { icon: "🩺", gradient: "from-cyan-500 to-sky-600" },
  Ophthalmologist: { icon: "👁️", gradient: "from-blue-500 to-indigo-600" },
  "General Surgeon": { icon: "🏥", gradient: "from-slate-500 to-gray-600" },
};

const DEFAULT_DEPARTMENTS = [
  "Cardiologist",
  "Neurologist",
  "Orthopedic Surgeon",
  "Dermatologist",
  "Pediatrician",
  "ENT Specialist",
  "Psychiatrist",
  "Urologist",
];

export default function DepartmentsSection({ departments: departmentsProp }) {
  const names =
    Array.isArray(departmentsProp) && departmentsProp.length > 0
      ? departmentsProp
      : DEFAULT_DEPARTMENTS;

  const departments = names.map((name) => ({
    name,
    ...(DEPARTMENT_ICONS[name] || { icon: "🏥", gradient: "from-blue-500 to-indigo-600" }),
  }));

  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-16 text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15,23,42,0.82), rgba(15,23,42,0.82)), url('/images/departments-bg.jpg')",
      }}
    >
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-center">
          <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
            ● Top Specialties ●
          </span>
        </p>
        <h2 className="mt-4 text-center text-3xl font-bold text-white md:text-4xl">
          Highlighting the Care &amp; Support
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {departments.map((dept) => (
            <Link
              key={dept.name}
              href={`/doctors?specialty=${encodeURIComponent(dept.name)}`}
              className="group flex flex-col items-center rounded-2xl border border-white/20 bg-white/10 p-8 text-center text-white backdrop-blur-sm transition hover:-translate-y-2 hover:bg-white/20 hover:shadow-xl"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${dept.gradient} text-2xl text-white shadow-md transition group-hover:scale-110`}
              >
                {dept.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {dept.name}
              </h3>
              <p className="mt-1 text-sm text-white/70">View Doctors →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
