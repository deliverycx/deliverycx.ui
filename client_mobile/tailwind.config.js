/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/entities/**/*.{html,tsx}',
    './src/shared/**/*.{html,tsx}',
    './src/features/**/*.{html,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#8d191d',
        white: '#FFFFFF',
        black: '#000000',
        primary: '#f2f2f2',
        secondary: '#999999',
      },
      fontFamily: {
        tilda: ['Tilda Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
