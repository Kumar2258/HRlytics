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
        primary: {
          DEFAULT: '#0066FF',
          dark: '#0052CC',
          light: '#4D94FF'
        },
        secondary: {
          DEFAULT: '#6B7280',
          dark: '#4B5563',
          light: '#9CA3AF'
        }
      }
    },
  },
  plugins: [],
} 