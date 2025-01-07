import type { MetaData, WantToPublishData } from '@/types/components';
import type { CTALinkData, MediaData } from '@/types/shared';
import type { ISbStoryData, SbBlokData } from '@storyblok/react';

export type HeadlineData = {
  title: string
  author: string
  publishedAt: string
  cover: MediaData
};

export type ArticleData = {
  meta: [MetaData],
  headline: [HeadlineData],
  recommended: ISbStoryData<ArticleData>
  body: SbBlokData[],
};

export type LatestData = {
  title: string
  section: string
  cta: [CTALinkData]
  articles: ISbStoryData<ArticleData>[]
};

export type NewsData = {
  meta: [MetaData]
  latest: [LatestData]
  subTitle: string
  articles: ISbStoryData<ArticleData>[]
  wantToPublish: [WantToPublishData]
};
