import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { map } from 'lodash';
import TextMask from '@/components/elements/TextMask';
import useScrollAnimations from '@/hooks/useScrollAnimations';
import style from '@/styles/services/pitch.module.scss';
import { getOrderNumber } from '@/utils';
import Section from '../Section';
import type { PitchData } from '@/types/components';

type Props = {
  blok: SbBlokData & PitchData
};

export default function Pitch(props: Props) {
  useScrollAnimations({
    pitchItems: {
      query: '.pitch-animation-wrapper',
      offset: 200,
    },
  });

  return (
    <Section
      className="pitch-animation-wrapper"
      containerClassName={style.pitchWrapper}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      {map(props.blok.items, (item, index) => (
        <div key={index} className={style.pitchItem}>
          <TextMask identifier="pitch-index-mask" className={style.pitchNumber}>
            <span>{getOrderNumber(index)}</span>
          </TextMask>
          <div className={style.pitchContent}>
            <TextMask identifier="pitch-index-title" className={style.pitchTitle}>
              <span>{item.title}</span>
            </TextMask>
            <TextMask identifier="pitch-index-paragraph" className={style.pitchParagraph}>
              <p>{item.paragraph}</p>
            </TextMask>
          </div>
        </div>
      ))}
    </Section>
  );
}
