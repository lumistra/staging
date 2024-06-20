import { useEffect, useState } from 'react';
import { map } from 'lodash';
import CtaLink from '@/components/elements/CtaLink';
import Image from '@/components/elements/Image';
import Link from '@/components/elements/Link';
import SeeMore from '@/components/elements/SeeMore';
import useProjects from '@/content/projects';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/projects/selected.module.scss';
import { routes } from '@/utils';
import Section from '../Section';

export default function Selected() {
  const { t } = useTranslations();
  const { selected } = useProjects();
  const [modalShow, setModalShow] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = ({ x, y }: MouseEvent) => {
      setCursorPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  const handleShowModal = (shouldShow: boolean) => {
    setModalShow(shouldShow);
  };

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
      <SeeMore cursorPosition={cursorPosition} show={modalShow} />
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
              onMouseEnter={() => handleShowModal(true)}
              onMouseLeave={() => handleShowModal(false)}
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
