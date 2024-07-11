import { useEffect, useRef, useState } from 'react';
import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { map } from 'lodash';
import Arrow from '@/assets/svg/arrow.svg';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import projectStyle from '@/styles/projects/selected.module.scss';
import style from '@/styles/work.module.scss';
import { View } from '@/types/projects';
import { routes } from '@/utils';
import Section from '../containers/Section';
import Image from '../elements/Image';
import Link from '../elements/Link';
import SeeMore from '../elements/SeeMore';
import type { CursorPosition } from '../elements/SeeMore';
import type { ProjectData, WorkData } from '@/types/projects';
import type { ISbStoryData, SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & WorkData
};

export default function Work(props: Props) {
  const [view, setView] = useState(props.blok.defaultView);
  const [modalShow, setModalShow] = useState(false);
  const [modalProject, setModalProject] = useState<ISbStoryData<ProjectData> | null>();
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>(null);
  const timeoutID = useRef<any>();
  const [modalProjectOverview] = modalProject?.content.overview || [];

  useScrollAnimations({
    heroTitle: {
      animation: AnimationType.fadeUp,
      query: '.hero-animation-title',
      offset: 0,
    },
  });

  useEffect(() => {
    const handleMove = ({ x, y }: MouseEvent) => {
      setCursorPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (timeoutID.current) clearTimeout(timeoutID.current);
    };
  }, []);

  const handleViewChange = (option: View) => {
    setView(option);
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

    setModalShow(willShowModal);
  };

  return (
    <main {...storyblokEditable(props.blok)}>
      {map(props.blok.meta, (meta: SbBlokData) => (
        <StoryblokComponent key={meta._uid} blok={meta} />
      ))}

      {map(props.blok.hero, (hero: SbBlokData) => (
        <StoryblokComponent key={hero._uid} blok={hero} />
      ))}

      <Section containerClassName={classNames(style.gridWrapper, {
        [style.noGap]: View.list === view,
      })}
      >
        <div className={style.viewModeWrapper}>
          <span>{props.blok.viewModeLabel}</span>
          <div className={style.viewModeSelect}>
            <span
              className={classNames(style.viewModeOption, {
                [style.viewModeActive]: View.list === view,
              })}
              onClick={() => handleViewChange(View.list)}
            >
              {props.blok.listLabel}
            </span>
            <span className={style.viewModeSplitter}>/</span>
            <span
              className={classNames(style.viewModeOption, {
                [style.viewModeActive]: View.grid === view,
              })}
              onClick={() => handleViewChange(View.grid)}
            >
              {props.blok.gridLabel}
            </span>
          </div>
        </div>
        {View.list === view && (
          <div
            className={classNames(style.projectModal, {
              [style.projectModalList]: View.list === view,
              [style.projectModalActive]: modalShow,
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
              <Image
                className={style.projectModalCover}
                src={modalProjectOverview.cover.filename}
                alt={modalProjectOverview.cover.alt}
              />
            )}
          </div>
        )}
        {View.grid === view && modalProject && (
          <SeeMore cursorPosition={cursorPosition} show={modalShow} />
        )}
        {View.list === view && map(props.blok.projects, (project) => {
          const [projectOverview] = project.content.overview;

          return (
            <Link
              key={project.slug}
              className={style.projectListItem}
              href={routes.project(project.slug)}
              onMouseEnter={() => handleModalChange(project)}
              onMouseLeave={() => handleModalChange(null)}
            >
              <span>{projectOverview.title}</span>
              {modalProject?.slug === project.slug && (
                <Arrow className={style.projectListArrow} />
              )}
            </Link>
          );
        })}
        {View.grid === view && map(props.blok.projects, (project) => {
          const [projectOverview] = project.content.overview;

          return (
            <Link
              key={project.slug}
              className={classNames(style.gridProject, projectStyle.projectContainer)}
              href={routes.project(project.slug)}
            >
              <Image
                className={classNames(style.gridCover, projectStyle.projectCover)}
                src={projectOverview.cover.filename}
                alt={projectOverview.cover.alt}
                onMouseEnter={() => handleModalChange(project)}
                onMouseLeave={() => handleModalChange(null)}
              />
              <span className={classNames(projectStyle.projectTitle, projectStyle.projectTitleMin)}>{projectOverview.title}</span>
            </Link>
          );
        })}
      </Section>

      {map(props.blok.contact, (contact: SbBlokData) => (
        <StoryblokComponent key={contact._uid} blok={contact} />
      ))}
    </main>
  );
}
