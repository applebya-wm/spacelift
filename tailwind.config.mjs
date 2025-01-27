/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  variants: {
    fill: ['hover', 'focus'] // this line does the trick
  },
  plugins: []
}
