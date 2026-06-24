import { API_URL } from "../config/api.js";

export async function getInventory() {
  const res = await fetch(`${API_URL}/inventory`);
  if (!res.ok) throw new Error("Error al cargar inventario");
  return res.json();
}

export async function getInvoices() {
  const res = await fetch(`${API_URL}/invoices`);
  if (!res.ok) throw new Error("Error al cargar facturas");
  return res.json();
}

export async function getExpenses() {
  const res = await fetch(`${API_URL}/expenses`);
  if (!res.ok) throw new Error("Error al cargar gastos");
  return res.json();
}

// --- CRUD de inventario ---

export async function createInventoryItem(data) {
  const res = await fetch(`${API_URL}/inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear item");
  return res.json();
}

export async function updateInventoryItem(id, data) {
  const res = await fetch(`${API_URL}/inventory/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar item");
  return res.json();
}

export async function deleteInventoryItem(id) {
  const res = await fetch(`${API_URL}/inventory/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar item");
}