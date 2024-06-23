/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prochainweb.com',
        port:'',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
