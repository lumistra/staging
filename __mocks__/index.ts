import { includes } from 'lodash';
import { routes } from '@/utils';
import { about } from '@mocks/about';
import { article } from '@mocks/article';
import { contact } from '@mocks/contact';
import { home } from '@mocks/home';
import { lab } from '@mocks/lab';
import { news } from '@mocks/news';
import { project } from '@mocks/project';
import { services } from '@mocks/services';
import { work } from '@mocks/work';

export const mockRouter = (slugPath: string) => {
  switch (true) {
    case includes(slugPath, `${routes.mocks.articles}/`):
      return article;

    case includes(slugPath, `${routes.mocks.projects}/`):
      return project;

    case slugPath === routes.mocks.news:
      return news;

    case slugPath === routes.mocks.work:
      return work;

    case slugPath === routes.mocks.lab:
      return lab;

    case slugPath === routes.mocks.services:
      return services;

    case slugPath === routes.mocks.about:
      return about;

    case slugPath === routes.mocks.contact:
      return contact;

    case !slugPath:
      return home;

    default:
      return null;
  }
};
