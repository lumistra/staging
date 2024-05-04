import {
  compact, isEmpty, map, split,
} from 'lodash';
import { locales } from '@/hooks/useTranslations';

export const routes = {
  home: '/',
  work: '/work',
  about: '/about',
  contact: '/contact',
  services: '/services',
  articles: '/articles',
};

export const generateStaticPaths = (route: string) => map(locales, (locale) => {
  const slug = compact(split(route, '/'));

  return {
    params: {
      slug: locale.default
        ? [isEmpty(slug) ? '' : slug]
        : [locale.value, ...slug],
    },
  };
});
