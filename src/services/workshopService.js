import { workshops } from "../data/workshops.js";

// Hoy retorna datos mock. Mañana:
//   const res = await fetch(`${import.meta.env.VITE_API_URL}/workshops`);
//   return res.json();
export async function getWorkshops() {
  return Promise.resolve(workshops);
}