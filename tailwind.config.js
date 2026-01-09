/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable manual dark mode toggle or system preference (usually 'media' by default, but let's support 'class' for user toggle if needed, requirements say "Support for Dark/Light mode")
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3e8ff',
          100: '#e9d5ff',
          200: '#d8b4fe',
          300: '#c084fc',
          400: '#a855f7',
          500: '#9333ea', // Primary Purple
          600: '#7e22ce',
          700: '#6b21a8',
          800: '#581c87',
          900: '#3b0764',
        }
      }
    },
  },
  plugins: [],
}
