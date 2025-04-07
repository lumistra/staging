import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { get, isEmpty } from 'lodash';
import Section from '@/components/containers/Section';
import CtaLink from '@/components/elements/CtaLink';
import RichText from '@/components/elements/RichText';
import style from '@/styles/misc/about-split.module.scss';
import type { AboutSplitData } from '@/types/components';

type Props = {
  blok: SbBlokData & AboutSplitData
};

function AboutSplit(props: Props) {
  return (
    <Section
      componentId={props.blok.component}
      containerClassName={style.aboutSplitWrapper}
      style={props.blok.styling}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <RichText className={style.text}>{props.blok.text}</RichText>
      {!isEmpty(props.blok.cta) && (
        <CtaLink link={get(props.blok.cta, '[0].link')}>
          {get(props.blok.cta, '[0].text', '')}
        </CtaLink>
      )}
    </Section>
  );
}

export default AboutSplit;
