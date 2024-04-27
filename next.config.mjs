/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  skipTrailingSlashRedirect: false,
  basePath: `/${process.env.BASE_PATH}`,
  env: {
    basePath: `/${process.env.BASE_PATH}`,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
