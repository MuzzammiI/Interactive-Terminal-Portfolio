import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Interactive-Terminal-Portfolio/',
   build: {
    outDir: 'dist', // This is the default, but good to confirm
  },
})
