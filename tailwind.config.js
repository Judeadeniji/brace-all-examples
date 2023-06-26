/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,mjs,ejs,ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#834fcd'
      }
    },
  },
  plugins: [
    require('autoprefixer')
    ],
}