export type Image = {
  src: string,
  alt: string,
};

export type CMSImage = {
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
