/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'customRed':'#FF2A6D',
        'customLightBlue':'#d1f7ff',
        'customSkyBlue':'#05D9E8',
        'customBlue':'#005678',
        'customDeepBlue':'#01012B',
        'customGreen2':'#41ff91',
        'customGreen':'#07d6e1',
        'customPaleBlue':'#C0EEE4'        
      },
      backgroundImage: {
        'gradient-bg': "url('/src/assets/header/gradientBg.svg')",      
      }
    },
  },
  plugins: [],
}
