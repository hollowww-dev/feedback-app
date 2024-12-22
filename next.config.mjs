/** @type {import('next').NextConfig} */

const nextConfig = {
  serverExternalPackages: ["mongoose"],
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
};

export default nextConfig;
