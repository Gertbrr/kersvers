/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        display: ["Lilita One", "sans-serif"],
        sans: ["Libre Franklin", "sans-serif"],
      },
    },
  },
  plugins: [],

  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
};
