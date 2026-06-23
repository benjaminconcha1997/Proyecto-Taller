import { useEffect, useState } from "react";
import { getExpenses } from "../../services/adminService.js";

function formatPrice(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

function ExpensesPanel() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses().then(setExpenses);
  }, []);

  function handleDelete(id) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }

  // Total calculado a partir de los gastos visibles.
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-medium text-ink">Gastos</h2>
        <button
          type="button"
          onClick={() => console.log("Registrar gasto")}
          className="px-5 py-2.5 rounded-xl bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors whitespace-nowrap"
        >
          + Registrar Gasto
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-terracotta/10 text-ink">
              <th className="px-6 py-4 font-medium">Concepto</th>
              <th className="px-6 py-4 font-medium">Categoría</th>
              <th className="px-6 py-4 font-medium">Fecha</th>
              <th className="px-6 py-4 font-medium">Monto</th>
              <th className="px-6 py-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr
                key={expense.id}
                className={`border-t border-border/15 ${index % 2 === 1 ? "bg-cream/50" : "bg-white"}`}
              >
                <td className="px-6 py-4 text-ink">{expense.concept}</td>
                <td className="px-6 py-4 text-stone">{expense.category}</td>
                <td className="px-6 py-4 text-stone">{expense.date}</td>
                <td className="px-6 py-4 text-ink">{formatPrice(expense.amount)}</td>
                <td className="px-6 py-4">
                  <button type="button" onClick={() => handleDelete(expense.id)} className="text-stone hover:text-red-700 hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border/15 bg-cream/50 font-medium text-ink">
              <td className="px-6 py-4" colSpan={3}>Total</td>
              <td className="px-6 py-4" colSpan={2}>{formatPrice(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

export default ExpensesPanel;