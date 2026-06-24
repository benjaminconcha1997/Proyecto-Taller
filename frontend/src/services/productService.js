import { API_URL } from "../config/api.js";

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}