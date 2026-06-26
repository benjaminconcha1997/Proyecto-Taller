import { useEffect, useState } from "react";
import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../../services/adminService.js";
import Loader from "../ui/Loader.jsx";
import ErrorMessage from "../ui/ErrorMessage.jsx";
import InvoiceForm from "./InvoiceForm.jsx";

function formatPrice(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

const statusStyles = {
  pagada: "bg-green-100 text-green-700",
  pendiente: "bg-amber-100 text-amber-800",
};
const statusLabels = { pagada: "Pagada", pendiente: "Pendiente" };

function InvoicesPanel() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  function loadInvoices() {
    setLoading(true);
    getInvoices()
      .then(setInvoices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  function handleCreate() {
    setEditingInvoice(null);
    setShowForm(true);
  }

  function handleEdit(invoice) {
    setEditingInvoice(invoice);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Eliminar esta factura?")) return;
    try {
      await deleteInvoice(id);
      loadInvoices();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSave(formData) {
    if (editingInvoice) {
      await updateInvoice(editingInvoice.id, formData);
    } else {
      await createInvoice(formData);
    }
    setShowForm(false);
    setEditingInvoice(null);
    loadInvoices();
  }

  if (loading) return <Loader message="Cargando facturas..." />;
  if (error) return <ErrorMessage message={error} />;

  // Totales calculados para las tarjetas de resumen.
  const total = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paid = invoices.filter((inv) => inv.status === "pagada");
  const pending = invoices.filter((inv) => inv.status === "pendiente");
  const paidTotal = paid.reduce((sum, inv) => sum + inv.amount, 0);
  const pendingTotal = pending.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-medium text-ink">Facturas y Ventas</h2>
        <button
          type="button"
          onClick={handleCreate}
          className="px-5 py-2.5 rounded-xl bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors whitespace-nowrap"
        >
          + Nueva Factura
        </button>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-stone">Total Ingresos</p>
          <p className="text-3xl font-medium text-ink mt-2">{formatPrice(total)}</p>
          <p className="text-sm text-stone mt-1">{invoices.length} facturas</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-stone">Pagado</p>
          <p className="text-3xl font-medium text-ink mt-2">{formatPrice(paidTotal)}</p>
          <p className="text-sm text-stone mt-1">{paid.length} facturas</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-stone">Pendiente</p>
          <p className="text-3xl font-medium text-ink mt-2">{formatPrice(pendingTotal)}</p>
          <p className="text-sm text-stone mt-1">{pending.length} facturas</p>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-terracotta/10 text-ink">
              <th className="px-6 py-4 font-medium">N° Factura</th>
              <th className="px-6 py-4 font-medium">Cliente</th>
              <th className="px-6 py-4 font-medium">Fecha</th>
              <th className="px-6 py-4 font-medium">Concepto</th>
              <th className="px-6 py-4 font-medium">Monto</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-stone">
                  No hay facturas registradas.
                </td>
              </tr>
            ) : (
              invoices.map((invoice, index) => (
                <tr
                  key={invoice.id}
                  className={`border-t border-border/15 ${index % 2 === 1 ? "bg-cream/50" : "bg-white"}`}
                >
                  <td className="px-6 py-4 text-ink font-medium">{invoice.number}</td>
                  <td className="px-6 py-4 text-ink">{invoice.client}</td>
                  <td className="px-6 py-4 text-stone">{invoice.date}</td>
                  <td className="px-6 py-4 text-stone">{invoice.concept}</td>
                  <td className="px-6 py-4 text-ink">{formatPrice(invoice.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyles[invoice.status]}`}>
                      {statusLabels[invoice.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button type="button" onClick={() => handleEdit(invoice)} className="text-clay hover:underline">
                        Editar
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

      {showForm && (
        <InvoiceForm
          invoice={editingInvoice}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingInvoice(null);
          }}
        />
      )}
    </section>
  );
}

export default InvoicesPanel;