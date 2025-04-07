import { useEffect, useRef, useState } from 'react';
import { storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { map } from 'lodash';
import Arrow from '@/assets/svg/arrow.svg';
import Section from '@/components/containers/Section';
import CtaLink from '@/components/elements/CtaLink';
import CursorTracker from '@/components/elements/CursorTracker';
import Link from '@/components/elements/Link';
import Media from '@/components/elements/Media';
import { useScreenSize } from '@/hooks/useScreenSize';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import style from '@/styles/projects/selected.module.scss';
import workStyle from '@/styles/work.module.scss';
import { View } from '@/types/projects';
import { routes } from '@/utils';
import type { CursorPosition } from '@/components/elements/CursorTracker';
import type { ProjectData, SelectedData } from '@/types/projects';
import type { ISbStoryData, SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & SelectedData
};

export default function Selected(props: Props) {
  const { isTablet } = useScreenSize();
  const [modalShow, setModalShow] = useState(false);
  const [modalProject, setModalProject] = useState<ISbStoryData<ProjectData> | null>();
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>(null);
  const timeoutID = useRef<NodeJS.Timeout>(undefined);
  const [modalProjectOverview] = modalProject?.content.overview || [];

  useScrollAnimations({
    selectedWrapper: {
      animation: AnimationType.fadeDown,
      query: '.selected-animation-wrapper',
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

  const handleModalChange = (project: ISbStoryData<ProjectData> | null) => {
    if (timeoutID.current) clearTimeout(timeoutID.current);

    const willShowModal = !!project;
    if (willShowModal) {
      setModalProject(project);
    } else {
      timeoutID.current = setTimeout(() => {
        setModalProject(project);
      }, 500);
    }

    handleShowModal(willShowModal);
  };

  return (
    <Section
      componentId={props.blok.component}
      containerClassName={style.selectedWrapper}
      style={props.blok.styling}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <div className={classNames('animation-base selected-animation-wrapper', style.selectedTextWrapper, {
        [style.wrapperHideBorder]: props.blok.hideTopBorder,
      })}
      >
        <span className={style.selectedTitle}>
          {props.blok.section}
        </span>
        <div className={style.selectedColumn}>
          <span className={style.selectedTitle}>
            {props.blok.title}
          </span>
          <CtaLink className={style.selectedCTA} link={props.blok.cta[0].link}>
            {props.blok.cta[0].text}
          </CtaLink>
        </div>
      </div>
      {!isTablet && View.list === props.blok.view ? (
        <>
          <div
            className={classNames(workStyle.projectModal, workStyle.projectModalList, {
              [workStyle.projectModalActive]: modalShow,
            })}
            style={{
              position: 'fixed',
              ...(cursorPosition && {
                left: cursorPosition.x,
                top: cursorPosition.y,
              }),
            }}
          >
            {modalProjectOverview && (
              <Media
                className={workStyle.projectModalCover}
                src={modalProjectOverview.cover.filename}
                alt={modalProjectOverview.cover.alt}
              />
            )}
          </div>
          <div className={classNames(style.projectsWrapper, style.listWrapper)}>
            {map(props.blok.projects, (project) => {
              const [projectOverview] = project.content.overview;

              return (
                <Link
                  key={project.slug}
                  className={workStyle.projectListItem}
                  href={routes.project(project.slug)}
                  onMouseEnter={() => handleModalChange(project)}
                  onMouseLeave={() => handleModalChange(null)}
                >
                  <span>{projectOverview.title}</span>
                  {modalProject?.slug === project.slug && (
                    <Arrow className={workStyle.projectListArrow} />
                  )}
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <CursorTracker cursorPosition={cursorPosition} show={modalShow} />
          <div className={style.projectsWrapper}>
            {map(props.blok.projects, (project) => {
              const projectOverview = project.content.overview[0];

              return (
                <Link
                  key={project.slug}
                  className={style.projectContainer}
                  href={routes.project(project.slug)}
                >
                  <Media
                    className={style.projectCover}
                    src={projectOverview.cover.filename}
                    alt={projectOverview.cover.alt}
                    onMouseEnter={() => handleShowModal(true)}
                    onMouseLeave={() => handleShowModal(false)}
                  />
                  <span className={style.projectTitle}>{projectOverview.title}</span>
                </Link>
              );
            })}
            <CtaLink className={style.selectedMobileCTA} link={props.blok.cta[0].link}>
              {props.blok.cta[0].text}
            </CtaLink>
          </div>
        </>
      )}
    </Section>
  );
}
