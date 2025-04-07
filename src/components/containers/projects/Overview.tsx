import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import Section from '@/components/containers/Section';
import Lightbox from '@/components/elements/Lightbox';
import Media from '@/components/elements/Media';
import RichText from '@/components/elements/RichText';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/projects/project.module.scss';
import type { OverviewData } from '@/types/projects';

type Props = {
  blok: SbBlokData & OverviewData
};

export default function Overview(props: Props) {
  const { t } = useTranslations();

  return (
    <Section
      componentId={props.blok.component}
      containerClassName={style.heroWrapper}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <Lightbox image={props.blok.cover}>
        <Media
          className={style.heroCover}
          src={props.blok.cover.filename}
          alt={props.blok.cover.alt}
        />
      </Lightbox>
      <div className={style.heroContentWrapper}>
        <span className={style.heroLabel}>{t('globals.overview')}</span>
        <div className={style.heroContent}>
          <h1 className={style.heroTitle}>{props.blok.title}</h1>
          <RichText className={style.heroParagraph}>{props.blok.paragraph}</RichText>
        </div>
      </div>
    </Section>
  );
}
