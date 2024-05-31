import Parser from 'html-react-parser';
import {
  compact, filter, flatten, forEach, isEmpty, isString, map, replace, split,
} from 'lodash';
import { getArticles } from '@/content/articles';
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
  article: (slug: string) => `/articles/${slug}`,
  privacyPolicy: '/privacy-policy',
};

const sitemap = [
  ...filter(routes, isString),
  ...map(getProjects(t), ({ slug }) => routes.project(slug)),
  ...map(getArticles(t), ({ slug }) => routes.article(slug)),
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

export const parseMarkdown = (markdown: string) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let input = markdown;
  input = replace(input, linkRegex, '<a href="$2" target="_blank">$1</a>');

  return Parser(input);
};
