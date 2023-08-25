/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "fluid": "repeat(auto-fill, minmax(min(200px, 100%), 1fr))"
      }
    },
  },
  plugins: [],
};
