import NextLink from 'next/link';
import useTranslations, { defaultLocale } from '@/hooks/useTranslations';

type Props = {
  children: any
  className?: string,
  href: string,
  locale?: string,
  onClick?: () => void,
};

export default function Link(props: Props) {
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

  return (
    <NextLink
      className={props.className}
      href={`/${getLocale() + props.href}`.replace('//', '/')}
      onClick={props.onClick}
    >
      {props.children}
    </NextLink>
  );
}
