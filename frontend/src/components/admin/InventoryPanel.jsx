import { useEffect, useState } from "react";
import { getInventory } from "../../services/adminService.js";
import Loader from "../ui/Loader.jsx";
import ErrorMessage from "../ui/ErrorMessage.jsx";

function formatPrice(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

function getStockStatus(item) {
  return item.quantity <= item.minStock ? "Bajo" : "Normal";
}

function InventoryPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInventory()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleDelete(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleEdit(id) {
    console.log("Editar item", id);
  }

  function handleAdd() {
    console.log("Agregar nuevo item");
  }

  if (loading) return <Loader message="Cargando inventario..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-medium text-ink">
          Inventario de Materiales y Productos
        </h2>
        <button
          type="button"
          onClick={handleAdd}
          className="px-5 py-2.5 rounded-xl bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors whitespace-nowrap"
        >
          + Agregar Item
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-terracotta/10 text-ink">
              <th className="px-6 py-4 font-medium">Item</th>
              <th className="px-6 py-4 font-medium">Categoría</th>
              <th className="px-6 py-4 font-medium">Cantidad</th>
              <th className="px-6 py-4 font-medium">Stock Mínimo</th>
              <th className="px-6 py-4 font-medium">Precio Unitario</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-stone">
                  No hay items en el inventario.
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const status = getStockStatus(item);
                const isLow = status === "Bajo";
                return (
                  <tr
                    key={item.id}
                    className={`border-t border-border/15 ${index % 2 === 1 ? "bg-cream/50" : "bg-white"}`}
                  >
                    <td className="px-6 py-4 text-ink">{item.name}</td>
                    <td className="px-6 py-4 text-stone">{item.category}</td>
                    <td className="px-6 py-4 text-ink">{item.quantity} {item.unit}</td>
                    <td className="px-6 py-4 text-stone">{item.minStock} {item.unit}</td>
                    <td className="px-6 py-4 text-ink">{formatPrice(item.unitPrice)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          isLow ? "bg-red-100 text-red-700" : "bg-terracotta/10 text-terracotta"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button type="button" onClick={() => handleEdit(item.id)} className="text-clay hover:underline">
                          Editar
                        </button>
                        <button type="button" onClick={() => handleDelete(item.id)} className="text-stone hover:text-red-700 hover:underline">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default InventoryPanel;