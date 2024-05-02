/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  skipTrailingSlashRedirect: false,
  ...(process.env.BASE_PATH && { basePath: `/${process.env.BASE_PATH}` }),
  env: {
    basePath: `/${process.env.BASE_PATH}`,
    storyblokApiToken: process.env.STORYBLOK_API_TOKEN,
  },
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
