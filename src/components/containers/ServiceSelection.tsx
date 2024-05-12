import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { isEmpty } from 'lodash';
import { useDebouncedState } from '@/hooks/useDebounce';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/home.module.scss';
import { routes } from '@/utils';
import Section from './Section';
import Link from '../elements/Link';

enum State {
  idle = 'idle',
  positive = 'positive',
  negative = 'negative',
}

export default function ServiceSelection() {
  const { t } = useTranslations();
  const [state, setState] = useState(State.idle);
  const [value, setValue] = useDebouncedState('', (current: string) => {
    if (isEmpty(current)) return setState(State.idle);
    if (current === 'positive') return setState(State.positive);
    if (current === 'negative') return setState(State.negative);
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const responses = {
    [State.idle]: {
      title: t('home.services.prompts.idle.title'),
      paragraph: t('home.services.prompts.idle.paragraph'),
    },
    [State.positive]: {
      title: t('home.services.prompts.positive.title'),
      paragraph: t('home.services.prompts.positive.paragraph'),
    },
    [State.negative]: {
      title: t('home.services.prompts.negative.title'),
      paragraph: t('home.services.prompts.negative.paragraph'),
    },
  };

  return (
    <Section containerClassName={style.servicesWrapper}>
      <div className={style.heroWrapper}>
        <span className={style.heroTitle}>{t('home.services.title')}</span>
        <p className={style.heroParagraph}>
          {t('home.services.paragraph_1')}
          <Link href={routes.services}>{t('home.services.link')}</Link>
          {t('home.services.paragraph_2')}
        </p>
      </div>
      <div className={style.promptWrapper}>
        <span className={style.promptTitle}>{responses[state].title}</span>
        <p className={style.promptParagraph}>{responses[state].paragraph}</p>
      </div>
      <div className={style.inputWrapper}>
        <span>{t('home.services.prompts.input.start')}</span>
        <input
          placeholder={t('home.services.prompts.input.placeholder')}
          value={value}
          onChange={handleChange}
        />
      </div>
    </Section>
  );
}
