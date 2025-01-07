import { useEffect, useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { map } from 'lodash';
import Icon from '@/assets/svg/icon.svg';
import Logo from '@/assets/svg/logo.svg';
import Sidenav from '@/components/containers/navigation/Sidenav';
import Link from '@/components/elements/Link';
import Menu from '@/components/elements/Menu';
import { useScreenSize } from '@/hooks/useScreenSize';
import type { NavigationData } from '@/types/globals';

type Props = {
  blok: SbBlokData & NavigationData
};

export default function Navigation(props: Props) {
  const { isDesktop } = useScreenSize();
  const [isTop, setIsTop] = useState(true);
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  useEffect(() => {
    const handleToggleNavigationVersion = () => {
      setIsTop(window.scrollY <= 0);
    };

    setIsTop(window.scrollY <= 0);
    window.addEventListener('scroll', handleToggleNavigationVersion);

    return () => {
      window.removeEventListener('scroll', handleToggleNavigationVersion);
    };
  }, []);

  const handleSideMenuToggle = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  return (
    <>
      <nav className="navigation-wrapper" {...storyblokEditable(props.blok)}>
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
            {isTop && map(props.blok.links, (link) => (
              <Link
                key={link.link.url}
                link={link.link}
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
      <Sidenav data={props.blok.sidenav[0]} isOpen={isSidenavOpen} onClose={handleSideMenuToggle} />
    </>
  );
}
