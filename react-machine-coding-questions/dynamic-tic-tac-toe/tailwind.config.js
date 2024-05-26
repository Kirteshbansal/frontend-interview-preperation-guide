/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    plugins: [],
  },
  safelist: [
    {
      pattern: /grid-(rows|cols)-(3|4|5|6|7|8|9|10)/,
    },
  ],
}