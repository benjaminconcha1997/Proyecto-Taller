import { useState } from "react";

function getInitialForm(workshop) {
  return {
    title: workshop?.title || "",
    description: workshop?.description || "",
    teacher: workshop?.teacher || "",
    day: workshop?.day || "",
    schedule: workshop?.schedule || "",
    availableSlots: workshop?.availableSlots ?? "",
    price: workshop?.price ?? "",
    image: workshop?.image || "https://placehold.co/600x400/d3b29a/4a3024?text=Taller",
    status: workshop?.status || "disponible",
  };
}

function WorkshopForm({ workshop, onSave, onCancel }) {
  const [form, setForm] = useState(getInitialForm(workshop));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(workshop);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.teacher || !form.day) {
      setError("Completa al menos título, profesor/a y día.");
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
          {isEditing ? "Editar Taller" : "Crear Nuevo Taller"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm text-ink font-medium">Título</label>
            <input id="title" name="title" type="text" value={form.title} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm text-ink font-medium">Descripción</label>
            <textarea id="description" name="description" rows="3" value={form.description} onChange={handleChange} className={`${inputClass} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="teacher" className="text-sm text-ink font-medium">Profesor/a</label>
              <input id="teacher" name="teacher" type="text" value={form.teacher} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="day" className="text-sm text-ink font-medium">Día</label>
              <input id="day" name="day" type="text" value={form.day} onChange={handleChange} placeholder="Martes" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="schedule" className="text-sm text-ink font-medium">Horario</label>
              <input id="schedule" name="schedule" type="text" value={form.schedule} onChange={handleChange} placeholder="18:00 - 20:00" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="availableSlots" className="text-sm text-ink font-medium">Cupos</label>
              <input id="availableSlots" name="availableSlots" type="number" value={form.availableSlots} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="price" className="text-sm text-ink font-medium">Precio</label>
              <input id="price" name="price" type="number" value={form.price} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="status" className="text-sm text-ink font-medium">Estado</label>
              <select id="status" name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option value="disponible">Disponible</option>
                <option value="agotado">Agotado</option>
                <option value="proximamente">Próximamente</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="image" className="text-sm text-ink font-medium">URL de imagen</label>
            <input id="image" name="image" type="text" value={form.image} onChange={handleChange} className={inputClass} />
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

export default WorkshopForm;