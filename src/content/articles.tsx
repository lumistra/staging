import { orderBy, take } from 'lodash';
import useTranslations from '@/hooks/useTranslations';
import type { Articles } from '@/types/articles';

export const getArticles = (t: Function): Articles => [
  {
    slug: 'design-for-digital-age',
    title: t('articles.article_1.title'),
    cover: '/assets/svg/placeholder.svg',
    author: 'Lumistra',
    publishedAt: '01.01.2024.',
  },
  {
    slug: 'shakespeare',
    title: t('articles.article_2.title'),
    cover: '/assets/svg/placeholder.svg',
    author: 'Lumistra',
    publishedAt: '01.01.2024.',
  },
  {
    slug: 'matt-willey',
    title: t('articles.article_3.title'),
    cover: '/assets/svg/placeholder.svg',
    author: 'Lumistra',
    publishedAt: '01.01.2024.',
  },
];

function useArticles() {
  const { t } = useTranslations();

  const articles = getArticles(t);

  const latest = take(orderBy(articles, (article) => new Date(article.publishedAt).getTime(), 'desc'), 3);

  return {
    articles,
    latest,
  };
}

export default useArticles;
