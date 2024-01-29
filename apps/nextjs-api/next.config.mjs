/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@acme/api", "@acme/hono", "@acme/db"],
};

export default nextConfig;
