import { useEffect, useRef, useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { floor, map } from 'lodash';
import Icon from '@/assets/svg/icon.svg';
import Logo from '@/assets/svg/logo.svg';
import Logotype from '@/assets/svg/logotype.svg';
import { socials } from '@/content';
import { useScreenSize } from '@/hooks/useScreenSize';
import useTranslations, { defaultLocale } from '@/hooks/useTranslations';
import { routes } from '@/utils';
import Link from '../elements/Link';
import LocaleSwitcher from '../elements/LocaleSwitcher';
import ToTop from '../elements/ToTop';
import type { FooterData } from '@/types/globals';

type Props = {
  blok: SbBlokData & FooterData
};

const parallaxPercentage = 25;

export default function Footer(props: Props) {
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

  return (
    <footer
      ref={footerRef}
      style={isTablet ? {} : {
        bottom: bottomOffset,
        transform: `translateY(${animationOffset}%)`,
      }}
      {...storyblokEditable(props.blok)}
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
            {map(props.blok.sitemap, (route) => (
              <Link
                className="footer-link"
                key={route.link.url}
                link={route.link}
              >
                {route.label}
              </Link>
            ))}
          </div>
          <LocaleSwitcher />
          <div className="socials-wrapper">
            <span className="label">{props.blok.socialsLabel}</span>
            <div className="socials">
              {map(props.blok.socialsLinks, (link) => (
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
          </div>
        </div>
        <ToTop className="mobile-to-top" />
        <div className="legal-wrapper">
          <span className="copyright">
            Copyright &copy; {new Date().getFullYear()} Studio Lumistra
          </span>
          <Link href={routes.privacyPolicy} locale={defaultLocale}>
            {t('globals.privacy_policy')}
          </Link>
          <span className="cookie-preferences" data-cc="show-preferencesModal">
            {t('globals.cookies')}
          </span>
          <ToTop className="desktop-to-top" />
        </div>
        <div className="company-details-wrapper">
          <div className="company-details">
            <span>Studio Lumistra,</span>
            <span>VAT ID: HR52391551302;</span>
            <span>IBAN: HR2723400091160777694;</span>
            <span>SWIFT CODE: PBZGHR2X;</span>
            <span>Bank: Privredna banka Zagreb d.d.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
