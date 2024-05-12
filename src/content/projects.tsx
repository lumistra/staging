import { filter } from 'lodash';
import useTranslations from '@/hooks/useTranslations';
import type { Projects } from '@/types/projects';

export const getProjects = (t: Function): Projects => [
  {
    slug: 'apiar',
    title: t('projects.project_1.title'),
    cover: '/assets/svg/placeholder.svg',
    selected: true,
  },
  {
    slug: 'spika',
    title: t('projects.project_2.title'),
    cover: '/assets/svg/placeholder.svg',
    selected: true,
  },
  {
    slug: 'houndtrek',
    title: t('projects.project_3.title'),
    cover: '/assets/svg/placeholder.svg',
    selected: false,
  },
  {
    slug: 'the-lighthouse',
    title: t('projects.project_4.title'),
    cover: '/assets/svg/placeholder.svg',
    selected: false,
  },
  {
    slug: 'hoo-st-werburgh-battle-geese',
    title: t('projects.project_5.title'),
    cover: '/assets/svg/placeholder.svg',
    selected: false,
  },
  {
    slug: 'exit-osijek',
    title: t('projects.project_6.title'),
    cover: '/assets/svg/placeholder.svg',
    selected: true,
  },
  {
    slug: 'bergmann-hillebrand',
    title: t('projects.project_7.title'),
    cover: '/assets/svg/placeholder.svg',
    selected: false,
  },
  {
    slug: 'stereo',
    title: t('projects.project_8.title'),
    cover: '/assets/svg/placeholder.svg',
    selected: false,
  },
  {
    slug: 'soundgarden',
    title: t('projects.project_9.title'),
    cover: '/assets/svg/placeholder.svg',
    selected: false,
  },
  {
    slug: 'ritmo',
    title: t('projects.project_10.title'),
    cover: '/assets/svg/placeholder.svg',
    selected: false,
  },
];

function useProjects() {
  const { t } = useTranslations();

  const projects = getProjects(t);

  const selectedProjects = filter(projects, 'selected');

  return {
    projects,
    selectedProjects,
  };
}

export default useProjects;
