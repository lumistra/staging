import { useEffect, useState } from 'react';
import { map } from 'lodash';
import Head from 'next/head';
import useArticles from '@/content/articles';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/news.module.scss';
import Latest from '../containers/articles/Latest';
import WantToPublish from '../containers/articles/WantToPublish';
import Section from '../containers/Section';
import Article from '../elements/Article';
import SeeMore from '../elements/SeeMore';
import TextMask from '../elements/TextMask';
import type { CursorPosition } from '../elements/SeeMore';

export default function News() {
  const { t } = useTranslations();
  const { articles } = useArticles();
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
    <main>
      <Head>
        <title>{t('news.title')}</title>
        <meta name="transition-title" content={t('routes.articles')} />
      </Head>
      <Latest className={style.latestWrapper} minHeight={120} hideCTA />
      <Section containerClassName={style.articlesWrapper}>
        <TextMask identifier="animation-sub-title" className={style.articlesTitle}>
          <h2>
            {t('news.sub_title')}
          </h2>
        </TextMask>
        <SeeMore cursorPosition={cursorPosition} show={modalShow} />
        {map(articles, (article) => (
          <Article
            key={article.slug}
            article={article}
            minHeight={120}
            onMouseEnter={() => handleShowModal(true)}
            onMouseLeave={() => handleShowModal(false)}
          />
        ))}
      </Section>
      <WantToPublish className={style.spacingTop} altBackground />
    </main>
  );
}
