import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import Image from '@/components/elements/Image';
import RichText from '@/components/elements/RichText';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/project.module.scss';
import Section from '../Section';
import type { OverviewData } from '@/types/projects';

type Props = {
  blok: SbBlokData & OverviewData
};

export default function Overview(props: Props) {
  const { t } = useTranslations();

  return (
    <Section containerClassName={style.heroWrapper} storyblokEditable={storyblokEditable(props.blok)}>
      <Image
        className={style.heroCover}
        src={props.blok.cover.filename}
        alt={props.blok.cover.alt}
      />
      <div className={style.heroContentWrapper}>
        <span className={style.heroLabel}>{t('projects.overview')}</span>
        <div className={style.heroContent}>
          <h1 className={style.heroTitle}>{props.blok.title}</h1>
          <RichText className={style.heroParagraph}>{props.blok.paragraph}</RichText>
        </div>
      </div>
    </Section>
  );
}
