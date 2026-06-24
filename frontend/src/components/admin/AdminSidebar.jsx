const tabs = [
  { id: "inventory", label: "Inventario" },
  { id: "invoices", label: "Facturas" },
  { id: "expenses", label: "Gastos" },
];

function AdminSidebar({ activeTab, onChangeTab }) {
  return (
    <nav className="flex flex-wrap gap-3">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChangeTab(tab.id)}
            className={
              isActive
                ? "px-6 py-2.5 rounded-xl font-medium bg-terracotta text-white"
                : "px-6 py-2.5 rounded-xl font-medium bg-white text-ink hover:bg-cream border border-border/20"
            }
            aria-current={isActive ? "page" : undefined}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

export default AdminSidebar;