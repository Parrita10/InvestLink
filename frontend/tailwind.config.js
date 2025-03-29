/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // ✅ Asegura que busca en src
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
};