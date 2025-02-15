/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        18: '4.5rem' // 18 * 0.25rem = 4.5rem
      },
      height: {
        '75vh': '75vh'
      }
    }
  },
  variants: {
    fill: ['hover', 'focus'] // this line does the trick
  },
  plugins: []
}
