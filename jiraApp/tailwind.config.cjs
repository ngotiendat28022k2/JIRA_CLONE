/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "aside-blue": "#0747a6",
        "aside-gray": "#f4f5f7",
        bgMain: "#ffffff",
      },
    },
  },
  plugins: [],
};
