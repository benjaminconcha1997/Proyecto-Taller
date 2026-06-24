import { useEffect, useState } from "react";
import { getInvoices } from "../../services/adminService.js";
import Loader from "../ui/Loader.jsx";
import ErrorMessage from "../ui/ErrorMessage.jsx";

function formatPrice(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

const statusStyles = {
  pagada: "bg-green-100 text-green-700",
  pendiente: "bg-amber-100 text-amber-800",
};

const statusLabels = {
  pagada: "Pagada",
  pendiente: "Pendiente",
};

function InvoicesPanel() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInvoices()
      .then(setInvoices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleDelete(id) {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  }

  if (loading) return <Loader message="Cargando facturas..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-medium text-ink">Facturas</h2>
        <button
          type="button"
          onClick={() => console.log("Registrar factura")}
          className="px-5 py-2.5 rounded-xl bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors whitespace-nowrap"
        >
          + Registrar Factura
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-terracotta/10 text-ink">
              <th className="px-6 py-4 font-medium">N°</th>
              <th className="px-6 py-4 font-medium">Cliente</th>
              <th className="px-6 py-4 font-medium">Fecha</th>
              <th className="px-6 py-4 font-medium">Monto</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-stone">
                  No hay facturas registradas.
                </td>
              </tr>
            ) : (
              invoices.map((invoice, index) => (
                <tr
                  key={invoice.id}
                  className={`border-t border-border/15 ${index % 2 === 1 ? "bg-cream/50" : "bg-white"}`}
                >
                  <td className="px-6 py-4 text-ink">{invoice.number}</td>
                  <td className="px-6 py-4 text-stone">{invoice.client}</td>
                  <td className="px-6 py-4 text-stone">{invoice.date}</td>
                  <td className="px-6 py-4 text-ink">{formatPrice(invoice.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyles[invoice.status]}`}>
                      {statusLabels[invoice.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button type="button" onClick={() => console.log("Ver factura", invoice.id)} className="text-clay hover:underline">
                        Ver
                      </button>
                      <button type="button" onClick={() => handleDelete(invoice.id)} className="text-stone hover:text-red-700 hover:underline">
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
    </section>
  );
}

export default InvoicesPanel;