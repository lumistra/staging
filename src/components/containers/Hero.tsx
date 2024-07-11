import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import Arrow from '@/assets/svg/arrow.svg';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import style from '@/styles/hero.module.scss';
import Section from './Section';
import Gradient from '../elements/Gradient';
import TextMask from '../elements/TextMask';
import type { HeroData } from '@/types/components';

type Props = {
  blok: SbBlokData & HeroData
};

function Hero(props: Props) {
  useScrollAnimations({
    heroText: {
      animation: AnimationType.fadeUp,
      query: '.hero-animation-text',
      offset: 0,
    },
  });

  if (props.blok.gradient) {
    return (
      <Section
        className={style.heroGradientBackground}
        containerClassName={style.heroGradientWrapper}
        parentChildren={(<Gradient className={style.gradient} />)}
        storyblokEditable={storyblokEditable(props.blok)}
      >
        <TextMask identifier="hero-animation-text" className={style.heroGradientTitle}>
          <h1>{props.blok.title}</h1>
        </TextMask>
      </Section>
    );
  }

  return (
    <Section
      containerClassName={classNames(style.heroWrapper, {
        [style.spacingBottom]: props.blok.spacingBottom,
      })}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <TextMask identifier="hero-animation-text" className={style.heroTitle}>
        <h1>{props.blok.title}</h1>
      </TextMask>
      {props.blok.footnoteCTA && (
        <TextMask identifier="hero-animation-text">
          <span className={style.heroFootnote}>
            {props.blok.footnoteCTA}
            <Arrow />
          </span>
        </TextMask>
      )}
    </Section>
  );
}

export default Hero;
