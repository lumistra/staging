import classNames from 'classnames';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import useTranslations, { defaultLocale } from '@/hooks/useTranslations';
import { getRawPath } from '@/utils';

type Props = {
  children: any
  className?: string,
  href?: string,
  locale?: string,
  addActiveFlag?: boolean,
  onClick?: () => void,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
};

export default function Link(props: Props) {
  const router = useRouter();
  const { currentLocale } = useTranslations();

  const getLocale = () => {
    switch (true) {
      case props.locale && props.locale === defaultLocale:
        return '';
      case !props.locale && currentLocale === defaultLocale:
        return '';
      default:
        return props.locale || currentLocale;
    }
  };

  const getHref = () => {
    if (props.href) {
      return `/${getLocale() + props.href}`.replace('//', '/');
    }

    return `/${getLocale() + getRawPath(router.asPath)}`.replace('//', '/');
  };

  const trueHref = getHref();

  return (
    <NextLink
      className={classNames(props.className, {
        ...(props.addActiveFlag ? {
          active: getRawPath(router.asPath) === getRawPath(trueHref),
        } : null),
      })}
      href={trueHref}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </NextLink>
  );
}
