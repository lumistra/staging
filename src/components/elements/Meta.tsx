import Head from 'next/head';
import { useRouter } from 'next/router';
import { email, keywords } from '@/content';
import type { MetaData } from '@/types/components';
import type { SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & MetaData
};

export default function Meta(props: Props) {
  const router = useRouter();

  return (
    <Head>
      <link rel="canonical" href={process.env.siteUrl + router.asPath} />

      {/* HTML Meta Tags */}
      {props.blok.title && (
        <title>{props.blok.title}</title>
      )}
      {props.blok.transitionTitle && (
        <meta name="transition-title" content={props.blok.transitionTitle} />
      )}
      {props.blok.description && (
        <meta name="description" content={props.blok.description} />
      )}
      {props.blok.keywords && (
        <meta name="keywords" content={props.blok.keywords || keywords} />
      )}
      {props.blok.author && (
        <meta name="author" content={props.blok.author} />
      )}
      {props.blok.email && (
        <meta name="email" content={props.blok.email} />
      )}

      {/* Open Graph Meta Tags */}
      {props.blok.title && (
        <meta key="og:title" property="og:title" content={props.blok.title} />
      )}
      {props.blok.title && (
        <meta key="og:renderedTitle" property="og:renderedTitle" content={props.blok.title} />
      )}
      {props.blok.description && (
        <meta key="og:description" property="og:description" content={props.blok.description} />
      )}
      {props.blok.keywords && (
        <meta key="og:keywords" property="og:keywords" content={props.blok.keywords || keywords} />
      )}

      {/* Twitter Meta Tags */}
      {props.blok.title && (
        <meta name="twitter:title" content={props.blok.title} />
      )}
      {props.blok.description && (
        <meta name="twitter:description" content={props.blok.description} />
      )}

      {/* Schema.org Tag */}
      <script
        key="schema.org"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            props.blok.article ? {
              '@context': 'https://schema.org',
              '@type': 'Article',
              image: props.blok.article.cover.filename,
              headline: props.blok.article.title,
              datePublished: new Date(props.blok.article.publishedAt).toISOString().split('T')[0],
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': process.env.siteUrl + router.asPath,
              },
              author: {
                '@type': 'Person',
                name: props.blok.article.author || 'Studio Lumistra',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Studio Lumistra',
                logo: `${process.env.siteUrl}/assets/svg/logotype-socials.svg`,
              },
            } : {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              description: props.blok.description || 'Creative design studio transforming sparks and ideas into brands and experiences.',
              email: props.blok.email || email,
              image: `${process.env.siteUrl}/assets/svg/logotype-socials.svg`,
              logo: `${process.env.siteUrl}/assets/svg/logotype-socials.svg`,
              name: 'Studio Lumistra',
              url: process.env.siteUrl,
            },
          ),
        }}
      />
    </Head>
  );
}
