import { useState } from "react";

function getInitialForm(expense) {
  return {
    concept: expense?.concept || "",
    category: expense?.category || "",
    provider: expense?.provider || "",
    date: expense?.date || "",
    amount: expense?.amount ?? "",
  };
}

function ExpenseForm({ expense, onSave, onCancel }) {
  const [form, setForm] = useState(getInitialForm(expense));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(expense);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.concept || !form.category) {
      setError("Completa al menos descripción y categoría.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await onSave(form);
    } catch (err) {
      setError(err.message || "No se pudo guardar.");
      setSaving(false);
    }
  }

  const inputClass =
    "px-3 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40";

  return (
    <div className="fixed inset-0 bg-ink/50 flex items-center justify-center p-4 z-[60]" onClick={onCancel}>
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-medium text-ink mb-5">
          {isEditing ? "Editar Gasto" : "Registrar Gasto"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="concept" className="text-sm text-ink font-medium">Descripción</label>
            <input id="concept" name="concept" type="text" value={form.concept} onChange={handleChange} placeholder="Compra de arcilla..." className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="category" className="text-sm text-ink font-medium">Categoría</label>
              <input id="category" name="category" type="text" value={form.category} onChange={handleChange} placeholder="Materiales, Servicios..." className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="provider" className="text-sm text-ink font-medium">Proveedor</label>
              <input id="provider" name="provider" type="text" value={form.provider} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="date" className="text-sm text-ink font-medium">Fecha</label>
              <input id="date" name="date" type="date" value={form.date} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="amount" className="text-sm text-ink font-medium">Monto</label>
              <input id="amount" name="amount" type="number" value={form.amount} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          {error && <p className="text-red-700 text-sm">{error}</p>}

          <div className="flex gap-3 justify-end mt-2">
            <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-cream text-ink font-medium border border-border/20 hover:bg-clay/10 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-60">
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;