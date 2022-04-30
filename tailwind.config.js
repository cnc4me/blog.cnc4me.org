/* eslint-env node */
module.exports = {
  mode: "jit",
  content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "pastel-purple": "#d495f1"
      }
    }
  },
  plugins: []
};
