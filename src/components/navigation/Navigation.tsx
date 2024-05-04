import { useEffect, useState } from 'react';
import { map } from 'lodash';
import Icon from '@/assets/icon.svg';
import Logo from '@/assets/logo.svg';
import Menu from '@/assets/menu.svg';
import Link from '@/components/misc/Link';
import useTranslation from '@/hooks/useTranslations';
import { routes } from '@/utils';
import Sidenav from './Sidenav';

export default function Navigation() {
  const { t } = useTranslation();
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
    <nav className="navigation-wrapper">
      <div className="navigation-container">
        <Link href="/">
          {isTop ? (
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
      <Sidenav isOpen={isSidenavOpen} onClose={handleSideMenuToggle} />
    </nav>
  );
}
