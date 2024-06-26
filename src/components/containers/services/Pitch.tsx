import { map } from 'lodash';
import TextMask from '@/components/elements/TextMask';
import useScrollAnimations from '@/hooks/useScrollAnimations';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/services/pitch.module.scss';
import { getOrderNumber } from '@/utils';
import Section from '../Section';

type Props = {
  namespace: 'about' | 'services'
};

export default function Pitch(props: Props) {
  const { t } = useTranslations();

  useScrollAnimations({
    pitchItems: {
      query: '.pitch-animation-wrapper',
      offset: 200,
    },
  });

  const pitch = [
    {
      title: t(`${props.namespace}.pitch.step_1.title`),
      paragraph: t(`${props.namespace}.pitch.step_1.paragraph`),
    },
    {
      title: t(`${props.namespace}.pitch.step_2.title`),
      paragraph: t(`${props.namespace}.pitch.step_2.paragraph`),
    },
    {
      title: t(`${props.namespace}.pitch.step_3.title`),
      paragraph: t(`${props.namespace}.pitch.step_3.paragraph`),
    },
  ];

  return (
    <Section className="pitch-animation-wrapper" containerClassName={style.pitchWrapper}>
      {map(pitch, (item, index) => (
        <div key={index} className={style.pitchItem}>
          <TextMask identifier="pitch-index-mask" className={style.pitchNumber}>
            <span>{getOrderNumber(index, true)}</span>
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
