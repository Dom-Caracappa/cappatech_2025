import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import 'dotenv/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
  ],
  vite: {
    define: {
      'process.env': process.env // Ensures environment variables are included
    },
    optimizeDeps: {
      include: ['three']
    },
    build: {
      rollupOptions: {
        external: [
          "admin.js", // Ensures admin.js is properly resolved
          "dotenv/config" // Avoids build errors related to dotenv
        ]
      }
    }
  }
});