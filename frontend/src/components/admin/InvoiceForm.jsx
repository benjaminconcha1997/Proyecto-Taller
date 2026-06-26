import { useState } from "react";

function getInitialForm(invoice) {
  return {
    number: invoice?.number || "",
    client: invoice?.client || "",
    concept: invoice?.concept || "",
    date: invoice?.date || "",
    amount: invoice?.amount ?? "",
    status: invoice?.status || "pendiente",
  };
}

function InvoiceForm({ invoice, onSave, onCancel }) {
  const [form, setForm] = useState(getInitialForm(invoice));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(invoice);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.number || !form.client) {
      setError("Completa al menos número y cliente.");
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
          {isEditing ? "Editar Factura" : "Nueva Factura"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="number" className="text-sm text-ink font-medium">N° Factura</label>
              <input id="number" name="number" type="text" value={form.number} onChange={handleChange} placeholder="F-2026-004" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="date" className="text-sm text-ink font-medium">Fecha</label>
              <input id="date" name="date" type="date" value={form.date} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="client" className="text-sm text-ink font-medium">Cliente</label>
            <input id="client" name="client" type="text" value={form.client} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="concept" className="text-sm text-ink font-medium">Concepto</label>
            <input id="concept" name="concept" type="text" value={form.concept} onChange={handleChange} placeholder="Taller Iniciación, 2x Tazas..." className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="amount" className="text-sm text-ink font-medium">Monto</label>
              <input id="amount" name="amount" type="number" value={form.amount} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="status" className="text-sm text-ink font-medium">Estado</label>
              <select id="status" name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option value="pagada">Pagada</option>
                <option value="pendiente">Pendiente</option>
              </select>
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

export default InvoiceForm;