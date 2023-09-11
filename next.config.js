/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  images: {
    domains: ["images.pexels.com", "pbs.twimg.com", "i.ibb.co"],
  },
};

module.exports = nextConfig;
