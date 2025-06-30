declare module '*.module.scss' {
  const style: {
    readonly [key: string]: string;
  };

  export default style;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    environment: 'production' | 'staging'
    storyblokApiToken: string
    gtmId: string | undefined
    siteUrl: string | undefined
    basePath: string | undefined
    mockApi: string | undefined
  }
}

interface Window {
  dataLayer?: any[];
  gtag?: Function;
}
