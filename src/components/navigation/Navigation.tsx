import { filter, map } from 'lodash';
import Link from 'next/link';
import Logo from '@/../public/assets/logo.svg';
import SidenavManu from '@/../public/assets/menu.svg';

export default function Navigation() {
  const links = [
    { label: 'Work', value: '/work', primary: true },
    { label: 'About', value: '/about', primary: true },
    { label: 'Contact', value: '/contact', primary: true },
  ];
  const primaryLinks = filter(links, 'primary');

  return (
    <nav className="navigation-wrapper">
      <div className="navigation-container">
        <Link href="/">
          <Logo className="logo" />
        </Link>
        <div className="links-wrapper">
          {map(primaryLinks, (link) => (
            <Link
              key={link.value}
              href={link.value}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
          <SidenavManu className="sidenav-icon" />
        </div>
      </div>
    </nav>
  );
}
