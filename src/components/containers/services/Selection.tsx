import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import {
  filter, first, isEmpty, lowerCase, map, some, startsWith, toLower,
} from 'lodash';
import useServices from '@/content/services';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/services/selection.module.scss';
import { parseMarkdown, routes } from '@/utils';
import Link from '../../elements/Link';
import Section from '../Section';

enum State {
  idle = 'idle',
  positive = 'positive',
  negative = 'negative',
}

type Props = {
  hideHero?: boolean
};

export default function Selection(props: Props) {
  const { t } = useTranslations();
  const { services } = useServices();
  const [showResults, setShowResults] = useState(false);
  const [state, setState] = useState(State.idle);
  const [value, setValue] = useState('');

  const filteredServices = filter(services, (service) => startsWith(lowerCase(service), lowerCase(value)));
  const responses = {
    [State.idle]: {
      title: t('services.prompts.idle.title'),
      paragraph: t('services.prompts.idle.paragraph'),
    },
    [State.positive]: {
      title: t('services.prompts.positive.title'),
      paragraph: parseMarkdown(t('services.prompts.positive.paragraph')),
    },
    [State.negative]: {
      title: t('services.prompts.negative.title'),
      paragraph: parseMarkdown(t('services.prompts.negative.paragraph')),
    },
  };

  const handleSelect = (current: string) => {
    setValue(current);
    const currentFilteredServices = filter(services, (service) => startsWith(lowerCase(service), lowerCase(current)));
    if (!isEmpty(current) && isEmpty(currentFilteredServices)) {
      return setState(State.negative);
    }
    if (!isEmpty(current) && some(services, (service) => lowerCase(service) === lowerCase(current))) {
      return setState(State.positive);
    }

    return setState(State.idle);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      if (!isEmpty(value) && !isEmpty(filteredServices)) {
        handleSelect(first(filteredServices) || '');
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelect(event.target.value);
    if (!showResults) setShowResults(true);
  };

  return (
    <Section containerClassName={classNames(style.servicesWrapper, {
      [style.breakLine]: props.hideHero,
    })}
    >
      {!props.hideHero && (
        <div className={style.heroWrapper}>
          <span className={style.heroTitle}>{t('home.services.title')}</span>
          <p className={style.heroParagraph}>
            {t('home.services.paragraph_1')}
            <Link href={routes.services}>{t('home.services.link')}</Link>
            {t('home.services.paragraph_2')}
          </p>
        </div>
      )}
      <div className={style.promptWrapper}>
        <span className={style.promptTitle}>{responses[state].title}</span>
        <p className={style.promptParagraph}>{responses[state].paragraph}</p>
      </div>
      <div className={style.inputWrapper}>
        <span>{t('services.prompts.input.start')}</span>
        <div className={style.inputContainer}>
          <input
            placeholder={t('services.prompts.input.placeholder')}
            value={value}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
          {!isEmpty(value) && (
            <span className={style.inputSuggestion}>
              {first(filteredServices) || ''}
            </span>
          )}
          {showResults && (
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
                {t('services.prompts.input.no_results')}
              </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
