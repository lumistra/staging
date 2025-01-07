import classNames from 'classnames';
import Arrow from '@/assets/svg/arrow.svg';
import Link from '@/components/elements/Link';
import type { CMSLink } from '@/types/shared';

type Props = {
  children: string
  className?: string,
  href?: string,
  locale?: string,
  link?: CMSLink
  onClick?: () => void,
};

function CtaElement({ children }: { children: string }) {
  return (
    <>
      <div className="cta-container initial-container">
        {children}
        <Arrow />
      </div>
      <div className="cta-container hover-container">
        {children}
        <Arrow />
      </div>
    </>
  );
}

export default function CtaLink(props: Props) {
  if (props.onClick) {
    return (
      <div
        className={classNames('cta-link', props.className)}
        onClick={props.onClick}
      >
        <CtaElement>{props.children}</CtaElement>
      </div>
    );
  }

  return (
    <Link
      className={classNames('cta-link', props.className)}
      link={props.link}
      href={props.href}
      locale={props.locale}
    >
      <CtaElement>{props.children}</CtaElement>
    </Link>
  );
}
