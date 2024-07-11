import { useEffect } from 'react';
import { includes } from 'lodash';
import { useRouter } from 'next/router';
import { defaultLocale } from '@/hooks/useTranslations';

export default function NotFound() {
  const router = useRouter();
  const match = `/${defaultLocale}/`;

  useEffect(() => {
    if (includes(window.location.pathname, match)) {
      router.push(window.location.pathname.replace(match, '/'));
    } else {
      router.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
