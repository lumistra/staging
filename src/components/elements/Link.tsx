import classNames from 'classnames';
import { includes } from 'lodash';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import useNavigation from '@/hooks/useNavigation';
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
  const { getHref, isExternalHref, navigate } = useNavigation(props.locale);

  const linkProp = { href: props.href, link: props.link };
  const isExternal = isExternalHref(linkProp);
  const trueHref = getHref(linkProp);
  const isSameRoute = getRawPath(router.asPath) === getRawPath(trueHref);

  const handleGoTo = () => {
    if (props.onClick) props.onClick();
    navigate({}, trueHref);
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
      target={isExternal ? '_blank' : '_self'}
    >
      {props.children}
    </NextLink>
  );
}
