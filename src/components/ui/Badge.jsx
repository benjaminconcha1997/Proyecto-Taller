// Mapea cada status a su estilo y a su etiqueta en español.
const statusStyles = {
  disponible: "bg-green-100 text-green-800",
  agotado: "bg-red-100 text-red-800",
  proximamente: "bg-amber-100 text-amber-800",
};

const statusLabels = {
  disponible: "Disponible",
  agotado: "Agotado",
  proximamente: "Próximamente",
};

function Badge({ status }) {
  const style = statusStyles[status] || "bg-clay-100 text-clay-700";
  const label = statusLabels[status] || status;

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}
    >
      {label}
    </span>
  );
}

export default Badge;