/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { imagetools } from 'vite-imagetools'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  base: '/',
  plugins: [react(), tsconfigPaths(), imagetools()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  }
})
