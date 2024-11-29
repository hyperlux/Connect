/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'auroville-primary': '#FF6B6B',
        'dark': {
          'primary': '#E4E6EB',
          'secondary': '#B0B3B8',
          'card': '#242526',
          'hover': '#3A3B3C',
          'lighter': '#3A3B3C',
          DEFAULT: '#18191A',
        }
      }
    },
  },
  plugins: [],
}