import classNames from 'classnames';
import Arrow from '@/assets/svg/arrow.svg';
import Link from './Link';

type Props = {
  children: string
  className?: string,
  href?: string,
  locale?: string,
  onClick?: () => void,
};

export default function CtaLink(props: Props) {
  if (props.onClick) {
    return (
      <div
        className={classNames('cta-link', props.className)}
        onClick={props.onClick}
      >
        {props.children}
        <Arrow />
      </div>
    );
  }

  return (
    <Link
      className={classNames('cta-link', props.className)}
      href={props.href}
      locale={props.locale}
    >
      {props.children}
      <Arrow />
    </Link>
  );
}
