import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-91ce1a23bc1d43b283b5f1832668a531.r2.dev',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/manager',
        destination: '/manager/projects',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
