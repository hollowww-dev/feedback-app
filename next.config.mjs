/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
};

export default nextConfig;
