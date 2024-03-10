/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_APP_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
