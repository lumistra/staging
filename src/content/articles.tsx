import { useState } from 'react';
import { orderBy, take } from 'lodash';
import type { Articles } from '@/types/articles';

export const getArticles = (): Articles => [
  {
    slug: 'decathlon-rebranded',
    title: 'In Case You Missed It: Decathlon rebranded',
    cover: process.env.mockApi ? '/assets/svg/placeholder.svg' : 'https://a.storyblok.com/f/286844/3000x2000/ab033ea4e0/dkt_cs_23_ready_to_play_3000x2000.jpg',
    author: 'Lumistra',
    publishedAt: '24.06.2024.',
  },
  {
    slug: 'shakespeare',
    title: 'Shakespeare in the Parks 2024',
    cover: '/assets/svg/placeholder.svg',
    author: 'Lumistra',
    publishedAt: '01.01.2024.',
  },
];

function useArticles() {
  const [articles] = useState(getArticles());

  const latest = take(orderBy(articles, (article) => new Date(article.publishedAt).getTime(), 'desc'), 3);

  return {
    articles,
    latest,
  };
}

export default useArticles;
