/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        auroville: {
          primary: '#E27B58',
          light: '#FDF1EC',
        },
      },
      backgroundColor: {
        dark: {
          DEFAULT: '#1a1a1a',
          lighter: '#1e1e1e',
          card: '#242424',
        }
      },
      textColor: {
        dark: {
          primary: '#ffffff',
          secondary: '#a0aec0',
        }
      },
      borderColor: {
        dark: {
          DEFAULT: '#333333',
        }
      }
    },
  },
  plugins: [],
};