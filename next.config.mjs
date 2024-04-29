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
};

export default nextConfig;
