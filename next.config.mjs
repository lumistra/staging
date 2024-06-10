/** @type {import('next').NextConfig} */

const conditionalConfig = {
  ...(process.env.BASE_PATH && {
    basePath: `/${process.env.BASE_PATH}`,
    assetPrefix: `/${process.env.BASE_PATH}`,
  }),
};

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  skipTrailingSlashRedirect: false,
  ...conditionalConfig,
  env: {
    ...conditionalConfig,
    storyblokApiToken: process.env.STORYBLOK_API_TOKEN,
    mockApi: process.env.MOCK_API,
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
