import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import style from '@/styles/about.module.scss';
import Section from './Section';
import RichText from '../elements/RichText';
import type { AboutSectionData } from '@/types/components';

type Props = {
  blok: SbBlokData & AboutSectionData
};

function AboutSection(props: Props) {
  return (
    <Section containerClassName={style.aboutWrapper} storyblokEditable={storyblokEditable(props.blok)}>
      <h3>{props.blok.title}</h3>
      <RichText className={style.aboutParagraph}>{props.blok.paragraph}</RichText>
    </Section>
  );
}

export default AboutSection;
