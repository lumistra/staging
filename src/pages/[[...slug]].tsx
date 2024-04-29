import { getStoryblokApi, useStoryblokState } from '@storyblok/react';
import {
  compact, get, includes, isEmpty, reduce,
} from 'lodash';
import Head from 'next/head';
import { defaultLocal } from '@/utils';
import type { Page as PageType } from '@/types/components';
import type { ISbStoryData } from '@storyblok/react';

type Props = {
  story: ISbStoryData<PageType>
};

export default function Page(props: Props) {
  const story = useStoryblokState(props.story);

  return (
    <main>
      <Head>
        <title>{get(story, 'content.title', 'Lumistra')}</title>
        <meta name="description" content={get(story, 'content.description', 'Lumistra')} />
      </Head>
      <h1>Page</h1>
    </main>
  );
}

type StaticProps = {
  params: {
    slug: string[]
  }
};

export async function getStaticProps(props: StaticProps) {
  const storyblokApi = getStoryblokApi();
  const slugPath = props.params.slug ? props.params.slug.join('/') : defaultLocal;
  const { data } = await storyblokApi.get(`cdn/stories/${slugPath}`, { version: 'published' });

  return {
    props: {
      story: data ? data.story : false,
    },
  };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get('cdn/links', { version: 'published' });
  const defaultLocalMatch = `/${defaultLocal}`;

  const paths = reduce(data.links, (res, link) => {
    if (link.is_folder) return res;

    if (includes(link.real_path, defaultLocalMatch)) {
      const [, ...slug] = link.real_path.replace(defaultLocalMatch, '').split('/');
      const slugPath = compact(slug);

      res = [...res, { params: { slug: isEmpty(slugPath) ? [''] : slugPath } }];
    }

    return [...res, { params: { slug: compact(link.real_path.split('/')) } }];
  }, [] as object[]);

  // console.log(paths.map((path) => path.params.slug));

  return {
    paths,
    fallback: false,
  };
}
