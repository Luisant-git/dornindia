/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dorn: {
          light: '#e0f4f2',
          DEFAULT: '#36b3a8', // primary teal
          dark: '#2c938a',
        },
        navy: {
          DEFAULT: '#0d1b2a', // exact navbar navy
        },
        neutral: {
          50: '#FAFAFA', // light
          100: '#f1f5f9',
          800: '#2d2d2d', // footer top
          900: '#1f1f1f', // footer bottom
        }
      },
      fontFamily: {
        heading: ['"Crimson Text"', 'serif'],
        sans: ['Muli', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
