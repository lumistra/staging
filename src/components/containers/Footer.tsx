import { useEffect, useRef, useState } from 'react';
import { floor, map } from 'lodash';
import Icon from '@/assets/svg/icon.svg';
import Logo from '@/assets/svg/logo.svg';
import Logotype from '@/assets/svg/logotype.svg';
import { socials } from '@/content';
import { useScreenSize } from '@/hooks/useScreenSize';
import useTranslations from '@/hooks/useTranslations';
import { routes } from '@/utils';
import Link from '../elements/Link';
import LocaleSwitcher from '../elements/LocaleSwitcher';
import ToTop from '../elements/ToTop';

const parallaxPercentage = 25;

export default function Footer() {
  const { t } = useTranslations();
  const { isTablet, isLaptop } = useScreenSize();
  const [animationOffset, setAnimationOffset] = useState(parallaxPercentage);
  const [bottomOffset, setBottomOffset] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = document.getElementById('page-wrapper');
    if (isTablet || !footerRef.current || !page) return;

    const handleFooterSizeChange = () => {
      if (!footerRef.current) return;
      const requiredOffset = footerRef.current.clientHeight - window.innerHeight;

      setBottomOffset(requiredOffset < 0 ? 0 : -requiredOffset);
    };

    const handleAnimation = () => {
      if (!page) return;
      const pageVisibleOnScreen = page.clientHeight - window.scrollY;
      const footerVisibleOnScreen = window.innerHeight - pageVisibleOnScreen;

      if (footerVisibleOnScreen < 0) return;

      const percent = floor(((footerVisibleOnScreen / (100 / parallaxPercentage)) / window.innerHeight) * 100, 1);
      if (percent > parallaxPercentage) return;

      setAnimationOffset(parallaxPercentage - percent);
    };

    handleFooterSizeChange();
    new ResizeObserver(handleFooterSizeChange).observe(footerRef.current);
    window.addEventListener('scroll', handleAnimation);

    return () => {
      window.removeEventListener('scroll', handleAnimation);
    };
  }, [isTablet]);

  const sitemap = [
    { label: t('routes.home'), value: routes.home },
    { label: t('routes.work'), value: routes.work },
    { label: t('routes.services'), value: routes.services },
    { label: t('routes.about'), value: routes.about },
    { label: t('routes.contact'), value: routes.contact },
    { label: t('routes.articles'), value: routes.articles },
  ];

  return (
    <footer
      ref={footerRef}
      style={isTablet ? {} : {
        bottom: bottomOffset,
        transform: `translateY(${animationOffset}%)`,
      }}
    >
      <div className="content-container">
        <div className="identity-wrapper">
          {isLaptop ? (
            <Logotype className="logo" />
          ) : (
            <>
              <Icon className="logo logo-icon" />
              <Logo className="logo logo-text" />
            </>
          )}
        </div>
        <hr className="divider" />
        <div className="cta-wrapper">
          <div className="sitemap-wrapper">
            {map(sitemap, (route) => (
              <Link
                className="footer-link"
                key={route.value}
                href={route.value}
              >
                {route.label}
              </Link>
            ))}
          </div>
          <LocaleSwitcher />
          <div className="socials-wrapper">
            <span className="label">{t('globals.socials')}</span>
            <div className="socials">
              {map(socials, (link) => (
                <a
                  className="social-icon"
                  key={link.value}
                  href={link.value}
                  target="_blank"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <ToTop className="mobile-to-top" />
        <div className="legal-wrapper">
          <span className="copyright">
            Copyright &copy; {new Date().getFullYear()} Lumistra
          </span>
          <Link href={routes.privacyPolicy}>
            {t('globals.privacy_policy')}
          </Link>
          <span>
            {t('globals.cookies')}
          </span>
          <ToTop className="desktop-to-top" />
        </div>
      </div>
    </footer>
  );
}
