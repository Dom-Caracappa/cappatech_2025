import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import 'dotenv/config';
import tsconfigPaths from "vite-tsconfig-paths";

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
    plugins: [tsconfigPaths()]
  },
  optimizeDeps: {
    include: ['three']
  },
  build: {
    rollupOptions: {
      external: [
        "dotenv/config" // Avoids build errors related to dotenv
      ]
    }
  }
}
);