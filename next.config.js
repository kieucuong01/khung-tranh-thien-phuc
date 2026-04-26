/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'khungtranhhcm.com',
      },
      {
        protocol: 'https',
        hostname: 'tranhdonghoanggia.com',
      },
      {
        protocol: 'https',
        hostname: 'tranhdonghoanggia.com',
      },
      {
        protocol: 'https',
        hostname: 'hcbc.vn',
      },
      {
        protocol: 'https',
        hostname: 'miahome.vn',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
