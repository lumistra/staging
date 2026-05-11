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
    environment: process.env.ENVIRONMENT,
    storyblokApiToken: process.env.STORYBLOK_API_TOKEN,
    gtmId: process.env.GTM_ID,
    siteUrl: process.env.SITE_URL,
    mockApi: process.env.MOCK_API,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
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
