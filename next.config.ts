import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Turbopack configuration (moved from experimental.turbo)
  turbopack: {
    // Enable Turbopack for faster compilation
  },
  /* config options here */
};

export default nextConfig;
