import type { SbBlokData } from '@storyblok/react';

export enum Icons {
  instagram = 'instagram',
  facebook = 'facebook',
  linkedin = 'linkedin',
  email = 'email',
  chat = 'chat',
  geometry = 'geometry',
  rocket = 'rocket',
}

export type MediaData = {
  id: number,
  alt: string | null,
  filename: string,
  copyright: string,
  meta_data: {
    alt: string,
    title: string,
    source: string,
    copyright: string
  },
};

export type CMSLink = {
  url?: string,
  email?: string,
  linktype: 'url' | 'email',
  target?: '_self' | '_blank',
};

export type LinkData = {
  label: string,
  icon: keyof typeof Icons,
  link: CMSLink,
};

export type CTALinkData = {
  text: string,
  link: CMSLink,
};

export type StyleData = { css?: string } & SbBlokData;

export type StylingData = {
  styling?: [StyleData]
};
