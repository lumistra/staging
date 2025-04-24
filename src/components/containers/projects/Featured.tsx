import { useEffect, useRef, useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { get, includes, isEmpty } from 'lodash';
import Section from '@/components/containers/Section';
import CtaLink from '@/components/elements/CtaLink';
import CursorTracker from '@/components/elements/CursorTracker';
import Link from '@/components/elements/Link';
import Media from '@/components/elements/Media';
import { useScreenSize } from '@/hooks/useScreenSize';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import style from '@/styles/projects/featured.module.scss';
import { getOrderNumber, routes } from '@/utils';
import type { CursorPosition } from '@/components/elements/CursorTracker';
import type { FeaturedData } from '@/types/projects';

type Props = {
  blok: SbBlokData & FeaturedData
};

export default function Featured(props: Props) {
  const { isTablet } = useScreenSize();
  const [modalShow, setModalShow] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalID = useRef<NodeJS.Timeout>(undefined);
  const currentProject = props.blok.projects[currentIndex];
  const [currentProjectOverview] = currentProject.content.overview || [];

  useEffect(() => {
    intervalID.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        if (newIndex >= props.blok.projects.length) return 0;

        return newIndex;
      });
    }, 4000);

    return () => clearInterval(intervalID.current);
  }, [props.blok.projects]);

  useEffect(() => {
    const handleMove = ({ x, y }: MouseEvent) => {
      setCursorPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  useScrollAnimations({
    featuredText: {
      animation: AnimationType.fadeUp,
      query: '.featured-text',
      offset: 0,
    },
    featuredCover: {
      animation: AnimationType.fadeIn,
      query: '.featured-cover',
      offset: 0,
    },
  });

  const handleShowModal = (shouldShow: boolean) => {
    setModalShow(shouldShow);
  };

  return (
    <>
      {props.blok.show && (
        <Section
          componentId={props.blok.component}
          containerClassName={style.featuredHeaderWrapper}
        >
          <h3>{props.blok.title}</h3>
          {!isEmpty(props.blok.sectionCTA) && (
            <CtaLink link={get(props.blok.sectionCTA, '[0].link')}>
              {get(props.blok.sectionCTA, '[0].text', '')}
            </CtaLink>
          )}
        </Section>
      )}
      <Section
        componentId={props.blok.component}
        containerClassName={classNames(style.featuredWrapper, {
          [style.featuredGapBottom]: props.blok.show,
          [style.featuredTop]: props.blok.textPosition === 'top' || (!props.blok.textPosition && isTablet),
          [style.featuredBottom]: props.blok.textPosition === 'bottom' || (!props.blok.textPosition && !isTablet),
        })}
        style={props.blok.styling}
        storyblokEditable={storyblokEditable(props.blok)}
      >
        <div className={classNames('animation-base featured-text', style.featuredTextWrapper)}>
          <span>{currentProjectOverview.title}</span>
          {includes(['all', 'desktop', undefined], props.blok.showProjectCTA) && props.blok.projectCTA && (
            <CtaLink className={style.desktopCTA} href={routes.project(currentProject.slug)}>
              {props.blok.projectCTA}
            </CtaLink>
          )}
          <span className={style.featuredIndex}>
            {getOrderNumber(currentIndex, true)}
          </span>
        </div>
        <CursorTracker cursorPosition={cursorPosition} show={modalShow} />
        <Link className="animation-base featured-cover" href={routes.project(currentProject.slug)}>
          <Media
            className={style.featuredCover}
            src={currentProjectOverview.cover.filename}
            alt={currentProjectOverview.cover.alt}
            onMouseEnter={() => handleShowModal(true)}
            onMouseLeave={() => handleShowModal(false)}
          />
        </Link>
        {includes(['all', 'mobile', undefined], props.blok.showProjectCTA) && props.blok.projectCTA && (
          <CtaLink className={style.mobileCTA} href={routes.project(currentProject.slug)}>
            {props.blok.projectCTA}
          </CtaLink>
        )}
      </Section>
    </>
  );
}
