import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { map } from 'lodash';
import Icon from '@/assets/svg/icon.svg';
import Logo from '@/assets/svg/logo.svg';
import Link from '@/components/elements/Link';
import Menu from '@/components/elements/Menu';
import { useScreenSize } from '@/hooks/useScreenSize';
import useTranslations from '@/hooks/useTranslations';
import { routes } from '@/utils';
import Sidenav from './Sidenav';

export default function Navigation() {
  const { t } = useTranslations();
  const { isDesktop } = useScreenSize();
  const [isTop, setIsTop] = useState(true);
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  useEffect(() => {
    const handleToggleNavigationVersion = () => {
      setIsTop(window.scrollY <= 0);
    };

    window.addEventListener('scroll', handleToggleNavigationVersion);

    return () => {
      window.removeEventListener('scroll', handleToggleNavigationVersion);
    };
  }, []);

  const handleSideMenuToggle = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  const navigation = [
    { label: t('routes.work'), value: routes.work },
    { label: t('routes.about'), value: routes.about },
    { label: t('routes.contact'), value: routes.contact },
  ];

  return (
    <>
      <nav className="navigation-wrapper">
        <div className="navigation-container animate-in">
          <Link href="/">
            {isTop && isDesktop ? (
              <Logo className={classNames('logo logo-text', {
                'nav-visible': !isSidenavOpen,
                'nav-hidden': isSidenavOpen,
              })}
              />
            ) : (
              <Icon className={classNames('logo logo-icon', {
                'nav-visible': !isSidenavOpen,
                'nav-hidden': isSidenavOpen,
              })}
              />
            )}
          </Link>
          <div className={classNames('links-wrapper', {
            minimized: !isTop,
          })}
          >
            {isTop && map(navigation, (link) => (
              <Link
                key={link.value}
                href={link.value}
                className={classNames('nav-link', {
                  'nav-visible': !isSidenavOpen,
                  'nav-hidden': isSidenavOpen,
                })}
              >
                {link.label}
              </Link>
            ))}
            <Menu
              className={classNames({
                'icon-open': !isSidenavOpen,
                'icon-close': isSidenavOpen,
              })}
              onClick={handleSideMenuToggle}
            />
          </div>
        </div>
      </nav>
      <Sidenav isOpen={isSidenavOpen} onClose={handleSideMenuToggle} />
    </>
  );
}
