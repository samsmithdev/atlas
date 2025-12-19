import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
],
  test: {
    environment: 'jsdom',
    globals: true, // Allows us to use 'describe', 'it', 'expect' without importing them every time
    // This helps us import using '@/' just like in Next.js
    alias: {
      '@': resolve(__dirname, './') 
    }
  },
})