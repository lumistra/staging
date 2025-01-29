import type { ContactData, HeroData, MetaData } from '@/types/components';
import type { CTALinkData, MediaData, StylingData } from '@/types/shared';
import type { ISbRichtext, ISbStoryData, SbBlokData } from '@storyblok/react';

export type OverviewData = {
  cover: MediaData
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
  sectionCTA?: [CTALinkData] | [],
  textPosition?: 'top' | 'bottom'
  projectCTA?: string,
  showProjectCTA?: 'all' | 'desktop' | 'mobile' | 'none',
  projects: ISbStoryData<ProjectData>[]
} & StylingData;

export enum View {
  grid = 'grid',
  list = 'list',
}

export type SelectedData = {
  title: string
  section: string
  cta: [CTALinkData]
  projects: ISbStoryData<ProjectData>[]
  hideTopBorder: boolean
  view: keyof typeof View
} & StylingData;

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
