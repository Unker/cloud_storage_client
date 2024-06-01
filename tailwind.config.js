/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{html,js,tsx}',
    './src/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

