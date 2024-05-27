/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        LM: "#4c0519",
        cosmos: {
          light: "#78818A",
          dark: "#565E68",
        },
        crazy: {
          light: "#BEA481",
          dark: "#73533A",
        },
        dash: {
          light: "#565E68",
          dark: "#633323",
        },
        default: {
          light: "#BEA481",
          dark: "#73533A",
        },
        glass: {
          light: "#687387",
          dark: "#2A313E",
        },
        "icy-sea": {
          light: "#D5E0E6",
          dark: "#7FA0B5",
        },
        nature: {
          light: "#BBCC91",
          dark: "#AAB78C",
        },
        ocen: {
          light: "#D9C9BE",
          dark: "#B29B87",
        },

        wood: {
          light: "#BEA481",
          dark: "#73533A",
        },
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },

  plugins: [],
};
