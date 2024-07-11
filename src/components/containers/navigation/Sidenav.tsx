import classNames from 'classnames';
import { map } from 'lodash';
import Link from '@/components/elements/Link';
import LocaleSwitcher from '@/components/elements/LocaleSwitcher';
import type { SidenavData } from '@/types/globals';

type Props = {
  data: SidenavData
  isOpen: boolean
  onClose: () => void
};

export default function Sidenav(props: Props) {
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
              <div className="cta-wrapper">
                <div className="socials">
                  {map(props.data.socials, (link) => (
                    <a
                      className="label"
                      key={link.link.url}
                      href={link.link.url}
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <a
                  className="label"
                  href={`mailto:${props.data.cta.email}`}
                  target="_blank"
                >
                  {props.data.cta.email}
                </a>
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
