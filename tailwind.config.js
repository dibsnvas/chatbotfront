/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#004062',
        customYellow: '#EAE2B7',
        customPink: '#E8B0C8'
      },
      fontFamily: {
        custom: ['"Climate Crisis"', 'sans-serif', 'Dela Gothic One'],
        serif: ['"PT Serif"', 'serif'],
      },
    },
  },
};