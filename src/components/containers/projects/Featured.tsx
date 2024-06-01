import { useEffect, useState } from 'react';
import classNames from 'classnames';
import CtaLink from '@/components/elements/CtaLink';
import Image from '@/components/elements/Image';
import useProjects from '@/content/projects';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/projects/featured.module.scss';
import { getOrderNumber, routes } from '@/utils';
import Section from '../Section';

type Props = {
  className?: string
  textPosition: 'top' | 'bottom'
};

export default function Featured(props: Props) {
  const { t } = useTranslations();
  const { projects } = useProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = projects[currentIndex];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        if (newIndex >= projects.length) return 0;

        return newIndex;
      });
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [projects]);

  return (
    <Section containerClassName={classNames(style.featuredWrapper, props.className, {
      [style.featuredTop]: props.textPosition === 'top',
      [style.featuredBottom]: props.textPosition === 'bottom',
    })}
    >
      <div className={style.featuredTextWrapper}>
        <span>{currentProject.title}</span>
        <CtaLink className={style.desktopCTA} href={routes.project(currentProject.slug)}>
          {t('globals.see_full_project')}
        </CtaLink>
        <span className={style.featuredIndex}>
          {getOrderNumber(currentIndex, true)}
        </span>
      </div>
      <Image
        className={style.featuredCover}
        src={currentProject.cover}
        alt={currentProject.title}
      />
      <CtaLink className={style.mobileCTA} href={routes.project(currentProject.slug)}>
        {t('globals.see_full_project')}
      </CtaLink>
    </Section>
  );
}
