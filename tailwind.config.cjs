/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Nunito", "ui-rounded", "system-ui", "sans-serif"],
      display: ["Shantell Sans", "Nunito", "cursive"],
    },
    extend: {
      boxShadow: {
        glow: "0 0 32px -8px rgb(var(--ev-moss) / 0.45)",
        "sketch-sm": "2px 2px 0 0 rgb(var(--ev-line))",
        sketch: "3px 3px 0 0 rgb(var(--ev-line))",
        "sketch-lg": "5px 5px 0 0 rgb(var(--ev-line))",
      },
      colors: {
        base:   "rgb(var(--ev-bg) / <alpha-value>)",
        raised: "rgb(var(--ev-raised) / <alpha-value>)",
        panel:  "rgb(var(--ev-panel) / <alpha-value>)",
        line:   "rgb(var(--ev-line) / <alpha-value>)",
        ink:    "rgb(var(--ev-ink) / <alpha-value>)",
        muted:  "rgb(var(--ev-muted) / <alpha-value>)",
        faint:  "rgb(var(--ev-faint) / <alpha-value>)",
        moss:   "rgb(var(--ev-moss) / <alpha-value>)",
        sea:    "rgb(var(--ev-sea) / <alpha-value>)",
        lake:   "rgb(var(--ev-lake) / <alpha-value>)",
        sun:    "rgb(var(--ev-sun) / <alpha-value>)",
        ember:  "rgb(var(--ev-ember) / <alpha-value>)",
        rose:   "rgb(var(--ev-rose) / <alpha-value>)",
        bloom:  "rgb(var(--ev-bloom) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}
