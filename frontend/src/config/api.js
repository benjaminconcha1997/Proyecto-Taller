// Lee la URL base de la API desde las variables de entorno (Vite).
// Hoy los services usan datos mock; cuando exista backend, lo usarán de aquí.
export const API_URL = import.meta.env.VITE_API_URL || "";