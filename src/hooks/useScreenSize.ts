import { useEffect, useState } from 'react';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    isTablet: false,
    isMobile: false,
  });

  useEffect(() => {
    const tabletQuery = window.matchMedia('(max-width: 991px)');
    const mobileQuery = window.matchMedia('(max-width: 679px)');

    const handler = () => {
      setScreenSize({
        isTablet: tabletQuery.matches,
        isMobile: mobileQuery.matches,
      });
    };

    handler();
    tabletQuery.addEventListener('change', handler);
    mobileQuery.addEventListener('change', handler);

    return () => {
      tabletQuery.removeEventListener('change', handler);
      mobileQuery.removeEventListener('change', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isDesktop: !screenSize.isTablet && !screenSize.isMobile,
    isTablet: screenSize.isTablet,
    isMobile: screenSize.isMobile,
  };
};
