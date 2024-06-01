import { useEffect, useState } from 'react';
import { map } from 'lodash';
import Icon from '@/assets/svg/icon.svg';
import Logo from '@/assets/svg/logo.svg';
import Menu from '@/assets/svg/menu.svg';
import Link from '@/components/elements/Link';
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
        <div className="navigation-container">
          <Link href="/">
            {isTop && isDesktop ? (
              <Logo className="logo logo-text" />
            ) : (
              <Icon className="logo logo-icon" />
            )}
          </Link>
          <div className="links-wrapper">
            {isTop && map(navigation, (link) => (
              <Link
                key={link.value}
                href={link.value}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
            <Menu className="menu-icon" onClick={handleSideMenuToggle} />
          </div>
        </div>
      </nav>
      <Sidenav isOpen={isSidenavOpen} onClose={handleSideMenuToggle} />
    </>
  );
}
