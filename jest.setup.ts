import '@testing-library/jest-dom';

beforeEach(() => {
  // document.execCommand = jest.fn()
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('*.svg', () => 'svg');

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      isFallback: false,
      basePath: '',
      locale: undefined,
      locales: undefined,
      defaultLocale: undefined,
      isReady: false,
      domainLocales: undefined,
      isPreview: false,
      isLocaleDomain: false,
    };
  },
}));
