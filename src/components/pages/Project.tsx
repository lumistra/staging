import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { get, isArray, map } from 'lodash';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/project.module.scss';
import { routes } from '@/utils';
import Section from '../containers/Section';
import CtaLink from '../elements/CtaLink';
import Image from '../elements/Image';
import Link from '../elements/Link';
import type { OverviewData, ProjectData } from '@/types/projects';
import type { SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & ProjectData
};

export default function Project(props: Props) {
  const { t } = useTranslations();
  const recommended = isArray(props.blok.recommended)
    ? props.blok.recommended[0]
    : props.blok.recommended;
  const recommendedProject = get(recommended, 'content.overview[0]', null) as OverviewData | null;
  const project = props.blok;

  return (
    <main {...storyblokEditable(props.blok)}>
      {map(project.meta, (meta: SbBlokData) => (
        <StoryblokComponent key={meta._uid} blok={meta} />
      ))}

      {map(project.overview, (overview: SbBlokData) => (
        <StoryblokComponent key={overview._uid} blok={overview} />
      ))}

      <Section containerClassName={style.projectWrapper}>
        {map(project.body, (component) => (
          <StoryblokComponent key={component._uid} blok={component} />
        ))}
      </Section>

      {recommended && recommendedProject && (
        <Section containerClassName={style.recommendedWrapper}>
          <div className={style.recommendedHeader}>
            <span className={style.recommendedTitle}>{recommendedProject.title}</span>
            <CtaLink className={style.recommendedCTA} href={routes.project(recommended.slug)}>
              {t('globals.next_project')}
            </CtaLink>
          </div>
          <Link href={routes.project(project.recommended.slug)}>
            <Image
              className={style.recommendedCover}
              src={recommendedProject.cover.filename}
              alt={recommendedProject.cover.alt}
            />
          </Link>
        </Section>
      )}
    </main>
  );
}
