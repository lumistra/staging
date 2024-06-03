import { useEffect, useState } from 'react';
import { includes } from 'lodash';
import { useRouter } from 'next/router';
import { getRawPath, routes } from '@/utils';

export default function PageTransition() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const path = getRawPath(router.asPath, false);

  useEffect(() => {
    const transitionTitle = document.querySelector('meta[name="transition-title"]')?.getAttribute('content') || 'Lumistra';
    setTitle(transitionTitle);

    const transitionTitleMask = document.getElementById('page-transition-title');
    const transitionMask = document.getElementById('page-transition');
    if (!transitionTitleMask || !transitionMask) return;

    transitionTitleMask.classList.add('animate-in');
    const timeoutId = setTimeout(() => {
      transitionMask.classList.add('hide');
    }, 1500);

    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  if (!includes(getRawPath(router.asPath), `${routes.work}/`)) return null;

  return (
    <div id="page-transition">
      <div id="page-transition-title" className="animate-in">
        <h1>{title}</h1>
      </div>
    </div>
  );
}
