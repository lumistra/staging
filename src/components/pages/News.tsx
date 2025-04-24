import { useEffect, useState } from 'react';
import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { map } from 'lodash';
import Section from '@/components/containers/Section';
import Article from '@/components/elements/Article';
import CursorTracker from '@/components/elements/CursorTracker';
import TextMask from '@/components/elements/TextMask';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import style from '@/styles/articles/news.module.scss';
import type { CursorPosition } from '@/components/elements/CursorTracker';
import type { NewsData } from '@/types/articles';
import type { SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & NewsData
};

export default function News(props: Props) {
  const [modalShow, setModalShow] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>(null);

  useScrollAnimations({
    subTitle: {
      animation: AnimationType.fadeDown,
      query: '.animation-sub-title',
      offset: 10,
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
    <main {...storyblokEditable(props.blok)}>
      {map(props.blok.meta, (meta: SbBlokData) => (
        <StoryblokComponent key={meta._uid} blok={meta} />
      ))}

      {map(props.blok.latest, (blok: SbBlokData) => (
        <StoryblokComponent
          key={blok._uid}
          blok={blok}
          className={style.latestWrapper}
          minHeight={120}
          hideCTA
        />
      ))}

      <Section
        componentId={props.blok.component}
        containerClassName={style.articlesWrapper}
      >
        <TextMask animationClass="animation-base animation-sub-title" className={style.articlesTitle}>
          <h2>{props.blok.subTitle}</h2>
        </TextMask>
        <CursorTracker cursorPosition={cursorPosition} show={modalShow} />
        {map(props.blok.articles, (article) => (
          <Article
            key={article.slug}
            article={article}
            onMouseEnter={() => handleShowModal(true)}
            onMouseLeave={() => handleShowModal(false)}
          />
        ))}
      </Section>

      {map(props.blok.wantToPublish, (blok: SbBlokData) => (
        <StoryblokComponent key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
