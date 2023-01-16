/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.akamai.steamstatic.com'], // <== Domain name
  },
};

module.exports = nextConfig;
