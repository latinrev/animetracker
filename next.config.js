/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["dummyimage.com", "fakestoreapi.com", "localhost", "127.0.0.1", "asurascans.com", "picsum.photos"],
  },
};

module.exports = nextConfig;
