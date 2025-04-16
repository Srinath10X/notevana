import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://www.meistertask.com/")],
  },
};

export default nextConfig;
