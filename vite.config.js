import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    target: 'es2018',
    sourcemap: false,
    terserOptions: undefined,
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
  },
})
