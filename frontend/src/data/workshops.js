// Datos temporales de talleres.
// A futuro vendrán desde el backend; por ahora son mock locales.
// status: "disponible" | "agotado" | "proximamente"

export const workshops = [
  {
    id: 1,
    title: "Torno para principiantes",
    description:
      "Aprende a centrar y levantar tus primeras piezas en el torno alfarero.",
    teacher: "Camila Rojas",
    day: "Martes",
    schedule: "18:00 - 20:00",
    availableSlots: 4,
    price: 65000,
    image: "https://placehold.co/600x400/d3b29a/4a3024?text=Torno",
    status: "disponible",
  },
  {
    id: 2,
    title: "Modelado a mano",
    description:
      "Técnicas de pellizco, rollo y plancha para crear piezas sin torno.",
    teacher: "Antonia Vidal",
    day: "Jueves",
    schedule: "10:00 - 12:00",
    availableSlots: 0,
    price: 55000,
    image: "https://placehold.co/600x400/bd8e6e/4a3024?text=Modelado",
    status: "agotado",
  },
  {
    id: 3,
    title: "Esmaltado y color",
    description:
      "Explora esmaltes, óxidos y técnicas de color para terminar tus piezas.",
    teacher: "Camila Rojas",
    day: "Sábado",
    schedule: "11:00 - 13:30",
    availableSlots: 6,
    price: 70000,
    image: "https://placehold.co/600x400/a9714f/faf6f2?text=Esmaltado",
    status: "disponible",
  },
  {
    id: 4,
    title: "Cerámica para niños",
    description:
      "Taller lúdico de cerámica para niñas y niños de 7 a 12 años.",
    teacher: "Antonia Vidal",
    day: "Viernes",
    schedule: "16:00 - 17:30",
    availableSlots: 8,
    price: 40000,
    image: "https://placehold.co/600x400/e4d0bf/4a3024?text=Ni%C3%B1os",
    status: "proximamente",
  },
];