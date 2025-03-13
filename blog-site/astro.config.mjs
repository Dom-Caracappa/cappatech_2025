import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
    integrations: [react(), tailwind()],
    vite: {
        css: {
            postcss: "../../postcss.config.cjs", // Relative path from each subproject
        },
        optimizeDeps: {
            include: ["three"],
        },
    },
});
