declare module '*.scss' {
  const content: string;
  export default content;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    basePath: string
    storyblokApiToken: string
  }
}
