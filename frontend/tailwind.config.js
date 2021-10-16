const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: "Elice Digital Baeum",
    screens: {
      'sm': {'max': '500px'},
      'md': {'max': '700px'},
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        gray: colors.coolGray,
        dblue: {
          300: '#2496ed',  // docker-lightblue
          DEFAULT: '#003f8c',
          700: '#002C66', // docker-deepblue
          900: '#0b214a',
        },  // boldFont, docker-deep deep blue
        dgray: '#e9ebee',  // docker-background
        dlgray: '#5a6774',  // lightFont, docker light gray

      },
      maxWidth: {
        '8xl': '1600px'
      }
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
    },
  },
  plugins: [],
}
