/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        mainBg: "hsl(207, 26%, 17%)",
        lightBg: "hsl(0, 0%, 98%)",
        cardBg: "hsl(209, 23%, 22%)",
        lightCardBg: "hsl(0, 0%, 100%)",
        subWords: "hsl(0, 0%, 80%)",
        lightText: "hsl(200, 15%, 8%)",
      },

      fontFamily: {
        nunito: "Nunito Sans",
      },
      screens: {
        "-1000": { max: "1000px" },
        "-950": { max: "950px" },
        "-750": { max: "750px" },
        "-550": { max: "550px" },
        "-500": { max: "500px" },
        "-400": { max: "400px" },
      },
    },
  },
  plugins: [],
};
