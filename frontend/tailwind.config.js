/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1624px",
      },
      colors: {
        bgcolor: "#F5F7F8",
        accentColor: "#ECB365",
        lightColor: "#064663",
        midColor: "#04293A",
        darkColor: "#041C32",
        headerColor: "#041C32",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
