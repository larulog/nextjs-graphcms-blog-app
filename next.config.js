/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ["media.graphassets.com"],
  },
  devIndicators: {
    buildActivity: false,
  },
};
