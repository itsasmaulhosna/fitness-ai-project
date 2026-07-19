import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
      protocol: "https",
      hostname: "randomuser.me",
    },


    ],
  },
};

export default nextConfig;
