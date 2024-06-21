import { useRef, useState } from 'react';
import classNames from 'classnames';
import { floor, map } from 'lodash';
import Arrow from '@/assets/svg/arrow.svg';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/home.module.scss';
import Section from './Section';
import TextMask from '../elements/TextMask';

function Process() {
  const { t } = useTranslations();
  const [wordIndex, setWordIndex] = useState(-1);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const words = useRef(t('home.process.title').split(' ')).current;

  useScrollAnimations({
    processCTA: {
      animation: AnimationType.fadeUp,
      query: '.process-cta-animation',
      offset: 100,
    },
  }, () => {
    if (!containerRef.current || !titleRef.current) return null;

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
      className={style.processBackgroundWrapper}
      containerClassName={style.processWrapper}
    >
      <h3 ref={titleRef} className={style.processTitle}>
        {map(words, (word, index) => (
          <span
            key={index}
            style={{
              transition: '0.2s',
              opacity: index > wordIndex ? 0.5 : 1,
            }}
          >
            {word}{' '}
          </span>
        ))}
      </h3>
      <div className={classNames('animation-fade-in', {
        'animate-in': wordIndex >= words.length,
      })}
      >
        <p className={style.processParagraph}>
          {t('home.process.paragraph')}
        </p>
      </div>
      <TextMask identifier="process-cta-animation">
        <span className={style.processCTA}>
          {t('home.process.cta')}
          <Arrow />
        </span>
      </TextMask>
    </Section>
  );
}

export default Process;
