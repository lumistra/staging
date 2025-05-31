import { Fragment } from 'react';
import classNames from 'classnames';
import { isEmpty, map } from 'lodash';
import Link from '@/components/elements/Link';
import LocaleSwitcher from '@/components/elements/LocaleSwitcher';
import { socials } from '@/content';
import { useDarkMode } from '@/hooks/useDarkMode';
import type { SidenavData } from '@/types/globals';

type Props = {
  data: SidenavData
  isOpen: boolean
  onClose: () => void
};

export default function Sidenav(props: Props) {
  const { isDark, setIsDark } = useDarkMode({ enabled: props.data.darkModeEnabled || false });

  const darkModeOptions = [
    { label: props.data.darkModeOn, value: true },
    { label: props.data.darkModeOff, value: false },
  ];

  return (
    <div
      className={classNames('sidenav-wrapper', {
        'sidenav-closed': !props.isOpen,
        'sidenav-open': props.isOpen,
      })}
    >
      <div className="sidenav-background-container">
        <div className="sidenav-container">
          <div className="top-container" />
          <div className="split-wrapper">
            <div className="content-wrapper">
              <LocaleSwitcher onClick={props.onClose} />
              {props.data.darkModeEnabled && (
                <div className="cta-wrapper">
                  <span className="label">{props.data.darkModeLabel}</span>
                  <div className="options">
                    {map(darkModeOptions, (option, index) => (
                      <Fragment key={index}>
                        {index !== 0 && (
                          <span className="splitter">/</span>
                        )}
                        <div
                          className={classNames('option', {
                            active: option.value === isDark,
                          })}
                          onClick={() => setIsDark(option.value)}
                        >
                          {option.label}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}
              <div className="cta-wrapper socials-wrapper">
                <span className="label">{props.data.socialsLabel}</span>
                <div className="socials">
                  {map(props.data.socials, (link) => (
                    <a
                      className="social-icon"
                      key={link.link.url}
                      href={link.link.url}
                      target="_blank"
                    >
                      {socials[link.icon]}
                    </a>
                  ))}
                </div>
                {!isEmpty(props.data.cta?.email) && (
                  <a
                    className="label"
                    href={`mailto:${props.data.cta?.email}`}
                    target="_blank"
                  >
                    {props.data.cta?.email}
                  </a>
                )}
              </div>
            </div>
            <div className="routes-wrapper">
              {map(props.data.sitemap, (route) => (
                <Link
                  className="nav-link"
                  key={route.link.url}
                  link={route.link}
                  onClick={props.onClose}
                  addActiveFlag
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
