import { inventory } from "../data/inventory.js";
import { invoices } from "../data/invoices.js";
import { expenses } from "../data/expenses.js";
import { API_URL } from "../config/api.js";

export async function getInventory() {
  // const res = await fetch(`${API_URL}/inventory`);
  // if (!res.ok) throw new Error("Error al cargar inventario");
  // return res.json();
  return Promise.resolve(inventory);
}

export async function getInvoices() {
  // const res = await fetch(`${API_URL}/invoices`);
  // return res.json();
  return Promise.resolve(invoices);
}

export async function getExpenses() {
  // const res = await fetch(`${API_URL}/expenses`);
  // return res.json();
  return Promise.resolve(expenses);
}