import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { includes, some } from 'lodash';
import { useRouter } from 'next/router';
import { getRawPath, routes } from '@/utils';

export default function PageTransition() {
  const router = useRouter();
  const [title, setTitle] = useState({ value: '', seed: Date.now() });
  const path = getRawPath(router.asPath, false);

  useEffect(() => {
    if (!includes(path, `${routes.expected.projects}/`)) return;

    const timeoutId = setTimeout(() => {
      const transitionTitle = document.querySelector('meta[name="transition-title"]')?.getAttribute('content') || 'Lumistra';
      setTitle({ value: transitionTitle, seed: Date.now() });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [path]);

  useEffect(() => {
    const transitionTitleMask = document.getElementById('page-transition-title');
    const transitionMask = document.getElementById('page-transition');
    if (!transitionTitleMask || !transitionMask) return;

    transitionTitleMask.classList.add('animate-in');
    const timeoutId = setTimeout(() => {
      transitionMask.classList.add('hide');
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [title]);

  return (
    <div
      id="page-transition"
      className={classNames({
        hide: some([
          `${routes.expected.work}/`,
          `${routes.expected.projects}/`,
        ], (slug) => !includes(getRawPath(router.asPath), slug)),
      })}
    >
      <div id="page-transition-title" className="animate-in">
        <h1>{title.value}</h1>
      </div>
    </div>
  );
}
