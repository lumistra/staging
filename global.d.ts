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
    basePath: string
    storyblokApiToken: string
  }
}
