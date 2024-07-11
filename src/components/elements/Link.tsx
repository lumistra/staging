import classNames from 'classnames';
import { includes } from 'lodash';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import useTranslations, { defaultLocale } from '@/hooks/useTranslations';
import { getRawPath, routes } from '@/utils';
import type { CMSLink } from '@/types/shared';

type Props = {
  children: any
  className?: string,
  href?: string,
  locale?: string,
  link?: CMSLink
  addActiveFlag?: boolean,
  onClick?: () => void,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
};

export default function Link(props: Props) {
  const router = useRouter();
  const { currentLocale } = useTranslations();
  const isExternalHref = props.link?.target === '_blank' || props.href?.match(/^(https?:)?\/\//);

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
    if (props.link?.linktype === 'email') return `mailto:${props.link.url}`;
    if (isExternalHref) return props.link?.url || props.href || '';
    if (props.href || props.link) {
      return `/${getLocale() + (props.link?.url || props.href)}`.replace('//', '/');
    }

    return `/${getLocale() + getRawPath(router.asPath)}`.replace('//', '/');
  };

  const trueHref = getHref();
  const isSameRoute = getRawPath(router.asPath) === getRawPath(trueHref);

  const handleGoTo = () => {
    if (props.onClick) props.onClick();
    router.push(trueHref);
  };

  const handleClick = (e: any) => {
    if (props.link?.linktype === 'email') return;
    e.preventDefault();

    const transitionTitleMask = document.getElementById('page-transition-title');
    const transitionMask = document.getElementById('page-transition');
    if (isSameRoute || !transitionTitleMask || !transitionMask || !includes(getRawPath(trueHref), `${routes.expected.projects}/`)) {
      handleGoTo();

      return;
    }

    transitionTitleMask.classList.remove('animate-in');
    transitionMask.classList.remove('hide');
    transitionMask.ontransitionend = () => {
      handleGoTo();
    };
  };

  return (
    <NextLink
      className={classNames(props.className, {
        ...(props.addActiveFlag ? { active: isSameRoute } : null),
      })}
      href={trueHref}
      onClick={handleClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      target={isExternalHref ? '_blank' : '_self'}
    >
      {props.children}
    </NextLink>
  );
}
