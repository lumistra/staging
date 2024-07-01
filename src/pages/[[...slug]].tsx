import { getStoryblokApi } from '@storyblok/react';
import StoryblokStory from '@storyblok/react/story';
import { includes, reduce, some } from 'lodash';
import Footer from '@/components/containers/Footer';
import Navigation from '@/components/containers/navigation/Navigation';
import CookieConsent from '@/components/elements/CookieConsent';
import PageTransition from '@/components/elements/PageTransition';
import Main from '@/components/pages/Main';
import { defaultLocale, locales } from '@/hooks/useTranslations';
import { generateStaticPaths, routes } from '@/utils';
import { article } from '../../__mocks__/article';
import { cmsLinks } from '../../__mocks__/links';
import { project } from '../../__mocks__/project';
import type { ISbStoryData } from '@storyblok/react';

type Props = {
  story: ISbStoryData | null
  slug: string
};

export default function Page(props: Props) {
  return (
    <>
      <div id="page-wrapper">
        <Navigation />
        {props.story ? (
          <StoryblokStory story={props.story} />
        ) : (
          <Main slug={props.slug} />
        )}
      </div>
      <Footer />
      <PageTransition />
      <CookieConsent />
    </>
  );
}

type StaticProps = {
  params: {
    slug: string[]
  }
};

export async function getStaticProps(props: StaticProps) {
  const storyblokApi = getStoryblokApi();
  const slug = props.params.slug ? props.params.slug.join('/') : '';
  const slugPath = slug ? `/${slug}` : '';
  const slugProp = `${slugPath}/`;

  const isArticleRoute = includes(slugPath, `${routes.articles}/`);
  const isProjectRoute = includes(slugPath, `${routes.work}/`);

  let apiPath;
  if (isArticleRoute || isProjectRoute) {
    const [slugLocale] = props.params.slug;
    const isSlugLocale = some(locales, (locale) => locale.value === slugLocale);

    apiPath = isSlugLocale ? slugPath : `${defaultLocale}${slugPath}`;
  }

  if (!isArticleRoute && !isProjectRoute) {
    return { props: { story: null, slug: slugProp } };
  }

  if (process.env.mockApi) {
    let story = null;
    switch (true) {
      case isArticleRoute:
        story = article;
        break;
      case isProjectRoute:
        story = project;
        break;
      default:
        story = null;
        break;
    }

    return { props: { story, slug: slugProp } };
  }

  const { data } = await storyblokApi.get(`cdn/stories/${apiPath}`, {
    resolve_relations: ['project.recommended', 'article.recommended'],
    version: 'published',
  });

  return { props: { story: data.story, slug: slugProp } };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  const { data } = process.env.mockApi ? { data: cmsLinks } : await storyblokApi.get('cdn/links', { version: 'published' });

  const links = reduce(data.links, (res, link) => {
    if (link.is_folder) return res;
    res.push(link.real_path as string);

    return res;
  }, [] as string[]);

  return {
    paths: generateStaticPaths(links),
    fallback: false,
  };
}
