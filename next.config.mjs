/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
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
