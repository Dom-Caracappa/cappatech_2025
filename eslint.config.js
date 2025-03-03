import js from "@eslint/js";
import astro from "eslint-plugin-astro";

export default [
    js.configs.recommended, // ESLint recommended rules
    astro.configs.recommended, // Astro recommended rules

    {
        ignores: ["node_modules/", "dist/", "public/"], // Ignore unnecessary files

        plugins: { astro },
        languageOptions: {
            sourceType: "module",
        },

        settings: {
            "astro/enable": true, // Enable Astro support
        },

        rules: {
            "astro/no-set-html-directive": "warn",
            "astro/valid-compile-time-constant": "error",
            "no-unused-vars": "warn",
            "no-console": "warn",
            "semi": ["warn", "always"], // Example rule from your docs
        },
    },
];
