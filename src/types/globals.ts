import type { CMSLink, LinkData } from '@/types/shared';

export type SidenavData = {
  sitemap: LinkData[]
  socials: LinkData[]
  socialsLabel: string
  darkModeOn?: 'ON',
  darkModeOff?: 'OFF',
  darkModeLabel?: 'Dark mode',
  darkModeEnabled?: boolean,
  cta?: CMSLink
};

export type NavigationData = {
  links: LinkData[]
  sidenav: [SidenavData]
};

export type FooterData = {
  socialsLabel: string
  socialsLinks: LinkData[]
  sitemap: LinkData[]
};
