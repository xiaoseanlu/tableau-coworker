/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public GitHub repo URL for the footer "Source" link (optional). */
  readonly VITE_GITHUB_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
