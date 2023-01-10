/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
      },
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
      xxxl: "1600px",
    },
    extend: {
      colors: {
        primary: "#3300ff",
        yellow: "#F7E547",
        pink: "#FF3B9A",
        skyblue: "#38D9D9",
        purple: "#A158FF",
        lightBrown: "#ff9285",
        grey: "#383838",
      },
      fontSize: {
        20: "20px",
        30: "30px",
        40: "40px",
        60: "60px",
        64: "64px",
        70: "70px",
      },
    },
    fontFamily: {
      anton: ["Anton", "sans-serif"],
      mukta: ["Mukta", "sans-serif"],
      colomboSans: ["Colombo Sans Font", "sans-serif"],
    },
  },
  plugins: [],
};
