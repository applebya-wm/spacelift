/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tsconfigPaths(),
    ViteImageOptimizer({
      /* pass your config */
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  }
})
