const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.green,
      btngreen: "#00B87C",
      phblack: "#535353",
      graay:"#F6F6F6",
      grey:"#A1A1A1",
      green: {
        DEFAULT: "#00B87C",
        light: "#E2FFF5"
      },
      secondary:"#1264A3",
      error:"#F40101"
    },
    fontFamily: {
      lato: ["'Lato', sans-serif"]
    },
    fontSizes: {
      'xxs':'.688rem',
      'xs':'.75rem',
      'ss':'.813rem',
      's':'.813rem',
      'sm':'.875rem',
      'tiny':'.938rem',
      'base':'.938rem',
      'l':'1.25rem',
      'lg':'1.875rem', 
      'xl':'1.125rem',
      'x1':'1.25rem',
      '2x1':'1rem', 
      '3x1': '1.35rem',
      '4x1': '1.5rem',
     },
     lineHeight:{
      'leading-1': '.75rem',
      'leading-2': '.938rem',
      'leading-3': '.975rem',
      'leading-4': '0.825rem',
      'leading-5': '1.25rem',
      'leading-6':	'1.923',
      'leading-7':	'1.75rem',
      'leading-8': '1.68rem',
      'leading-9': '1.563rem',
      'leading-10':	'1.05rem',
      'leading-none': '1.85rem',
      'leading-tight': '1.25rem',
      'leading-snug': '1.375rem',
      'leading-normal': '1.5rem',
      'leading-relaxed': '1.625rem',
      'leading-loose': '2rem',
     },
     height: {
      sm: '8px',
      lgcd: '208px',
      lgx2: '660px',
      xl: '57px',
     },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/custom-forms')]
  }
}
