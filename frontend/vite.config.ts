import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs',
  },
  // ΑΦΑΙΡΟΥΜΕ ΕΝΤΕΛΩΣ ΤΟ ΤΜΗΜΑ 'server' ΜΕ ΤΟ PROXY
})