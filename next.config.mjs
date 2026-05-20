/** @type {import('next').NextConfig} */
const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${serverUrl}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
