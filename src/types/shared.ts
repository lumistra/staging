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
  url: string,
  email: string,
  linktype: 'url' | 'email',
  target?: '_self' | '_blank',
};

export type LinkData = {
  label: string,
  icon: 'instagram' | 'facebook' | 'linkedin',
  link: CMSLink,
};

export type CTALinkData = {
  text: string,
  link: CMSLink,
};
