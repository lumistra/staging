import { apiPlugin, storyblokInit } from '@storyblok/react';
import Head from 'next/head';
import components from '@/components';
import { email, keywords } from '@/content';
import type { AppProps } from 'next/app';
import '@/styles/main.scss';

storyblokInit({
  accessToken: process.env.storyblokApiToken,
  use: [apiPlugin],
  components,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content={process.env.environment === 'production' ? 'index, follow' : 'noindex, nofollow'} />
        <link rel="icon" sizes="any" type="image/svg+xml" href="/favicon.svg" />

        {/* HTML Meta Tags */}
        <title>Lumistra - Creative Design Studio</title>
        <meta name="transition-title" content="Lumistra" />
        <meta name="author" content="Lumistra" />
        <meta name="description" content="Creative design studio transforming sparks and ideas into brands and experiences." />
        <meta name="keywords" content={keywords} />
        <meta name="email" content={email} />
        <meta name="copyright" content={`Copyright © ${new Date().getFullYear()} Lumistra`} />
        <meta name="image" content="/assets/svg/logotype-socials.svg" />

        {/* Open Graph Meta Tags */}
        <meta key="og:title" property="og:title" content="Lumistra - Creative Design Studio" />
        <meta key="og:renderedTitle" property="og:renderedTitle" content="Lumistra - Creative Design Studio" />
        <meta key="og:description" property="og:description" content="Creative design studio transforming sparks and ideas into brands and experiences." />
        <meta key="og:keywords" property="og:keywords" content={keywords} />
        <meta property="og:url" content={process.env.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:logo" content="/assets/svg/logo-socials.svg" />
        <meta property="og:wideLogo" content="/assets/svg/logotype-socials.svg" />
        <meta property="og:image" content="/assets/svg/logotype-socials.svg" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content="Lumistra - Creative Design Studio" />
        <meta name="twitter:description" content="Creative design studio transforming sparks and ideas into brands and experiences." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/assets/svg/logotype-socials.svg" />
        <meta property="twitter:url" content={process.env.siteUrl} />
        <meta property="twitter:domain" content={process.env.siteUrl?.replace('https://', '')} />

        {/* Schema.org Tag */}
        <script
          key="schema.org"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                description: 'Creative design studio transforming sparks and ideas into brands and experiences.',
                email,
                image: `${process.env.siteUrl}/assets/svg/logotype-socials.svg`,
                logo: `${process.env.siteUrl}/assets/svg/logotype-socials.svg`,
                name: 'Studio Lumistra',
                url: process.env.siteUrl,
              },
            ),
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
