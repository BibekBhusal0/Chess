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
        dash: {
          light: "#EDF3F4",
          dark: "#7e8a99",
        },
        default: {
          light: "#dbbc95",
          dark: "#7f623b",
        },
        glass: {
          light: "#DCDCDC",
          dark: "#6e7c7f",
        },
        ocen: {
          light: "#D5E0E6",
          dark: "#7FA0B5",
        },
        nature: {
          light: "#d3e5a5",
          dark: "#74997b",
        },
        wood: {
          light: "#BEA481",
          dark: "#73533A",
        },
        geometric: {
          light: "#C7C3AB",
          dark: "#77534c",
        },
        marble: {
          light: "#C8B97E",
          dark: "#32674A",
        },
        light: {
          light: "#a3b1cc",
          dark: "#575c66",
        },
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },

  plugins: [],
};
