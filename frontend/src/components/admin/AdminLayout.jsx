import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.jsx";

function AdminLayout({ activeTab, onChangeTab, children }) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header propio del panel admin */}
      <header className="bg-white/95 border-b border-border/20">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <span className="text-xl md:text-2xl font-medium text-terracotta">
            Taller de la Puerta Roja - Admin
          </span>
          <Link
            to="/"
            className="px-5 py-2 rounded-xl bg-clay text-white font-medium hover:bg-clay-dark transition-colors"
          >
            Volver al sitio
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Título + tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-medium text-ink">
              Panel de Administración
            </h1>
            <p className="text-stone mt-1">
              Gestiona el inventario, facturas y gastos del taller
            </p>
          </div>
          <AdminSidebar activeTab={activeTab} onChangeTab={onChangeTab} />
        </div>

        {/* Contenido del tab activo */}
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;