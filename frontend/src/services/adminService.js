import { API_URL } from "../config/api.js";
import { authHeaders } from "./authHeaders.js";

export async function getInventory() {
  const res = await fetch(`${API_URL}/inventory`);
  if (!res.ok) throw new Error("Error al cargar inventario");
  return res.json();
}

export async function getInvoices() {
  const res = await fetch(`${API_URL}/invoices`, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error("Error al cargar facturas");
  return res.json();
}

export async function createInvoice(data) {
  const res = await fetch(`${API_URL}/invoices`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear factura");
  return res.json();
}

export async function updateInvoice(id, data) {
  const res = await fetch(`${API_URL}/invoices/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar factura");
  return res.json();
}

export async function deleteInvoice(id) {
  const res = await fetch(`${API_URL}/invoices/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error("Error al eliminar factura");
}

export async function getExpenses() {
  const res = await fetch(`${API_URL}/expenses`, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error("Error al cargar gastos");
  return res.json();
}

export async function createExpense(data) {
  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear gasto");
  return res.json();
}

export async function updateExpense(id, data) {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar gasto");
  return res.json();
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error("Error al eliminar gasto");
}

// --- CRUD de inventario ---

export async function createInventoryItem(data) {
  const res = await fetch(`${API_URL}/inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear item");
  return res.json();
}

export async function updateInventoryItem(id, data) {
  const res = await fetch(`${API_URL}/inventory/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar item");
  return res.json();
}

export async function deleteInventoryItem(id) {
  const res = await fetch(`${API_URL}/inventory/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error("Error al eliminar item");
}