/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f0ff',
          100: '#e6deff',
          200: '#d1beff',
          300: '#b591ff',
          400: '#9361fc',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3e1c79',
        },
        dark: {
          100: '#13111C',
          200: '#17151F',
          300: '#1C1A24',
          400: '#212029',
          500: '#2A2833',
        },
        gray: {
          300: '#404040',
          400: '#7B7B7B',
          500: '#9CA3AF',
        }
      }
    },
  },
  plugins: [],
};