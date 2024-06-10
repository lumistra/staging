import Head from 'next/head';
import type { MetaData } from '@/types/components';
import type { SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & MetaData
};

export default function Meta(props: Props) {
  return (
    <Head>
      {props.blok.title && <title>{props.blok.title}</title>}
      {props.blok.transitionTitle && <meta name="transition-title" content={props.blok.transitionTitle} />}
    </Head>
  );
}
