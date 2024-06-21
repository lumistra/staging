import { map } from 'lodash';
import TextMask from '@/components/elements/TextMask';
import useScrollAnimations from '@/hooks/useScrollAnimations';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/services/pitch.module.scss';
import { getOrderNumber } from '@/utils';
import Section from '../Section';

export default function Pitch() {
  const { t } = useTranslations();

  useScrollAnimations({
    pitchItems: {
      query: '.pitch-animation-wrapper',
      offset: 200,
    },
  });

  const pitch = [
    {
      title: t('services.pitch.step_1.title'),
      paragraph: t('services.pitch.step_1.paragraph'),
    },
    {
      title: t('services.pitch.step_2.title'),
      paragraph: t('services.pitch.step_2.paragraph'),
    },
    {
      title: t('services.pitch.step_3.title'),
      paragraph: t('services.pitch.step_3.paragraph'),
    },
  ];

  return (
    <Section className="pitch-animation-wrapper" containerClassName={style.pitchWrapper}>
      {map(pitch, (item, index) => (
        <div key={index} className={style.pitchItem}>
          <TextMask identifier="pitch-index-mask">
            <span className={style.pitchNumber}>
              {getOrderNumber(index, true)}
            </span>
          </TextMask>
          <div className={style.pitchContent}>
            <TextMask identifier="pitch-index-title">
              <span className={style.pitchTitle}>{item.title}</span>
            </TextMask>
            <TextMask identifier="pitch-index-paragraph">
              <p className={style.pitchParagraph}>{item.paragraph}</p>
            </TextMask>
          </div>
        </div>
      ))}
    </Section>
  );
}
