import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import {
  filter, includes, isEmpty, lowerCase, map, some,
  toLower,
} from 'lodash';
import useServices from '@/content/services';
import { useDebouncedState } from '@/hooks/useDebounce';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/home.module.scss';
import { parseMarkdown, routes } from '@/utils';
import Section from './Section';
import Link from '../elements/Link';

enum State {
  idle = 'idle',
  positive = 'positive',
  negative = 'negative',
}

export default function ServiceSelection() {
  const { t } = useTranslations();
  const { services } = useServices();
  const [state, setState] = useState(State.idle);
  const [value, setValue] = useDebouncedState('', (current: string) => {
    if (isEmpty(current)) {
      return setState(State.idle);
    }
    if (some(services, (service) => lowerCase(service) === lowerCase(current))) {
      return setState(State.positive);
    }

    return setState(State.negative);
  });

  const handleSelect = (current: string) => {
    setValue(current);
    if (isEmpty(current)) {
      return setState(State.idle);
    }
    if (some(services, (service) => lowerCase(service) === lowerCase(current))) {
      return setState(State.positive);
    }

    return setState(State.negative);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSelect(value);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const filteredServices = filter(services, (service) => includes(lowerCase(service), lowerCase(value)));
  const responses = {
    [State.idle]: {
      title: t('home.services.prompts.idle.title'),
      paragraph: t('home.services.prompts.idle.paragraph'),
    },
    [State.positive]: {
      title: t('home.services.prompts.positive.title'),
      paragraph: parseMarkdown(t('home.services.prompts.positive.paragraph')),
    },
    [State.negative]: {
      title: t('home.services.prompts.negative.title'),
      paragraph: parseMarkdown(t('home.services.prompts.negative.paragraph')),
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
        <div className={style.inputContainer}>
          <input
            placeholder={t('home.services.prompts.input.placeholder')}
            value={value}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
          <div className={style.searchWrapper}>
            {toLower(filteredServices[0]) !== toLower(value) && map(filteredServices, (service) => (
              <button
                key={service}
                className={style.searchItem}
                onClick={() => handleSelect(service)}
              >
                {service}
              </button>
            ))}
            {filteredServices.length === 0 && (
              <span className={classNames(style.searchItem, style.searchItemNoResults)}>
                {t('home.services.prompts.input.no_results')}
              </span>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
