import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind() // Official Astro Tailwind integration
  ],
  vite: {
    // (Optional) If you do have a postcss.config.cjs, point to it:
    // css: {
    //   postcss: 'main-site/postcss.config.cjs',
    // },
    optimizeDeps: {
      include: ['three']
    }
  }
});