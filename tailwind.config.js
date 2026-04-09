/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        bg:       '#0f0f13',
        surface:  '#1a1a24',
        card:     '#1e1e2e',
        elevated: '#252538',
        accent:   '#6366f1',
      },
    },
  },
  plugins: [],
}
