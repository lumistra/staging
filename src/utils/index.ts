import {
  compact, flatten, forEach, isEmpty, map, split,
} from 'lodash';
import { locales } from '@/hooks/useTranslations';

export const routes = {
  home: '/',
  work: '/work',
  about: '/about',
  contact: '/contact',
  services: '/services',
  articles: '/articles',
  privacyPolicy: '/privacy-policy',
};

export const generateStaticPaths = () => flatten(map(routes, (route) => map(locales, (locale) => {
  const slug = compact(split(route, '/'));
  let slugPath;
  if (locale.default) {
    slugPath = isEmpty(slug) ? [''] : slug;
  } else {
    slugPath = [locale.value, ...slug];
  }

  return { params: { slug: slugPath } };
})));

export const getRawPath = (path: string, stripLocale: boolean = true) => {
  let newPath = path;
  if (stripLocale) {
    forEach(locales, (locale) => {
      newPath = newPath.replace(`/${locale.value}`, '');
    });
  }
  if (newPath.length > 1 && newPath.endsWith('/')) {
    newPath = newPath.slice(0, -1);
  }

  return newPath;
};
