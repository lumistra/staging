import { useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import {
  filter, first, isEmpty, map, some, split, startsWith, toLower, uniq,
} from 'lodash';
import RichText from '@/components/elements/RichText';
import style from '@/styles/services/selection.module.scss';
import Section from '../Section';
import type { SelectionData } from '@/types/components';

enum State {
  idle = 'idle',
  positive = 'positive',
  negative = 'negative',
}

type Props = {
  blok: SbBlokData & SelectionData
};

export default function Selection(props: Props) {
  const [showResults, setShowResults] = useState(false);
  const [state, setState] = useState(State.idle);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const services = uniq(split(props.blok.services, '\n'));
  const filteredServices = filter(services, (service) => startsWith(toLower(service), value));
  const responses = {
    [State.idle]: {
      title: props.blok.idleTitle,
      paragraph: props.blok.idleParagraph,
    },
    [State.positive]: {
      title: props.blok.positiveTitle,
      paragraph: props.blok.positiveParagraph,
    },
    [State.negative]: {
      title: props.blok.negativeTitle,
      paragraph: props.blok.negativeParagraph,
    },
  };

  const handleSelect = (current: string) => {
    const lowerCurrent = toLower(current);
    setValue(lowerCurrent);

    const currentFilteredServices = filter(services, (service) => startsWith(toLower(service), lowerCurrent));

    if (!isEmpty(lowerCurrent) && isEmpty(currentFilteredServices)) {
      return setState(State.negative);
    }
    if (!isEmpty(lowerCurrent) && some(services, (service) => toLower(service) === lowerCurrent)) {
      return setState(State.positive);
    }

    return setState(State.idle);
  };

  const handleEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      inputRef.current?.blur();
    }

    if (event.key === 'Tab') {
      event.preventDefault();

      if (!isEmpty(value) && !isEmpty(filteredServices)) {
        handleSelect(first(filteredServices) || '');
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleSelect(event.target.value);
    if (!showResults) setShowResults(true);
  };

  return (
    <Section
      containerClassName={classNames(style.servicesWrapper, {
        [style.breakLine]: props.blok.heroHide,
      })}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      {!props.blok.heroHide && (
        <div className={style.heroWrapper}>
          <span className={style.heroTitle}>{props.blok.heroTitle}</span>
          <RichText className={style.heroParagraph}>{props.blok.heroParagraph}</RichText>
        </div>
      )}
      <div className={style.promptWrapper}>
        <span className={style.promptTitle}>{responses[state].title}</span>
        <RichText className={style.promptParagraph}>{responses[state].paragraph}</RichText>
      </div>
      <div className={style.inputWrapper}>
        <span>{props.blok.inputStartText}</span>
        <div className={style.inputContainer}>
          <ReactTextareaAutosize
            ref={inputRef}
            placeholder={props.blok.inputPlaceholder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleEnter}
            autoCapitalize="off"
            autoComplete="off"
            inputMode="text"
            maxRows={3}
            minRows={1}
          />
          <div className={style.inputSuggestionsWrapper}>
            <span className={style.inputSuggestion}>
              {isEmpty(value) ? '' : toLower(first(filteredServices) || '')}
            </span>
            {showResults && (
            <div className={style.searchWrapper}>
              {toLower(filteredServices[0]) !== value && map(filteredServices, (service) => (
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
                {props.blok.inputNoResults}
              </span>
              )}
            </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
