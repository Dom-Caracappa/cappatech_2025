/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}", // Ensures Tailwind scans all files
    ],
    theme: {
        extend: {
            animation: {
                slipstream: "slipstreamEffect 6s infinite linear" // 🔥 Fix: Matching case
            },
            keyframes: {
                slipstreamEffect: { // 🔥 Fix: Matches the `animation` property
                    "0%": { transform: "translateX(-20%) translateY(-20%) scale(1)", opacity: "0.5" },
                    "50%": { transform: "translateX(20%) translateY(20%) scale(1.2)", opacity: "0.8" },
                    "100%": { transform: "translateX(-20%) translateY(-20%) scale(1)", opacity: "0.5" },
                },
            },
        },
    },
};
