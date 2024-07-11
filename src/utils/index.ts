import {
  compact, forEach, includes, map, split,
} from 'lodash';
import { defaultLocale, locales } from '@/hooks/useTranslations';

export const isProd = process.env.NODE_ENV === 'production';

export const routes = {
  mocks: {
    home: '/',
    news: '/news',
    work: '/work',
    about: '/about',
    contact: '/contact',
    services: '/services',
  },
  expected: {
    news: '/news',
    work: '/work',
    articles: '/articles',
    projects: '/projects',
  },
  privacyPolicy: '/privacy-policy',
  article: (slug: string) => `/articles/${slug}`,
  project: (slug: string) => `/projects/${slug}`,
};

export const getRawPath = (path: string, stripLocale: boolean = true) => {
  let newPath = path;
  if (newPath.match(/[#?].*/)) {
    newPath = newPath.replace(/[#?].*/, '');
  }
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

export const generateStaticPaths = (cmsLinks: string[]) => {
  const defaultLocaleMatch = `/${defaultLocale}`;

  const staticLinks = [{ params: { slug: ['privacy-policy'] } }];

  const dynamicLinks = map(cmsLinks, (link) => {
    const isDefaultLocaleRoute = includes(link, defaultLocaleMatch);
    const slugPath = getRawPath(link, isDefaultLocaleRoute);

    return { params: { slug: compact(split(slugPath, '/')) } };
  });

  return [...staticLinks, ...dynamicLinks];
};

export const getOrderNumber = (index: number, brackets?: boolean): string => {
  const number = (index + 1).toString().padStart(2, '0');

  if (brackets) return '(' + number + ')';

  return number;
};
