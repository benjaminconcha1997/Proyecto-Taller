import { useState } from "react";

// Valores iniciales: si recibe un item, edita; si no, crea vacío.
function getInitialForm(item) {
  return {
    name: item?.name || "",
    category: item?.category || "",
    quantity: item?.quantity ?? "",
    unit: item?.unit || "",
    minStock: item?.minStock ?? "",
    unitPrice: item?.unitPrice ?? "",
  };
}

function InventoryForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState(getInitialForm(item));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(item);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.category || !form.unit) {
      setError("Completa al menos nombre, categoría y unidad.");
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

  return (
    <div className="fixed inset-0 bg-ink/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        <h3 className="text-xl font-medium text-ink mb-5">
          {isEditing ? "Editar Item" : "Agregar Item"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-ink font-medium">Nombre</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
              className="px-3 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className="text-sm text-ink font-medium">Categoría</label>
            <input id="category" name="category" type="text" value={form.category} onChange={handleChange}
              className="px-3 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quantity" className="text-sm text-ink font-medium">Cantidad</label>
              <input id="quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange}
                className="px-3 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="unit" className="text-sm text-ink font-medium">Unidad</label>
              <input id="unit" name="unit" type="text" value={form.unit} onChange={handleChange} placeholder="kg, litros, unidades"
                className="px-3 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="minStock" className="text-sm text-ink font-medium">Stock Mínimo</label>
              <input id="minStock" name="minStock" type="number" value={form.minStock} onChange={handleChange}
                className="px-3 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="unitPrice" className="text-sm text-ink font-medium">Precio Unitario</label>
              <input id="unitPrice" name="unitPrice" type="number" value={form.unitPrice} onChange={handleChange}
                className="px-3 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40" />
            </div>
          </div>

          {error && <p className="text-red-700 text-sm">{error}</p>}

          <div className="flex gap-3 justify-end mt-2">
            <button type="button" onClick={onCancel}
              className="px-5 py-2.5 rounded-xl bg-cream text-ink font-medium border border-border/20 hover:bg-clay/10 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-60">
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InventoryForm;