/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("./tailwind")],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // NextUI spesific
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
