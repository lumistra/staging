import type { MetaData } from '@/types/components';
import type { SbBlokData } from '@storyblok/react';

export type PageData = {
  meta: [MetaData]
  body: Array<SbBlokData>
};
