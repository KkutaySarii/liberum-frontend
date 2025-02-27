import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "liberum-bucket.s3.eu-west-3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
