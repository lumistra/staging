import { Fragment } from 'react';
import classNames from 'classnames';
import { map, upperCase } from 'lodash';
import Close from '@/assets/close.svg';
import Link from '@/components/misc/Link';
import useTranslations, { locales } from '@/hooks/useTranslations';
import { routes } from '@/utils';

type Props = {
  isOpen: boolean
  onClose: () => void
};

export default function Sidenav(props: Props) {
  const { t, currentLocale } = useTranslations();

  const sidenav = [
    { label: t('routes.home'), value: routes.home },
    { label: t('routes.work'), value: routes.work },
    { label: t('routes.about'), value: routes.about },
    { label: t('routes.contact'), value: routes.contact },
    { label: t('routes.services'), value: routes.services },
    { label: t('routes.articles'), value: routes.articles },
  ];

  if (!props.isOpen) return null;

  return (
    <div className="sidenav-wrapper">
      <div className="sidenav-container">
        <div className="top-container">
          <Close className="close-icon" onClick={props.onClose} />
        </div>
        <div className="split-wrapper">
          <div className="content-wrapper">
            <div className="locale-wrapper">
              <span className="label">{t('navigation.language')}</span>
              <div className="locales">
                {map(locales, (locale, index) => (
                  <Fragment key={locale.value}>
                    {index !== 0 && (
                      <span className="active">/</span>
                    )}
                    <Link
                      className={classNames('locale', {
                        active: locale.value === currentLocale,
                      })}
                      href="/"
                      locale={locale.value}
                      onClick={props.onClose}
                    >
                      {upperCase(locale.value)}
                    </Link>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="routes-wrapper">
            {map(sidenav, (route) => (
              <Link key={route.value} href={route.value}>
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
