/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-dark',
    'opacity-0',
    'opacity-100',
    'z-0',
    'z-10',
    'translate-x-0',
    '-translate-x-full',
    'translate-x-full',
    'scale-[1.01]',
    'transition-all',
    'duration-500',
    'ease-in-out',
    'transform'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'auroville-primary': '#FF8C00',
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
