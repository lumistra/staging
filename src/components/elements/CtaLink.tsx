import classNames from 'classnames';
import Arrow from '@/assets/svg/arrow-straight.svg';
import Link from './Link';

type Props = {
  children: string
  className?: string,
  href?: string,
};

export default function CtaLink(props: Props) {
  return (
    <Link
      className={classNames('cta-link', props.className)}
      href={props.href}
    >
      {props.children}
      <Arrow />
    </Link>
  );
}
