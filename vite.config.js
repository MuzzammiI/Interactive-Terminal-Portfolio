import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This is the CRITICAL line for GitHub Pages Project Pages
  base: '/Interactive-Terminal-Portfolio/', // <-- Make sure this matches your repo name exactly
  build: {
    outDir: 'dist', // This is the default output directory
  },
});