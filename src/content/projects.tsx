import { useState } from 'react';
import { filter } from 'lodash';
import useTranslations from '@/hooks/useTranslations';
import type { Projects } from '@/types/projects';

export const getProjects = (t: Function): Projects => [
  {
    slug: 'apiar',
    title: t('projects.project_1.title'),
    cover: process.env.mockApi ? '/assets/svg/placeholder.svg' : 'https://a.storyblok.com/f/286844/1920x1080/3440567a13/apiar-case-1.webp',
    selected: true,
  },
  {
    slug: 'houndtrek',
    title: t('projects.project_2.title'),
    cover: process.env.mockApi ? '/assets/svg/placeholder.svg' : 'https://a.storyblok.com/f/286844/1920x1080/92e99a698b/houndtrek-case-1.webp',
    selected: true,
  },
  {
    slug: 'battlegeese',
    title: t('projects.project_3.title'),
    cover: process.env.mockApi ? '/assets/svg/placeholder.svg' : 'https://a.storyblok.com/f/286844/1920x1080/255e944c4f/battlegeese-case-1.webp',
    selected: true,
  },
  {
    slug: 'exit-osijek',
    title: t('projects.project_4.title'),
    cover: process.env.mockApi ? '/assets/svg/placeholder.svg' : 'https://a.storyblok.com/f/286844/1920x1080/1d0a4e6c95/exit-case-1.webp',
    selected: false,
  },
  {
    slug: 'stereo-osijek',
    title: t('projects.project_5.title'),
    cover: process.env.mockApi ? '/assets/svg/placeholder.svg' : 'https://a.storyblok.com/f/286844/1920x1080/337c91777b/stereo-case-1.webp',
    selected: false,
  },
];

function useProjects() {
  const { t } = useTranslations();
  const [projects] = useState(getProjects(t));

  const selected = filter(projects, 'selected');

  return {
    projects,
    selected,
  };
}

export default useProjects;
