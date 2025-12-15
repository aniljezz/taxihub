/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": [require("path").resolve(__dirname, ".").replace(/\\/g, "/")]
    };
    return config;
  },
};

module.exports = nextConfig;
