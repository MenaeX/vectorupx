import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/vectorupx",
  assetPrefix: "/vectorupx/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
