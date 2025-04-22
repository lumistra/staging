import { forEach, isArray } from 'lodash';
import { locales } from '@/hooks/useTranslations';
import type { ISbRichtext } from '@storyblok/react';

export const isProd = process.env.NODE_ENV === 'production';
export const storyVersion: 'published' | 'draft' = process.env.environment === 'production' ? 'published' : 'draft';
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

export const getOrderNumber = (index: number, brackets?: boolean): string => {
  const number = (index + 1).toString().padStart(2, '0');

  if (brackets) return '(' + number + ')';

  return number;
};

export const hasRichText = (document: ISbRichtext | undefined) => {
  if (!document?.content) return false;

  for (const item of document.content) {
    if (isArray(item.content) && item.content.length > 0) return true;
  }
};
