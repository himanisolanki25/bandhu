/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightPink: '#FAB3A9', // Example custom color
        darkPink: '#ED6B86', // Example custom color
        gray: '#BAA898', // Example custom color
        myBrown: '#463239', // Example custom color
        lightGray: '#EEEBD0', // Example custom color
        one: '#C4BBAE', // Example custom color
        two: '#A5978B', // Example custom color
        textBrown: '#280003', // Example custom color
      },
    },
  },
  plugins: [require('daisyui')],
}

