/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: { 
      cat: ["Playfair Display", "serif"],
      sans: ["Inter", "sans-serif"],
      serif: ["Playfair Display", "serif"],
    },
    extend: {},
  },
  plugins: [
    require("@catppuccin/tailwindcss")({ defaultFlavour: "mocha" }),
    require("@tailwindcss/forms"),
  ],
}
