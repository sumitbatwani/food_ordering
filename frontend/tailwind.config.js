const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#325BED",
        secondary: "#2d51cf",
        danger: "#ef4444",
        success: "#22c55e",

        primaryHover: "#2d51cf",
        primaryText: "#111827",
        subText: "#384252",
      },
      fontSize: {
        "5xs": "0.5rem",
        "4xs": "0.5625rem",
        "3xs": "0.625rem",
        "2xs": "0.6875rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "70%": { opacity: 0 },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 200ms ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
