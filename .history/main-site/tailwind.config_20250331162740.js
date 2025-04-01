/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx,astro}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        glass: "rgba(255, 255, 255, 0.3)",
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
  ],
};