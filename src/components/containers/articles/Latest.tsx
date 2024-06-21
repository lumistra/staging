import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { map } from 'lodash';
import Article from '@/components/elements/Article';
import CtaLink from '@/components/elements/CtaLink';
import SeeMore from '@/components/elements/SeeMore';
import useArticles from '@/content/articles';
import { useScreenSize } from '@/hooks/useScreenSize';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/articles/latest.module.scss';
import { routes } from '@/utils';
import Section from '../Section';
import type { CursorPosition } from '@/components/elements/SeeMore';

type Props = {
  className?: string
  minHeight?: number
  hideCTA?: boolean
};

export default function Latest(props: Props) {
  const { t } = useTranslations();
  const { latest } = useArticles();
  const { isTablet } = useScreenSize();
  const [modalShow, setModalShow] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>(null);

  useScrollAnimations({
    latestWrapper: {
      animation: AnimationType.fadeDown,
      query: '.latest-animation-wrapper',
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
    <Section containerClassName={classNames(style.latestWrapper, props.className)}>
      <div className={classNames('latest-animation-wrapper', style.latestTextWrapper)}>
        <span className={style.latestTitle}>
          {t('news.latest.section')}
        </span>
        <div className={style.latestColumn}>
          <span className={style.latestTitle}>
            {t('news.latest.title')}
          </span>
          {!props.hideCTA && (
            <CtaLink className={style.latestDesktopCTA} href={routes.articles}>
              {t('globals.read_all')}
            </CtaLink>
          )}
        </div>
      </div>
      <SeeMore cursorPosition={cursorPosition} show={modalShow} />
      <div className={style.articlesWrapper}>
        {map(latest, (article) => (
          <Article
            key={article.slug}
            article={article}
            minHeight={isTablet ? 100 : props.minHeight}
            onMouseEnter={() => handleShowModal(true)}
            onMouseLeave={() => handleShowModal(false)}
          />
        ))}
        {!props.hideCTA && (
          <CtaLink className={style.latestMobileCTA} href={routes.articles}>
            {t('globals.read_all')}
          </CtaLink>
        )}
      </div>
    </Section>
  );
}
