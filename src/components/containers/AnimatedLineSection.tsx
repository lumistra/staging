import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import Section from '@/components/containers/Section';
import CtaLink from '@/components/elements/CtaLink';
import TextMask from '@/components/elements/TextMask';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import style from '@/styles/home.module.scss';
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
      componentId={props.blok.component}
      containerClassName={style.aboutUsWrapper}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <h5>
        {props.blok.titleBefore}
        <hr className={style.aboutUsLineWrapper} />
      </h5>
      <h5>{props.blok.titleAfter}</h5>
      <div className={style.aboutUsContentWrapper}>
        <TextMask animationClass="animation-base animated-line-section-paragraph">
          <p>{props.blok.paragraph}</p>
        </TextMask>
        <TextMask animationClass="animation-base animated-line-section-cta">
          <CtaLink link={props.blok.cta[0].link}>
            {props.blok.cta[0].text}
          </CtaLink>
        </TextMask>
      </div>
    </Section>
  );
}

export default AnimatedLineSection;
