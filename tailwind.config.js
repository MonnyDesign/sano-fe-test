/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {

        pink: {
          "300": " #fff5f3",
          "400": "#ffdfd7",
          "500": "#F7D2D2"
        },
        burgundy: {
          "500": "#54223B"
        },
        orange: {
          "500": "#F75338"
        },
        green: {
          "500": "#4DB7A4"
        },
        blue: {
          "500": "#433EA5"
        }
      }
    },
  },
  plugins: [],
}

