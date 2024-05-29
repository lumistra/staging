import { map } from 'lodash';
import Close from '@/assets/svg/close.svg';
import Link from '@/components/elements/Link';
import LocaleSwitcher from '@/components/elements/LocaleSwitcher';
import { email, socials } from '@/content';
import useTranslations from '@/hooks/useTranslations';
import { routes } from '@/utils';

type Props = {
  isOpen: boolean
  onClose: () => void
};

export default function Sidenav(props: Props) {
  const { t } = useTranslations();

  const sitemap = [
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
            <LocaleSwitcher onClick={props.onClose} />
            <div className="cta-wrapper">
              <div className="socials">
                {map(socials, (link) => (
                  <a
                    className="label"
                    key={link.value}
                    href={link.value}
                    target="_blank"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                className="label"
                href={`mailto:${email}`}
                target="_blank"
              >
                {email}
              </a>
            </div>
          </div>
          <div className="routes-wrapper">
            {map(sitemap, (route) => (
              <Link
                className="nav-link"
                key={route.value}
                href={route.value}
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
  );
}
