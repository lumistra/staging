import { map } from 'lodash';
import Icon from '@/assets/svg/icon.svg';
import Logo from '@/assets/svg/logo.svg';
import { socials } from '@/content';
import useTranslations from '@/hooks/useTranslations';
import { routes } from '@/utils';
import Link from '../elements/Link';
import LocaleSwitcher from '../elements/LocaleSwitcher';
import ToTop from '../elements/ToTop';

export default function Footer() {
  const { t } = useTranslations();

  const sitemap = [
    { label: t('routes.home'), value: routes.home },
    { label: t('routes.work'), value: routes.work },
    { label: t('routes.services'), value: routes.services },
    { label: t('routes.about'), value: routes.about },
    { label: t('routes.contact'), value: routes.contact },
    { label: t('routes.articles'), value: routes.articles },
  ];

  return (
    <footer>
      <div className="content-container">
        <div className="identity-wrapper">
          <Icon className="logo logo-icon" />
          <Logo className="logo logo-text" />
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
          <ToTop />
        </div>
      </div>
    </footer>
  );
}
