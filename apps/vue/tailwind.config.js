const primeColors = require("./tailwind/primeColors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...primeColors,
      },
    },
  },
  plugins: [],
};
