/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly SURREAL_HOST: string;
      readonly SURREAL_NS: string;
      readonly SURREAL_DB: string;
      readonly NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {}