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