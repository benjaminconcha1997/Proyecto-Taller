import { API_URL } from "../config/api.js";
import { authHeaders } from "./authHeaders.js";

export async function getWorkshops() {
  const res = await fetch(`${API_URL}/workshops`);
  if (!res.ok) throw new Error("Error al cargar talleres");
  return res.json();
}

export async function createWorkshop(data) {
  const res = await fetch(`${API_URL}/workshops`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear taller");
  return res.json();
}

export async function updateWorkshop(id, data) {
  const res = await fetch(`${API_URL}/workshops/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar taller");
  return res.json();
}

export async function deleteWorkshop(id) {
  const res = await fetch(`${API_URL}/workshops/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error("Error al eliminar taller");
}