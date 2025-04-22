import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { map, snakeCase } from 'lodash';
import Section from '@/components/containers/Section';
import RichText from '@/components/elements/RichText';
import style from '@/styles/services/pitch-more.module.scss';
import type { PitchMoreData } from '@/types/components';

type Props = {
  blok: SbBlokData & PitchMoreData
};

export default function PitchMore(props: Props) {
  return (
    <Section
      componentId={props.blok.component}
      containerClassName={style.pitchWrapper}
      style={props.blok.styling}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      {map(props.blok.items, (item, index) => (
        <div key={index} id={snakeCase(item.title)} className={style.pitchItem}>
          <span className={style.pitchTitle}>{item.title}</span>
          <div className={classNames(style.pitchBlock, style.pitchLeft)}>
            <span className={style.pitchLabel}>{item.leftLabel}</span>
            <RichText className={style.pitchParagraph}>{item.leftParagraph}</RichText>
          </div>
          <div className={classNames(style.pitchBlock, style.pitchRight)}>
            <span className={style.pitchLabel}>{item.rightLabel}</span>
            <RichText className={style.pitchParagraph}>{item.rightParagraph}</RichText>
          </div>
        </div>
      ))}
    </Section>
  );
}
