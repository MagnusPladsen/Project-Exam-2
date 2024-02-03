/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#FF467C",
        "primary-medium": "#FCAFBC",
        "primary-light": "#FFE3EB",
        "background": "#FAF5ED",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        logo: ["Lobster", "cursive"],
      },
    },
  },
  plugins: [],
};
