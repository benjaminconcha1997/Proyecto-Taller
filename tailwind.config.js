/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta real extraída del diseño en Figma.
        cream: "#faf7f4", // fondo principal
        ink: "#3d3230", // texto oscuro / títulos / footer
        stone: "#756960", // texto secundario
        terracotta: {
          DEFAULT: "#c6775e", // acento principal (botones, badges)
          dark: "#b3674f", // hover
        },
        clay: {
          DEFAULT: "#8b6f5c", // botón secundario / marrón
          dark: "#7a6051",
        },
        border: "#8d6f5c", // borde header
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};