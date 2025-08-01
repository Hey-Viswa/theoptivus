/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media', // This enables system-based theme switching
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        epilogue: ['var(--font-epilogue)'],
        caveat: ['var(--font-caveat)'],
      },
    },
  },
  plugins: [],
}

