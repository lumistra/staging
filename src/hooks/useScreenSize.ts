import { useEffect, useState } from 'react';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    isLaptop: false,
    isTablet: false,
    isMobile: false,
  });

  useEffect(() => {
    const laptopQuery = window.matchMedia('(max-width: 1100px)');
    const tabletQuery = window.matchMedia('(max-width: 991px)');
    const mobileQuery = window.matchMedia('(max-width: 679px)');

    const handler = () => {
      setScreenSize({
        isLaptop: laptopQuery.matches,
        isTablet: tabletQuery.matches,
        isMobile: mobileQuery.matches,
      });
    };

    handler();
    laptopQuery.addEventListener('change', handler);
    tabletQuery.addEventListener('change', handler);
    mobileQuery.addEventListener('change', handler);

    return () => {
      laptopQuery.removeEventListener('change', handler);
      tabletQuery.removeEventListener('change', handler);
      mobileQuery.removeEventListener('change', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isDesktop: !screenSize.isTablet && !screenSize.isMobile,
    isLaptop: screenSize.isLaptop,
    isTablet: screenSize.isTablet,
    isMobile: screenSize.isMobile,
  };
};
