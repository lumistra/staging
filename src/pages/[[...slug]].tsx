import fs from 'fs';
import { getStoryblokApi } from '@storyblok/react';
import { StoryblokStory } from '@storyblok/react/rsc';
import {
  flatten, includes, reduce, some,
} from 'lodash';
import CookieConsent from '@/components/elements/CookieConsent';
import PageTransition from '@/components/elements/PageTransition';
import PrivacyPolicy from '@/components/pages/PrivacyPolicy';
import { defaultLocale, locales } from '@/hooks/useTranslations';
import { routes, storyVersion } from '@/utils';
import { generateGlobals, generateStaticPaths } from '@/utils/build';
import { footer as footerMock } from '@mocks/footer';
import { header as headerMock } from '@mocks/header';
import { mockRouter } from '@mocks/index';
import { cmsLinks } from '@mocks/links';
import type { ISbStoryData } from '@storyblok/react';

type Props = {
  header: ISbStoryData
  footer: ISbStoryData
  page: ISbStoryData | null
};

export default function Page(props: Props) {
  return (
    <>
      <div id="page-wrapper">
        <StoryblokStory story={props.header} />
        {props.page ? (
          <StoryblokStory story={props.page} />
        ) : (
          <PrivacyPolicy />
        )}
      </div>
      <StoryblokStory story={props.footer} />
      <PageTransition />
      <CookieConsent />
    </>
  );
}

type StaticProps = {
  params: {
    slug?: string[]
  }
};

export async function getStaticProps(props: StaticProps) {
  const storyblokApi = getStoryblokApi();

  const [slugLocale] = props.params.slug || [''];
  const isSlugLocale = some(locales, (locale) => locale.value === slugLocale);
  const locale = isSlugLocale ? slugLocale : defaultLocale;

  const slug = props.params.slug ? props.params.slug.join('/') : '';
  const slugPath = slug ? `/${slug}` : '';
  const apiPath = isSlugLocale ? slugPath : `${defaultLocale}${slugPath}`;

  const header = process.env.mockApi ? headerMock : JSON.parse(fs.readFileSync(`${process.cwd()}/tmp/${locale}/header.json`, 'utf-8'));
  const footer = process.env.mockApi ? footerMock : JSON.parse(fs.readFileSync(`${process.cwd()}/tmp/${locale}/footer.json`, 'utf-8'));

  if (process.env.mockApi) {
    const page = mockRouter(slugPath);

    return {
      props: {
        header,
        footer,
        page,
      },
    };
  }

  const { data: page } = slugPath === routes.privacyPolicy
    ? { data: { story: null } }
    : await storyblokApi.get(`cdn/stories/${apiPath}`, {
      version: storyVersion,
      resolve_relations: [
        'work.projects',
        'featured.projects',
        'selected.projects',
        'news.articles',
        'latest.articles',
        'project.recommended',
        'article.recommended',
      ],
    });

  return {
    props: {
      header,
      footer,
      page: page.story,
    },
  };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  const response = process.env.mockApi ? cmsLinks : await storyblokApi.getAll('cdn/links', { version: storyVersion });
  await generateGlobals(storyblokApi);

  const links = reduce(flatten(response), (res, link) => {
    if (link.is_folder) return res;
    if (includes(link.slug, '/global')) return res;
    res.push(link.real_path as string);

    return res;
  }, [] as string[]);

  return {
    paths: generateStaticPaths(links),
    fallback: false,
  };
}
