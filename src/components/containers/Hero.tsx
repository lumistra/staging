import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import Arrow from '@/assets/svg/arrow.svg';
import Section from '@/components/containers/Section';
import Gradient from '@/components/elements/Gradient';
import TextMask from '@/components/elements/TextMask';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import style from '@/styles/hero.module.scss';
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
        componentId={props.blok.component}
        className={style.heroGradientBackground}
        containerClassName={style.heroGradientWrapper}
        style={props.blok.styling}
        parentChildren={(<Gradient className={style.gradient} />)}
        storyblokEditable={storyblokEditable(props.blok)}
      >
        <TextMask animationClass="animation-base hero-animation-text" className={style.heroGradientTitle}>
          <h1>{props.blok.title}</h1>
        </TextMask>
      </Section>
    );
  }

  return (
    <Section
      componentId={props.blok.component}
      containerClassName={classNames(style.heroWrapper, {
        [style.spacingBottom]: props.blok.spacingBottom,
      })}
      style={props.blok.styling}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <TextMask animationClass="animation-base hero-animation-text" className={style.heroTitle}>
        <h1>{props.blok.title}</h1>
      </TextMask>
      {props.blok.footnoteCTA && (
        <TextMask animationClass="animation-base hero-animation-text">
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
