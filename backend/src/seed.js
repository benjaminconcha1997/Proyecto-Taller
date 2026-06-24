import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  // Limpia tablas (orden no importa aquí, no hay relaciones aún)
  await prisma.workshop.deleteMany();
  await prisma.product.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.expense.deleteMany();

  await prisma.workshop.createMany({
    data: [
      { title: "Torno para principiantes", description: "Aprende a centrar y levantar tus primeras piezas en el torno alfarero.", teacher: "Camila Rojas", day: "Martes", schedule: "18:00 - 20:00", availableSlots: 4, price: 65000, image: "https://placehold.co/600x400/d3b29a/4a3024?text=Torno", status: "disponible" },
      { title: "Modelado a mano", description: "Técnicas de pellizco, rollo y plancha para crear piezas sin torno.", teacher: "Antonia Vidal", day: "Jueves", schedule: "10:00 - 12:00", availableSlots: 0, price: 55000, image: "https://placehold.co/600x400/bd8e6e/4a3024?text=Modelado", status: "agotado" },
      { title: "Esmaltado y color", description: "Explora esmaltes, óxidos y técnicas de color para terminar tus piezas.", teacher: "Camila Rojas", day: "Sábado", schedule: "11:00 - 13:30", availableSlots: 6, price: 70000, image: "https://placehold.co/600x400/a9714f/faf6f2?text=Esmaltado", status: "disponible" },
      { title: "Cerámica para niños", description: "Taller lúdico de cerámica para niñas y niños de 7 a 12 años.", teacher: "Antonia Vidal", day: "Viernes", schedule: "16:00 - 17:30", availableSlots: 8, price: 40000, image: "https://placehold.co/600x400/e4d0bf/4a3024?text=Ni%C3%B1os", status: "proximamente" },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: "Tazón de gres", description: "Tazón artesanal de gres esmaltado, ideal para el desayuno.", price: 18000, stock: 12, category: "Vajilla", image: "https://placehold.co/600x400/d3b29a/4a3024?text=Taz%C3%B3n", featured: true, status: "disponible" },
      { name: "Jarrón pequeño", description: "Jarrón decorativo modelado a mano con esmalte mate.", price: 32000, stock: 5, category: "Decoración", image: "https://placehold.co/600x400/bd8e6e/4a3024?text=Jarr%C3%B3n", featured: true, status: "disponible" },
      { name: "Set de 4 tazas", description: "Juego de cuatro tazas de cerámica en tonos tierra.", price: 48000, stock: 0, category: "Vajilla", image: "https://placehold.co/600x400/a9714f/faf6f2?text=Set+tazas", featured: false, status: "agotado" },
      { name: "Maceta artesanal", description: "Maceta de cerámica con plato, perfecta para suculentas.", price: 22000, stock: 9, category: "Jardín", image: "https://placehold.co/600x400/e4d0bf/4a3024?text=Maceta", featured: false, status: "disponible" },
      { name: "Plato hondo", description: "Plato hondo de gres con borde irregular hecho a mano.", price: 15000, stock: 20, category: "Vajilla", image: "https://placehold.co/600x400/d3b29a/4a3024?text=Plato", featured: false, status: "disponible" },
      { name: "Taza con asa torneada", description: "Taza individual torneada con asa cómoda y esmalte brillante.", price: 14000, stock: 3, category: "Vajilla", image: "https://placehold.co/600x400/bd8e6e/4a3024?text=Taza", featured: true, status: "disponible" },
    ],
  });

  await prisma.inventoryItem.createMany({
    data: [
      { name: "Arcilla Roja", category: "Materiales", quantity: 45, unit: "kg", minStock: 20, unitPrice: 2500 },
      { name: "Esmalte Blanco", category: "Materiales", quantity: 12, unit: "litros", minStock: 5, unitPrice: 8500 },
      { name: "Esmalte Terracota", category: "Materiales", quantity: 8, unit: "litros", minStock: 5, unitPrice: 9200 },
      { name: "Herramienta de Modelado Set", category: "Herramientas", quantity: 15, unit: "sets", minStock: 10, unitPrice: 12000 },
      { name: "Tazas Terminadas", category: "Productos", quantity: 24, unit: "unidades", minStock: 10, unitPrice: 18000 },
      { name: "Bowls Terminados", category: "Productos", quantity: 18, unit: "unidades", minStock: 8, unitPrice: 24000 },
      { name: "Jarrones Decorativos", category: "Productos", quantity: 6, unit: "unidades", minStock: 5, unitPrice: 28000 },
      { name: "Platos Artesanales", category: "Productos", quantity: 12, unit: "unidades", minStock: 6, unitPrice: 32000 },
    ],
  });

  await prisma.invoice.createMany({
    data: [
      { number: "F-001", client: "María Pérez", date: "2026-05-02", amount: 65000, status: "pagada" },
      { number: "F-002", client: "Tienda Local SpA", date: "2026-05-10", amount: 144000, status: "pendiente" },
      { number: "F-003", client: "Jorge Soto", date: "2026-05-18", amount: 32000, status: "pagada" },
      { number: "F-004", client: "Cafetería Aroma", date: "2026-05-25", amount: 96000, status: "pendiente" },
    ],
  });

  await prisma.expense.createMany({
    data: [
      { concept: "Compra de arcilla", category: "Materia prima", date: "2026-05-03", amount: 120000 },
      { concept: "Cuenta de electricidad (horno)", category: "Servicios", date: "2026-05-08", amount: 85000 },
      { concept: "Esmaltes y óxidos", category: "Materia prima", date: "2026-05-15", amount: 64000 },
      { concept: "Arriendo del taller", category: "Arriendo", date: "2026-05-01", amount: 350000 },
    ],
  });

  console.log("Datos semilla insertados correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());