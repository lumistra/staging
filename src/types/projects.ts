import type { ContactData, HeroData, MetaData } from './components';
import type { CTALinkData, ImageData } from './shared';
import type { ISbRichtext, ISbStoryData, SbBlokData } from '@storyblok/react';

export type OverviewData = {
  cover: ImageData
  title: string
  paragraph: ISbRichtext
};

export type ProjectData = {
  meta: [MetaData],
  overview: [OverviewData],
  recommended: ISbStoryData<ProjectData>
  body: SbBlokData[],
};

export type FeaturedData = {
  show?: boolean,
  title?: string,
  sectionCTA?: [CTALinkData],
  textPosition?: 'top' | 'bottom'
  projectCTA: string,
  projects: ISbStoryData<ProjectData>[]
};

export type SelectedData = {
  title: string
  section: string
  cta: [CTALinkData]
  projects: ISbStoryData<ProjectData>[]
  hideTopBorder: boolean
};

export enum View {
  grid = 'grid',
  list = 'list',
}

export type WorkData = {
  meta: [MetaData]
  hero: [HeroData]
  viewModeLabel: string
  listLabel: string
  gridLabel: string
  defaultView: keyof typeof View
  projects: ISbStoryData<ProjectData>[]
  contact: [ContactData]
};
