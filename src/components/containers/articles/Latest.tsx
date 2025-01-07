import { useEffect, useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { map } from 'lodash';
import Section from '@/components/containers/Section';
import Article from '@/components/elements/Article';
import CtaLink from '@/components/elements/CtaLink';
import SeeMore from '@/components/elements/SeeMore';
import { useScreenSize } from '@/hooks/useScreenSize';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import style from '@/styles/articles/latest.module.scss';
import type { CursorPosition } from '@/components/elements/SeeMore';
import type { LatestData } from '@/types/articles';

type Props = {
  blok: SbBlokData & LatestData
  className?: string
  minHeight?: number
  hideCTA?: boolean
};

export default function Latest(props: Props) {
  const { isTablet } = useScreenSize();
  const [modalShow, setModalShow] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>(null);

  useScrollAnimations({
    latestWrapper: {
      animation: AnimationType.fadeDown,
      query: '.animation-base latest-animation-wrapper',
      offset: 100,
    },
  });

  useEffect(() => {
    const handleMove = ({ x, y }: MouseEvent) => {
      setCursorPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  const handleShowModal = (shouldShow: boolean) => {
    setModalShow(shouldShow);
  };

  return (
    <Section
      componentId={props.blok.component}
      containerClassName={classNames(style.latestWrapper, props.className)}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <div className={classNames('animation-base latest-animation-wrapper', style.latestTextWrapper)}>
        <span className={style.latestTitle}>
          {props.blok.section}
        </span>
        <div className={style.latestColumn}>
          <span className={style.latestTitle}>
            {props.blok.title}
          </span>
          {!props.hideCTA && (
            <CtaLink className={style.latestDesktopCTA} link={props.blok.cta[0].link}>
              {props.blok.cta[0].text}
            </CtaLink>
          )}
        </div>
      </div>
      <SeeMore cursorPosition={cursorPosition} show={modalShow} />
      <div className={style.articlesWrapper}>
        {map(props.blok.articles, (article) => (
          <Article
            key={article.slug}
            article={article}
            minHeight={isTablet ? 100 : props.minHeight}
            onMouseEnter={() => handleShowModal(true)}
            onMouseLeave={() => handleShowModal(false)}
          />
        ))}
        {!props.hideCTA && (
          <CtaLink className={style.latestMobileCTA} link={props.blok.cta[0].link}>
            {props.blok.cta[0].text}
          </CtaLink>
        )}
      </div>
    </Section>
  );
}
