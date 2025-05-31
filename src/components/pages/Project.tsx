import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { get, map } from 'lodash';
import Section from '@/components/containers/Section';
import CtaLink from '@/components/elements/CtaLink';
import Link from '@/components/elements/Link';
import Media from '@/components/elements/Media';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/projects/project.module.scss';
import { routes } from '@/utils';
import type { OverviewData, ProjectData } from '@/types/projects';
import type { SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & ProjectData
};

export default function Project(props: Props) {
  const { t } = useTranslations();
  const { recommended } = props.blok;
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

      <div className={style.projectWrapper}>
        {map(project.body, (component) => (
          <StoryblokComponent key={component._uid} blok={component} />
        ))}
      </div>

      {recommended && recommendedProject && (
        <Section componentId={props.blok.component}>
          <Link className={style.recommendedWrapper} href={routes.project(recommended.slug)}>
            <div className={style.recommendedHeader}>
              <span className={style.recommendedTitle}>{recommendedProject.title}</span>
              <CtaLink className={style.recommendedCTA}>
                {t('globals.next_project')}
              </CtaLink>
            </div>
            <Media
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
