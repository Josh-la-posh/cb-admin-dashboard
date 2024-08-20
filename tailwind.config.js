/** @type {import('tailwindcss').Config} */

// const {colors: defaultColors} = require('tailwindcss/defaultTheme');

// const colors = {
//   ...defaultColors,
//   ...{
//     'primaryColor': '#272662'
//   }
// }

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      'white': '#ffffff',
      'gray': '#808080e2',
      'black': '#212121',
      'priColor': '#272662',
      'secColoor': '#f7f7f7'
    }
  },
  plugins: [],
}

