import { useState } from "react";

function getInitialForm(product) {
  return {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price ?? "",
    stock: product?.stock ?? "",
    category: product?.category || "",
    image: product?.image || "https://placehold.co/600x400/d3b29a/4a3024?text=Producto",
    featured: product?.featured ?? false,
    status: product?.status || "disponible",
  };
}

function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState(getInitialForm(product));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(product);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.category) {
      setError("Completa al menos nombre y categoría.");
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
          {isEditing ? "Editar Producto" : "Crear Nuevo Producto"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-ink font-medium">Nombre</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm text-ink font-medium">Descripción</label>
            <textarea id="description" name="description" rows="3" value={form.description} onChange={handleChange} className={`${inputClass} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="price" className="text-sm text-ink font-medium">Precio</label>
              <input id="price" name="price" type="number" value={form.price} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="stock" className="text-sm text-ink font-medium">Stock</label>
              <input id="stock" name="stock" type="number" value={form.stock} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="category" className="text-sm text-ink font-medium">Categoría</label>
              <input id="category" name="category" type="text" value={form.category} onChange={handleChange} placeholder="Vajilla, Decoración..." className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="status" className="text-sm text-ink font-medium">Estado</label>
              <select id="status" name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option value="disponible">Disponible</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="image" className="text-sm text-ink font-medium">URL de imagen</label>
            <input id="image" name="image" type="text" value={form.image} onChange={handleChange} className={inputClass} />
          </div>

          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-terracotta" />
            Producto destacado
          </label>

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

export default ProductForm;