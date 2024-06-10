import type { MetaData } from './components';
import type { CMSImage } from './shared';
import type { ISbRichtext, ISbStoryData, SbBlokData } from '@storyblok/react';

export type Project = {
  title: string,
  slug: string,
  cover: string,
  selected: boolean,
};

export type Projects = Project[];

export type OverviewData = {
  cover: CMSImage
  title: string
  paragraph: ISbRichtext
};

export type ProjectData = {
  meta: [MetaData],
  overview: [OverviewData],
  recommended: ISbStoryData<ProjectData>
  body: SbBlokData[],
};
