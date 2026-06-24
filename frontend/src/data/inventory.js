// Inventario de materiales y productos para el panel de administración.
// El estado (Normal/Bajo) se calcula a partir de quantity vs minStock.

export const inventory = [
  { id: 1, name: "Arcilla Roja", category: "Materiales", quantity: 45, unit: "kg", minStock: 20, unitPrice: 2500 },
  { id: 2, name: "Esmalte Blanco", category: "Materiales", quantity: 12, unit: "litros", minStock: 5, unitPrice: 8500 },
  { id: 3, name: "Esmalte Terracota", category: "Materiales", quantity: 8, unit: "litros", minStock: 5, unitPrice: 9200 },
  { id: 4, name: "Herramienta de Modelado Set", category: "Herramientas", quantity: 15, unit: "sets", minStock: 10, unitPrice: 12000 },
  { id: 5, name: "Tazas Terminadas", category: "Productos", quantity: 24, unit: "unidades", minStock: 10, unitPrice: 18000 },
  { id: 6, name: "Bowls Terminados", category: "Productos", quantity: 18, unit: "unidades", minStock: 8, unitPrice: 24000 },
  { id: 7, name: "Jarrones Decorativos", category: "Productos", quantity: 6, unit: "unidades", minStock: 5, unitPrice: 28000 },
  { id: 8, name: "Platos Artesanales", category: "Productos", quantity: 12, unit: "unidades", minStock: 6, unitPrice: 32000 },
];