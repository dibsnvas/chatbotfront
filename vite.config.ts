// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', 
    assetsDir: '.', 
    rollupOptions: {
      input: {
        main: './src/main.tsx', 
      },
    },
  },
});
