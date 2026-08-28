/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EAF1FF',
          100: '#DCE8FF',
          500: '#2F6FED',
          600: '#255EDB',
        },
      },
      fontFamily: {
        sans: ['Google Sans', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
