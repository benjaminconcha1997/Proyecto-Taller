import { workshops } from "../data/workshops.js";
import { API_URL } from "../config/api.js";

// Hoy retorna datos mock. Para conectar el backend, descomenta el fetch
// y elimina el return del mock.
export async function getWorkshops() {
  // const res = await fetch(`${API_URL}/workshops`);
  // if (!res.ok) throw new Error("Error al cargar talleres");
  // return res.json();
  return Promise.resolve(workshops);
}