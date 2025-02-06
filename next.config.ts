import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.postimg.cc"],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Ignora los errores de TypeScript en el build
  },
};

export default nextConfig;
