import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import Section from '@/components/containers/Section';
import RichText from '@/components/elements/RichText';
import style from '@/styles/about.module.scss';
import type { AboutSectionData } from '@/types/components';

type Props = {
  blok: SbBlokData & AboutSectionData
};

function AboutSection(props: Props) {
  return (
    <Section
      componentId={props.blok.component}
      containerClassName={style.aboutWrapper}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <h3>{props.blok.title}</h3>
      <RichText className={style.aboutParagraph}>{props.blok.paragraph}</RichText>
    </Section>
  );
}

export default AboutSection;
