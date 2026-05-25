/** @type {import('next').NextConfig} */
const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

const nextConfig = {
  async rewrites() {
    const base = serverUrl.replace(/\/$/, "");

    return [
      {
        source: "/api/auth/:path*",
        destination: `${base}/api/auth/:path*`,
      },
      {
        source: "/api/doctors",
        destination: `${base}/api/doctors`,
      },
      {
        source: "/api/doctors/:path*",
        destination: `${base}/api/doctors/:path*`,
      },
      {
        source: "/api/appointments",
        destination: `${base}/api/appointments`,
      },
      {
        source: "/api/appointments/:path*",
        destination: `${base}/api/appointments/:path*`,
      },
      {
        source: "/api/reviews",
        destination: `${base}/api/reviews`,
      },
      {
        source: "/api/reviews/:path*",
        destination: `${base}/api/reviews/:path*`,
      },
    ];
  },
};

export default nextConfig;
