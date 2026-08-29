import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/product/6-suta-plus-makhana',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/product/5-suta-round-makhana',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/product/4-suta-round-makhana-flake',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/product/premium-6-plus-sutta-raw-makhana',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/product/premium-5-plus-sutta-raw-makhana',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/product/premium-4-plus-sutta-raw-makhana',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/product/6-suta-jumbo-grade-makhana',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/product/5-suta-medium-grade-makhana',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/product/4-plus-suta-raw-makhana',
        destination: '/categories',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
