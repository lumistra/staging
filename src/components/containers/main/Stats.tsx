import { useEffect, useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { nth } from 'lodash';
import Section from '@/components/containers/Section';
import CursorTracker from '@/components/elements/CursorTracker';
import style from '@/styles/main/stats.module.scss';
import type { CursorPosition } from '@/components/elements/CursorTracker';
import type { StatData, StatsData } from '@/types/components';

type Props = {
  blok: SbBlokData & StatsData
};

function Stats(props: Props) {
  const [step, setStep] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>(null);

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

  const handleClick = () => {
    const next = props.blok.stats.length - 1 === step ? 0 : step + 1;
    setStep(next);
  };

  const current = nth(props.blok.stats, step) as StatData;

  return (
    <Section
      componentId={props.blok.component}
      containerClassName={classNames(style.statsWrapper, {
        [style.line]: props.blok.lineTop,
      })}
      style={props.blok.styling}
      onClick={handleClick}
      onMouseEnter={() => handleShowModal(true)}
      onMouseLeave={() => handleShowModal(false)}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <CursorTracker
        keyword={props.blok.cta}
        cursorPosition={cursorPosition}
        show={modalShow}
      />
      <div className={style.stat}>
        <h3>{current.statistic}</h3>
      </div>
      <div className={style.info}>
        <p>{current.paragraph}</p>
        {current.bottom && <span>{current.bottom}</span>}
      </div>
    </Section>
  );
}

export default Stats;
