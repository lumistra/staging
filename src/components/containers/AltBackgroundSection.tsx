import { useRef, useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import {
  floor, get, isEmpty, map,
} from 'lodash';
import Arrow from '@/assets/svg/arrow.svg';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import style from '@/styles/alt-background.module.scss';
import Section from './Section';
import CtaLink from '../elements/CtaLink';
import TextMask from '../elements/TextMask';
import type { AltBackgroundSectionData } from '@/types/components';

type Props = {
  blok: SbBlokData & AltBackgroundSectionData
};

function AltBackgroundSection(props: Props) {
  const [wordIndex, setWordIndex] = useState(-1);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const words = props.blok.title.split(' ');

  useScrollAnimations({
    altBackgroundCTA: {
      animation: AnimationType.fadeUp,
      query: '.alt-background-animation',
      offset: 100,
    },
  }, () => {
    if (!props.blok.animated || !containerRef.current || !titleRef.current) return null;

    const containerHeight = containerRef.current.clientHeight;
    const titleStartPosition = titleRef.current.offsetTop;
    const animationStartPosition = floor(titleStartPosition + (containerHeight * 0.3), 0);
    const animationEndPosition = floor(animationStartPosition + (containerHeight * 0.4), 0);
    const stepPerWord = floor((animationEndPosition - animationStartPosition) / words.length, 0);

    const scrollBottomPosition = window.scrollY + window.innerHeight;
    const scrollIntersectionPosition = scrollBottomPosition - animationStartPosition;
    if (scrollIntersectionPosition < 0) return;

    const wordsAffected = floor(scrollIntersectionPosition / stepPerWord, 0);
    if (wordsAffected > words.length) return;
    setWordIndex((prevWordIndex) => (prevWordIndex === words.length ? prevWordIndex : wordsAffected));
  });

  return (
    <Section
      ref={containerRef}
      className={classNames(style.altBackgroundWrapper, {
        [style.darkBackground]: props.blok.background === 'dark',
        [style.primaryBackground]: props.blok.background === 'primary',
      })}
      containerClassName={style.altBackgroundContainer}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <h3 ref={titleRef} className={style.altBackgroundTitle}>
        {props.blok.animated && map(words, (word, index) => (
          <span
            key={index}
            className={classNames(style.altBackgroundWord, {
              [style.active]: index <= wordIndex,
            })}
          >
            {word}{' '}
          </span>
        ))}
        {!props.blok.animated && (props.blok.title)}
      </h3>
      <div className={classNames({
        'animation-fade-in': props.blok.animated,
        'animate-in': props.blok.animated && wordIndex >= words.length,
      })}
      >
        <p className={classNames(style.altBackgroundParagraph, {
          [style.gridParagraph]: props.blok.gridParagraph,
        })}
        >
          {props.blok.paragraph}
        </p>
      </div>
      {!isEmpty(props.blok.cta) && (
        <CtaLink
          className={style.altBackgroundCTA}
          link={get(props.blok.cta, '[0].link')}
        >
          {get(props.blok.cta, '[0].text', '')}
        </CtaLink>
      )}
      {props.blok.footnoteCTA && (
        <TextMask identifier="alt-background-animation">
          <span className={style.altBackgroundFootnote}>
            {props.blok.footnoteCTA}
            <Arrow />
          </span>
        </TextMask>
      )}
    </Section>
  );
}

export default AltBackgroundSection;
