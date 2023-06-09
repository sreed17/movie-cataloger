/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{ts,js,jsx,tsx}",
    "./src/components/**/*.{ts,js,jsx,tsx}",
    "./src/pages/**/*.{ts,js,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
