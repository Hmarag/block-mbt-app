// ...existing code...
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({
  base : '/block-mbt-app/frontend',
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs',
  },
  server: {
    proxy: {
      '/auth': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
// ...existing code...