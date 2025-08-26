/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rock: ['"Metal Mania"', 'cursive'],
      },
      colors: {
        primary: '#0d0d0d', // Fondo más oscuro
        secondary: '#ff0054', // Rojo vibrante
        accent: '#00ffae', // Verde brillante
        controlBg: '#333333', // Fondo de los controles
        controlHover: '#555555' // Fondo de los controles al pasar el ratón
      },
    },
  },
  plugins: [],
}

