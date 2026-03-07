import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // Use the repository name for GitHub Pages in production, otherwise use the root path for local dev
    base: command === 'build' ? '/dipilihzalma/' : '/',
  }
})
