const statusStyles = {
  disponible: "bg-terracotta/10 text-terracotta",
  agotado: "bg-red-100 text-red-700",
  proximamente: "bg-amber-100 text-amber-800",
};

const statusLabels = {
  disponible: "Disponible",
  agotado: "Agotado",
  proximamente: "Próximamente",
};

function Badge({ status }) {
  const style = statusStyles[status] || "bg-stone/10 text-stone";
  const label = statusLabels[status] || status;

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}

export default Badge;