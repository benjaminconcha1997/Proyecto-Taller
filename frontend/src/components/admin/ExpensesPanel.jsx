import { useEffect, useState } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../../services/adminService.js";
import Loader from "../ui/Loader.jsx";
import ErrorMessage from "../ui/ErrorMessage.jsx";
import ExpenseForm from "./ExpenseForm.jsx";

function formatPrice(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

// Suma los montos de los gastos de una categoría dada.
function sumByCategory(expenses, category) {
  return expenses
    .filter((e) => e.category === category)
    .reduce((sum, e) => sum + e.amount, 0);
}
function countByCategory(expenses, category) {
  return expenses.filter((e) => e.category === category).length;
}

function ExpensesPanel() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  function loadExpenses() {
    setLoading(true);
    getExpenses()
      .then(setExpenses)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  function handleCreate() {
    setEditingExpense(null);
    setShowForm(true);
  }

  function handleEdit(expense) {
    setEditingExpense(expense);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Eliminar este gasto?")) return;
    try {
      await deleteExpense(id);
      loadExpenses();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSave(formData) {
    if (editingExpense) {
      await updateExpense(editingExpense.id, formData);
    } else {
      await createExpense(formData);
    }
    setShowForm(false);
    setEditingExpense(null);
    loadExpenses();
  }

  if (loading) return <Loader message="Cargando gastos..." />;
  if (error) return <ErrorMessage message={error} />;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const materialsTotal = sumByCategory(expenses, "Materiales");
  const servicesTotal = sumByCategory(expenses, "Servicios");

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-medium text-ink">Gastos y Egresos</h2>
        <button
          type="button"
          onClick={handleCreate}
          className="px-5 py-2.5 rounded-xl bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors whitespace-nowrap"
        >
          + Registrar Gasto
        </button>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-stone">Total Gastos</p>
          <p className="text-3xl font-medium text-ink mt-2">{formatPrice(total)}</p>
          <p className="text-sm text-stone mt-1">{expenses.length} transacciones</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-stone">Materiales</p>
          <p className="text-3xl font-medium text-ink mt-2">{formatPrice(materialsTotal)}</p>
          <p className="text-sm text-stone mt-1">{countByCategory(expenses, "Materiales")} transacciones</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-stone">Servicios</p>
          <p className="text-3xl font-medium text-ink mt-2">{formatPrice(servicesTotal)}</p>
          <p className="text-sm text-stone mt-1">{countByCategory(expenses, "Servicios")} transacciones</p>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-terracotta/10 text-ink">
              <th className="px-6 py-4 font-medium">Fecha</th>
              <th className="px-6 py-4 font-medium">Categoría</th>
              <th className="px-6 py-4 font-medium">Descripción</th>
              <th className="px-6 py-4 font-medium">Proveedor</th>
              <th className="px-6 py-4 font-medium">Monto</th>
              <th className="px-6 py-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-stone">
                  No hay gastos registrados.
                </td>
              </tr>
            ) : (
              expenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className={`border-t border-border/15 ${index % 2 === 1 ? "bg-cream/50" : "bg-white"}`}
                >
                  <td className="px-6 py-4 text-stone">{expense.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-terracotta/10 text-clay">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink">{expense.concept}</td>
                  <td className="px-6 py-4 text-stone">{expense.provider}</td>
                  <td className="px-6 py-4 text-ink">{formatPrice(expense.amount)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button type="button" onClick={() => handleEdit(expense)} className="text-clay hover:underline">
                        Editar
                      </button>
                      <button type="button" onClick={() => handleDelete(expense.id)} className="text-stone hover:text-red-700 hover:underline">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ExpenseForm
          expense={editingExpense}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingExpense(null);
          }}
        />
      )}
    </section>
  );
}

export default ExpensesPanel;