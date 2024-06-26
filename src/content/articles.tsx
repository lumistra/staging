import { useState } from 'react';
import { orderBy, take } from 'lodash';
import type { Articles } from '@/types/articles';

export const getArticles = (): Articles => [
  {
    slug: 'the-timeless-charm-of-minimalist-branding',
    title: 'The Timeless Charm of Minimalist Branding',
    cover: process.env.mockApi ? '/assets/svg/placeholder.svg' : 'https://a.storyblok.com/f/286844/2000x980/585c7dbcea/sdl-web-polestar-15-e1542365545427-2000x980.jpg',
    author: 'Lumistra',
    publishedAt: '2024-07-05',
  },
  {
    slug: 'turning-ideas-into-memorable-brand-identities',
    title: 'Turning Ideas into Memorable Brand Identities',
    cover: process.env.mockApi ? '/assets/svg/placeholder.svg' : 'https://a.storyblok.com/f/286844/2000x1333/937dd3681b/sdl-web-bildmuseet-12-2000x1333-2000x1333.jpg',
    author: 'Lumistra',
    publishedAt: '2024-07-04',
  },
  {
    slug: 'decathlon-rebranded',
    title: 'In Case You Missed It: Decathlon rebranded',
    cover: process.env.mockApi ? '/assets/svg/placeholder.svg' : 'https://a.storyblok.com/f/286844/3000x2000/ab033ea4e0/dkt_cs_23_ready_to_play_3000x2000.jpg',
    author: 'Lumistra',
    publishedAt: '2024-06-24',
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
