/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL canónica del sitio en producción (sin barra final), p. ej. https://www.vagalumetulum.com */
  readonly VITE_SITE_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
