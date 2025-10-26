/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#474747',
          green: '#5F6F55',
          light: '#BECDA3',
          gray: '#8F8B82',
          olive: '#8FA66E',
        }
      },
      fontSize: {
        'xl-plus': '1.375rem',
        '2xl-plus': '1.75rem',
      }
    },
  },
  plugins: [],
}
