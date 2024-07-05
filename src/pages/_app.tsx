import { apiPlugin, storyblokInit } from '@storyblok/react';
import Head from 'next/head';
import components from '@/components';
import { email } from '@/content';
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
        <meta name="robots" content="noindex" />
        <link rel="icon" sizes="any" type="image/svg+xml" href="/favicon.svg" />

        {/* HTML Meta Tags */}
        <title>Lumistra</title>
        <meta name="transition-title" content="Lumistra" />
        <meta name="author" content="Lumistra" />
        <meta name="description" content="Creative design studio transforming sparks and ideas into brands and experiences." />
        <meta name="image" content="/assets/svg/logotype-socials.svg" />
        <meta name="keywords" content="" />
        <meta name="email" content={email} />
        <meta name="copyright" content={`Copyright © ${new Date().getFullYear()} Lumistra`} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Lumistra" />
        <meta property="og:renderedTitle" content="Lumistra" />
        <meta property="og:description" content="Creative design studio transforming sparks and ideas into brands and experiences." />
        <meta property="og:image" content="/assets/svg/logotype-socials.svg" />
        <meta property="og:logo" content="/assets/svg/logo-socials.svg" />
        <meta property="og:wideLogo" content="/assets/svg/logotype-socials.svg" />
        <meta property="og:url" content={process.env.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:keywords" content="" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content="Lumistra" />
        <meta name="twitter:description" content="Creative design studio transforming sparks and ideas into brands and experiences." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/assets/svg/logotype-socials.svg" />
        <meta property="twitter:url" content={process.env.siteUrl} />
        <meta property="twitter:domain" content={process.env.siteUrl?.replace('https://', '')} />

        {/* Schema.org Tag */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "image": "${process.env.siteUrl}/assets/svg/logotype-socials.svg",
            "logo": "${process.env.siteUrl}/assets/svg/logotype-socials.svg",
            "url": "${process.env.siteUrl}",
            "sameAs": [],
            "name": "Lumistra",
            "description": "Creative design studio transforming sparks and ideas into brands and experiences.",
            "email": "${email}"
        }`}
        </script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
