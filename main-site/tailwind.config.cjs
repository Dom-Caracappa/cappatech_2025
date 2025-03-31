/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
    theme: {
        extend: {
            colors: {
                glass: "rgba(255, 255, 255, 0.3)", // Custom translucent color
            },
            backdropBlur: {
                xs: "2px",
                sm: "4px",
                md: "8px",
                lg: "16px",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
};
