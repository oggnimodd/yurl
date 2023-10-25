const { nextui } = require("@nextui-org/react");
const { readableColor } = require("color2k");
const defaultTheme = require("tailwindcss/defaultTheme");
const { Default, primary, secondary, danger } = require("./colors");
const { swapColorValues } = require("./object");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // NextUI spesific
    "../../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "rotate-360": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "rotate-360": "rotate-360 1s linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        serif: defaultTheme.fontFamily.serif,
        mono: defaultTheme.fontFamily.mono,
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        radius: {
          small: "2px",
          medium: "4px",
          large: "6px",
        },
        borderWidth: {
          small: "1px",
          medium: "1px",
          large: "2px",
        },
      },
      themes: {
        light: {
          colors: {
            background: "#f2f2ff",
            focus: "#5F5AF6",
            default: {
              foreground: readableColor(Default[500]),
              DEFAULT: Default[500],
            },
            primary: {
              foreground: readableColor(primary[500]),
              DEFAULT: primary[500],
              ...primary,
            },
            secondary: {
              foreground: readableColor(secondary[500]),
              DEFAULT: secondary[500],
              ...secondary,
            },
            danger: {
              foreground: readableColor(danger[500]),
              DEFAULT: danger[500],
              ...danger,
            },
            content1: {
              DEFAULT: "#FFFFFF",
              foreground: "#11181C",
            },
            content2: {
              DEFAULT: Default[100],
              foreground: Default[800],
            },
            content3: {
              DEFAULT: Default[200],
              foreground: Default[700],
            },
            content4: {
              DEFAULT: Default[300],
              foreground: Default[600],
            },
          },
        },
        dark: {
          colors: {
            background: "#192132",
            focus: "#5F5AF6",
            default: {
              foreground: "#ffffff",
              DEFAULT: Default[500],
              ...swapColorValues(Default),
            },
            primary: {
              foreground: readableColor(primary[500]),
              DEFAULT: primary[500],
              ...swapColorValues(primary),
            },
            secondary: {
              foreground: readableColor(secondary[500]),
              DEFAULT: secondary[500],
              ...swapColorValues(secondary),
            },
            danger: {
              foreground: readableColor(danger[500]),
              DEFAULT: danger[500],
              ...swapColorValues(danger),
            },
            content1: {
              DEFAULT: Default[800],
              foreground: "#ffffff",
            },
            content2: {
              DEFAULT: Default[700],
              foreground: Default[100],
            },
            content3: {
              DEFAULT: Default[600],
              foreground: Default[100],
            },
            content4: {
              DEFAULT: Default[500],
              foreground: Default[100],
            },
          },
        },
      },
    }),
  ],
};
