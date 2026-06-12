/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta cálida provisional (tonos cerámica/arcilla).
        // La ajustaremos con los valores reales del Figma en el Bloque 3.
        clay: {
          50: "#faf6f2",
          100: "#f2e8df",
          200: "#e4d0bf",
          300: "#d3b29a",
          400: "#bd8e6e",
          500: "#a9714f",
          600: "#8f5a3d",
          700: "#734733",
          800: "#5c3a2c",
          900: "#4a3024",
        },
        brick: {
          // Acento "puerta roja"
          500: "#b8412e",
          600: "#9d3526",
        },
      },
      fontFamily: {
        sans: ["system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};