
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Eğer src kullanıyorsanız
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-condensed': ['"Roboto Condensed"', 'sans-serif'],
        'cinzel': ['Cinzel', 'serif'],
      },
      fontSize: {
        '3xl': '3rem', // Bu, mevcut Tailwind'deki 3xl'yi özelleştirir
      },
    },
  },
  plugins: [],
};
