/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: "hsl(207, 26%, 17%)",
        cardBg: "hsl(209, 23%, 22%)",
      },

      fontFamily: {
        nunito: "Nunito Sans",
      },
      screens: {
        "-950": { max: "950px" },
        "-750": { max: "750px" },
        "-500": { max: "500px" },
        "-400": { max: "400px" },
      },
    },
  },
  plugins: [],
};
