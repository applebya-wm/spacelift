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
      },
      fontSize: {
        sm: '0.85rem',
        xs: '0.7rem'
      },
      gap: {
        2: '0.5rem' // .gap-2 class
      }
    }
  },
  variants: {
    fill: ['hover', 'focus'] // this line does the trick
  },
  plugins: []
}
