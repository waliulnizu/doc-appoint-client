const DEFAULT_POSTS = [
  {
    date: "18 Jul",
    category: "Doctor",
    title: "Making your clinic visit painless",
    text: "Simple tips to prepare before your appointment and get the most out of your visit.",
    image: "/images/blog-1.jpg",
  },
  {
    date: "28 Sep",
    category: "Clinic",
    title: "Benefits of consulting an online doctor",
    text: "Why more patients are choosing telemedicine for follow-ups and minor concerns.",
    image: "/images/blog-2.jpg",
  },
  {
    date: "25 Sep",
    category: "Doctor",
    title: "5 reasons to book your doctor online",
    text: "Save time, compare specialists, and manage your bookings from one dashboard.",
    image: "/images/blog-3.jpg",
  },
];

export default function BlogSection({ posts: postsProp }) {
  const posts =
    Array.isArray(postsProp) && postsProp.length > 0 ? postsProp : DEFAULT_POSTS;

  return (
    <section
      className="bg-cover bg-center py-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('/images/blog-bg.jpg')",
      }}
    >
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-center">
          <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
            ● Our Blog ●
          </span>
        </p>
        <h2 className="mt-4 text-center text-3xl font-bold text-slate-900 md:text-4xl">
          Stay Updated With Our Latest Articles
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-slate-500">
          Health tips, clinic news, and patient stories.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 shadow">
                  {post.date}
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {post.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{post.text}</p>
                <a
                  href="#"
                  className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
