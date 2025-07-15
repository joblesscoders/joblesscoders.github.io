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
  experimental: {
    // Optimize for faster builds
    turbo: {
      // Enable Turbopack for faster compilation
    },
  },
  // Exclude certain directories from file watching to improve performance
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/.git/**',
          '**/coverage/**',
          '**/dist/**',
        ],
      };
    }
    return config;
  },
  /* config options here */
};

export default nextConfig;
