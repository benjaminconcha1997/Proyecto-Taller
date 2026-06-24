import { API_URL } from "../config/api.js";

export async function getWorkshops() {
  const res = await fetch(`${API_URL}/workshops`);
  if (!res.ok) throw new Error("Error al cargar talleres");
  return res.json();
}