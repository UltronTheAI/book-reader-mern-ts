import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["*"], // Allow images from all hosts
  },
};

export default nextConfig;