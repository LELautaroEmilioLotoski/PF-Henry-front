import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.postimg.cc"],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  output: "standalone",
};

export default nextConfig;
