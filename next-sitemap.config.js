/** @type {import('next-sitemap').IConfig} */
const privatePages = [
  '/locales/*',
  '/500/',
  '/404/',
];

module.exports = {
  siteUrl: process.env.SITE_URL,
  exclude: privatePages,
  changefreq: 'monthly',
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: privatePages,
      },
    ],
  },
  output: 'export',
  outDir: 'out',
};
