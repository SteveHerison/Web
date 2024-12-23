/** @type {import('tailwindcss').Config} */
const plugin = require("tailwind-scrollbar");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poiret: ["Poiret One", "sans-serif"],
      },
    },
  },
  plugins: [plugin],
};
