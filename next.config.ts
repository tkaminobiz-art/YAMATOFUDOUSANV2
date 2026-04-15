import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.img-asp.jp",
        pathname: "/customer/**",
      },
    ],
  },
};

export default nextConfig;
