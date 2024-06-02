import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRawPath } from '@/utils';

export default function PageTransition() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const path = getRawPath(router.asPath, false);

  useEffect(() => {
    const transitionTitleMask = document.getElementById('page-transition-title');
    const transitionMask = document.getElementById('page-transition');
    if (!transitionTitleMask || !transitionMask) return;

    const transitionTitle = document.querySelector('meta[name="transition-title"]')?.getAttribute('content') || 'Lumistra';

    setTitle(transitionTitle);
    transitionTitleMask.classList.add('animate-in');
    const timeoutId = setTimeout(() => {
      transitionMask.classList.add('hide');
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [path]);

  return (
    <div id="page-transition">
      <div id="page-transition-title" className="animate-in">
        <h1>{title}</h1>
      </div>
    </div>
  );
}
