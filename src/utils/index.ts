import {
  compact, filter, flatten, forEach, isEmpty, isString, map, split,
} from 'lodash';
import { getProjects } from '@/content/projects';
import { locales, t } from '@/hooks/useTranslations';

export const routes = {
  home: '/',
  work: '/work',
  project: (slug: string) => `/work/${slug}`,
  about: '/about',
  contact: '/contact',
  services: '/services',
  articles: '/articles',
  privacyPolicy: '/privacy-policy',
};

const sitemap = [
  ...filter(routes, isString),
  ...map(getProjects(t), ({ slug }) => routes.project(slug)),
];

export const generateStaticPaths = () => flatten(map(sitemap, (route) => map(locales, (locale) => {
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

export const getOrderNumber = (index: number): string => '(' + (index + 1).toString().padStart(2, '0') + ')';
