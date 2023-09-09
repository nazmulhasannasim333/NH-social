/** @type {import('next').NextConfig} */
const nextConfig = {};

// module.exports = nextConfig;
module.exports = {
  images: {
    domains: ["images.pexels.com", "pbs.twimg.com", "i.ibb.co"],
    // Add the hostnames here
  },
  swcMinify: false,
};
