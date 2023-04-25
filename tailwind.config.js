/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Fira Sans"],
    },
    extend: {
      colors: {
        primary: "#16a085",
      },
    },
  },
};
