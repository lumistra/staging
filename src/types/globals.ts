import type { CMSLink, LinkData } from './shared';

export type SidenavData = {
  sitemap: LinkData[]
  socials: LinkData[]
  cta: CMSLink
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
