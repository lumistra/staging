import { useRouter } from 'next/router';
import useTranslations, { defaultLocale } from '@/hooks/useTranslations';
import { getRawPath } from '@/utils';
import type { CMSLink } from '@/types/shared';

type Props = {
  href?: string,
  link?: CMSLink
};

export default function useNavigation(locale?: string) {
  const router = useRouter();
  const { currentLocale } = useTranslations();

  const getLocale = () => {
    switch (true) {
      case locale && locale === defaultLocale:
        return '';
      case !locale && currentLocale === defaultLocale:
        return '';
      default:
        return locale || currentLocale;
    }
  };

  const isExternalHref = (props: Props) => props.link?.target === '_blank' || props.href?.match(/^(https?:)?\/\//);

  const getHref = (props: Props) => {
    if (props.link?.linktype === 'email') return `mailto:${props.link.url}`;
    if (isExternalHref(props)) return props.link?.url || props.href || '';
    if (props.href || props.link) {
      return `/${getLocale() + (props.link?.url || props.href)}`.replace('//', '/');
    }

    return `/${getLocale() + getRawPath(router.asPath)}`.replace('//', '/');
  };

  const navigate = (props: Props, exactUrl?: string) => {
    router.push(exactUrl || getHref(props));
  };

  return {
    getHref,
    getLocale,
    isExternalHref,
    navigate,
  };
}
