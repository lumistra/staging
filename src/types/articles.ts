import type { MetaData } from './components';
import type { CMSImage } from './shared';
import type { ISbStoryData, SbBlokData } from '@storyblok/react';

export type Article = {
  author: string,
  cover: string,
  publishedAt: string,
  slug: string,
  title: string,
};

export type Articles = Article[];

export type HeadlineData = {
  title: string
  author: string
  publishedAt: string
  cover: CMSImage
};

export type ArticleData = {
  meta: [MetaData],
  headline: [HeadlineData],
  recommended: ISbStoryData<ArticleData>
  body: SbBlokData[],
};
