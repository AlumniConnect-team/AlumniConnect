/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // This defines 'bg-pink-main' for your dashboard
        'pink-main': '#ff69b4', 
      },
    },
  },
  plugins: [],
}