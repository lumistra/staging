import type { HeadlineData } from '@/types/articles';
import type { CMSLink, CTALinkData, StylingData } from '@/types/shared';
import type { ISbRichtext } from '@storyblok/react';

export type MetaData = {
  title?: string
  transitionTitle?: string
  description?: string
  keywords?: string
  author?: string
  email?: string
  article?: HeadlineData & {
    path: string
  }
};

export type HeroData = {
  title: string
  footnoteCTA?: string
  gradient: boolean
  spacingBottom: boolean
} & StylingData;

export type AboutSectionData = {
  title: string
  paragraph: ISbRichtext
} & StylingData;

export type AboutSplitData = {
  text: ISbRichtext
  cta?: [CTALinkData]
} & StylingData;

export type AnimatedLineData = {
  titleBefore: string
  titleAfter: string
  paragraph: string
  cta: [CTALinkData]
} & StylingData;

export type AltBackgroundSectionData = {
  title: string
  paragraph: string
  cta?: [CTALinkData] | []
  footnoteCTA?: string
  background: 'dark' | 'primary'
  gridParagraph: boolean
  animated: boolean
} & StylingData;

export type SelectionData = {
  heroHide: boolean
  heroTitle: string
  heroParagraph: ISbRichtext
  idleTitle: string
  idleParagraph: ISbRichtext
  positiveTitle: string
  positiveParagraph: ISbRichtext
  negativeTitle: string
  negativeParagraph: ISbRichtext
  inputStartText: string
  inputPlaceholder: string
  inputNoResults: string
  services: string
} & StylingData;

type WorkflowStepData = {
  title: string
  paragraph: string
};

export type WorkflowData = {
  title: string
  paragraph: ISbRichtext
  steps: WorkflowStepData[]
} & StylingData;

export type StatData = {
  statistic: string
  paragraph: string
  bottom?: string
};

export type StatsData = {
  cta?: string
  lineTop: boolean
  stats: StatData[]
} & StylingData;

export type BentoItemData = {
  title: string
  tags: string,
  link: CMSLink,
};

export type BentoData = {
  headline: ISbRichtext
  frames: BentoItemData
} & StylingData;

type PitchItemData = {
  title: string
  paragraph: string
};

export type PitchData = {
  items: PitchItemData[]
} & StylingData;

export type WantToPublishData = {
  background: 'dark' | 'gray'
  spacingTop: boolean
  title: string
  paragraph: ISbRichtext
} & StylingData;

type Serviceitem = {
  title: string,
  list: string,
};

export type WhatWeDoData = {
  title: string
  section: string
  paragraph: string
  services: Serviceitem[]
} & StylingData;

export type ContactData = {
  small: boolean
  noBorder: boolean
  mobileInvertColors: boolean
  title: string
  cta: [CTALinkData]
} & StylingData;
