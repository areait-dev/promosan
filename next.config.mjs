/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test.promosan.eu',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;