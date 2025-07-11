/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        priority: {
          low: '#fbbf24',
          medium: '#f97316',
          high: '#ef4444'
        },
        due: {
          overdue: '#ef4444',
          today: '#f97316',
          upcoming: '#22c55e',
          none: '#6b7280'
        }
      }
    },
  },
  plugins: [],
}