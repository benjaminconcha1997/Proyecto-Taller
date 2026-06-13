import { inventory } from "../data/inventory.js";
import { invoices } from "../data/invoices.js";
import { expenses } from "../data/expenses.js";

export async function getInventory() {
  return Promise.resolve(inventory);
}

export async function getInvoices() {
  return Promise.resolve(invoices);
}

export async function getExpenses() {
  return Promise.resolve(expenses);
}