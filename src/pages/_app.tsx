import { apiPlugin, storyblokInit } from '@storyblok/react';
import { get } from 'lodash';
import Head from 'next/head';
import components from '@/components';
import Page from './[[...slug]]';
import type { AppProps } from 'next/app';
import '@/styles/reset.scss';

storyblokInit({
  accessToken: process.env.storyblokApiToken,
  use: [apiPlugin],
  components: {
    page: Page,
    ...components,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" sizes="any" type="image/svg+xml" href={get(process.env, 'basePath', '') + '/favicon.svg'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
