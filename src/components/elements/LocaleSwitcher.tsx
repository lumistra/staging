import { Fragment } from 'react';
import classNames from 'classnames';
import { map, upperCase } from 'lodash';
import useTranslations, { locales } from '@/hooks/useTranslations';
import Link from './Link';

type Props = {
  onClick?: () => void
};

export default function LocaleSwitcher(props: Props) {
  const { t, currentLocale } = useTranslations();

  return (
    <div className="locale-wrapper">
      <span className="label">{t('globals.language')}</span>
      <div className="locales">
        {map(locales, (locale, index) => (
          <Fragment key={locale.value}>
            {index !== 0 && (
              <span className="splitter">/</span>
            )}
            <Link
              className={classNames('locale', {
                active: locale.value === currentLocale,
              })}
              locale={locale.value}
              onClick={props.onClick}
            >
              {upperCase(locale.value)}
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
