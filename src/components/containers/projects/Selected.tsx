import { map } from 'lodash';
import CtaLink from '@/components/elements/CtaLink';
import Image from '@/components/elements/Image';
import Link from '@/components/elements/Link';
import useProjects from '@/content/projects';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/projects/selected.module.scss';
import { routes } from '@/utils';
import Section from '../Section';

export default function Selected() {
  const { t } = useTranslations();
  const { selected } = useProjects();

  return (
    <Section containerClassName={style.selectedWrapper}>
      <div className={style.selectedTextWrapper}>
        <span className={style.selectedTitle}>
          {t('projects.selected.section')}
        </span>
        <div className={style.selectedColumn}>
          <span className={style.selectedTitle}>
            {t('projects.selected.title')}
          </span>
          <CtaLink className={style.selectedCTA} href={routes.work}>
            {t('globals.see_all_projects')}
          </CtaLink>
        </div>
      </div>
      <div className={style.projectsWrapper}>
        {map(selected, (project) => (
          <Link
            key={project.slug}
            className={style.projectContainer}
            href={routes.project(project.slug)}
          >
            <Image
              className={style.projectCover}
              src={project.cover}
              alt={project.title}
            />
            <span className={style.projectTitle}>{project.title}</span>
          </Link>
        ))}
        <CtaLink className={style.selectedMobileCTA} href={routes.work}>
          {t('globals.see_all_projects')}
        </CtaLink>
      </div>
    </Section>
  );
}
