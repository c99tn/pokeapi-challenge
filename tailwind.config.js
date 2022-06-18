/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
   
  theme: {
    extend: {
      fontFamily: {
        "Josefin": ["Josefin Sans", ...defaultTheme.fontFamily.sans],
        "Pokemon": ["Pokemon", "./public/fonts/Pokemon.ttf"],
      },

    },
  },
  variants:{  
  extend: {},
  },
  plugins: [],
}
