/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white2: "#FEFEFE",
      yellow2: "#EDA803",
      yellow2Contrast: "#FFBE68",
      green2: "#60CA87",
      green2Contrast: "#46D476",
      orange: "#A03E28",
      orangeContrast: "#DF5D40",
      baseColor: "#142028",
      lightGray: "#23323C",
      darkGray: "#0B1217",
      grey2: "#818EA3",
      disableBgColor: "#4E4E4E",
      disableTextColor: "#9A9A9A",
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      green: colors.green,
    },
    extend: {},
  },
  plugins: [],
};
