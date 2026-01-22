/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.ahkenlabs.com',
          },
        ],
        destination: 'https://ahkenlabs.com/:path*',
        permanent: true, // 301 redirect
      },
    ];
  },
};

module.exports = nextConfig;
