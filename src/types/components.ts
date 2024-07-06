import type { HeadlineData } from './articles';

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
