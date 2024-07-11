import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import style from '@/styles/home.module.scss';
import Section from './Section';
import CtaLink from '../elements/CtaLink';
import TextMask from '../elements/TextMask';
import type { AnimatedLineData } from '@/types/components';

type Props = {
  blok: SbBlokData & AnimatedLineData
};

function AnimatedLineSection(props: Props) {
  useScrollAnimations({
    paragraph: {
      animation: AnimationType.fadeUp,
      query: '.animated-line-section-paragraph',
      offset: 50,
    },
    cta: {
      animation: AnimationType.fadeUp,
      query: '.animated-line-section-cta',
      offset: 0,
    },
  });

  return (
    <Section
      containerClassName={style.aboutUsWrapper}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <h5>
        {props.blok.titleBefore}
        <hr className={style.aboutUsLineWrapper} />
      </h5>
      <h5>{props.blok.titleAfter}</h5>
      <div className={style.aboutUsContentWrapper}>
        <TextMask identifier="animated-line-section-paragraph">
          <p>{props.blok.paragraph}</p>
        </TextMask>
        <TextMask identifier="animated-line-section-cta">
          <CtaLink link={props.blok.cta[0].link}>
            {props.blok.cta[0].text}
          </CtaLink>
        </TextMask>
      </div>
    </Section>
  );
}

export default AnimatedLineSection;
