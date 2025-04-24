import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { map } from 'lodash';
import Section from '@/components/containers/Section';
import TextMask from '@/components/elements/TextMask';
import useScrollAnimations from '@/hooks/useScrollAnimations';
import style from '@/styles/services/pitch.module.scss';
import { getOrderNumber } from '@/utils';
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
      componentId={props.blok.component}
      className="animation-base pitch-animation-wrapper"
      containerClassName={style.pitchWrapper}
      style={props.blok.styling}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      {map(props.blok.items, (item, index) => (
        <div
          key={index}
          className={classNames(style.pitchItem, {
            [style.withBottomLine]: !props.blok.hideBottomLine,
          })}
        >
          <TextMask
            animationClass="pitch-index-mask"
            className={classNames({
              [style.pitchLabel]: props.blok.hideOrderNumber,
              [style.pitchNumber]: !props.blok.hideOrderNumber,
            })}
          >
            <span>{props.blok.hideOrderNumber ? item.title : getOrderNumber(index)}</span>
          </TextMask>
          <div className={style.pitchContent}>
            {!props.blok.hideOrderNumber && (
              <TextMask animationClass="pitch-title-mask" className={style.pitchTitle}>
                <span>{item.title}</span>
              </TextMask>
            )}
            <TextMask animationClass="pitch-paragraph-mask" className={style.pitchParagraph}>
              <p>{item.paragraph}</p>
            </TextMask>
          </div>
        </div>
      ))}
    </Section>
  );
}
