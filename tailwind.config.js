//  TODO: Move these into helpers
const Color = require("color");

// TODO: Move this to config file
const customColors = {
  backgroundCream: "#f2efdd",
  maroon100: "#3d081b",
  errorRed: "#FF4B4B",
  orange100: "#ec7413",
  gray50: "#636063",
  gray100: "#232223",
  green100: "#157149",
};

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,css}",
    "./src/components/**/*.{js,ts,jsx,tsx,css}",
    "./src/atoms/**/*.{js,ts,jsx,tsx,css}",
    "./src/molecules/**/*.{js,ts,jsx,tsx,css}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,css}",
    "./src/organisms/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "640px", // => @media (min-width: 640px) { ... }
        laptop: "1024px", // => @media (min-width: 1024px) { ... }
        desktop: "1280px", // => @media (min-width: 1280px) { ... }
        phone: { min: "280px", max: "767px" },
      },
      colors: {
        maroon100: customColors.maroon100,
        orange100: customColors.orange100,
        errorRed: customColors.errorRed,
        gray50: customColors.gray50,
        gray100: customColors.gray100,
        green100: customColors.green100,
        backgroundCream: customColors.backgroundCream,
      },
      backgroundImage: {
        banner: "url('/ban.jpg')",
      },
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(1px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-2px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(2px, 0, 0)" },
        },
      },
      animation: {
        shake: "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both",
      },
    },
  },
  plugins: [],
};
