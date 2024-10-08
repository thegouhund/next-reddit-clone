/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize"],
  },
  images: {
    domains: ["lh3.googleusercontent.com", "cdn.discordapp.com"],
  },
};

export default nextConfig;
