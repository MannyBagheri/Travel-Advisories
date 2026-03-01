import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  //Fixing the Fetch Problem (Unknown Why!!!)
  server: {
    proxy: {
      "/alerts": "http://localhost:9000",
      "/bookmarks": "http://localhost:9000",
      "/db": "http://localhost:9000",
      "/about": "http://localhost:9000",
    },
  },
});