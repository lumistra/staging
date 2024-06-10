import { apiPlugin, storyblokInit } from '@storyblok/react';
import Head from 'next/head';
import components from '@/components';
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
        <link rel="icon" sizes="any" type="image/svg+xml" href={(process.env.basePath || '') + '/favicon.svg'} />
        <title>Lumistra</title>
        <meta name="description" content="Lumistra" />
        <meta name="transition-title" content="Lumistra" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
