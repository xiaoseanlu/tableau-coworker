import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// `base` is set to './' so the build runs equally well on GitHub Pages,
// from a file:// URL, or behind any reverse proxy.
export default defineConfig({
  plugins: [react()],
  base: './',
})
