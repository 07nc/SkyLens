import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/opensky': {
        target: 'https://opensky-network.org/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/opensky/, '')
      },
      '/auth/opensky': {
        target: 'https://auth.opensky-network.org/auth',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth\/opensky/, '')
      }
    }
  }
})
