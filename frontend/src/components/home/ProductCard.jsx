import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";

function formatPrice(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

function ProductCard({ product, onEdit, onDelete }) {
  const { name, description, price, image, status } = product;
  const isAdmin = Boolean(onEdit || onDelete);

  return (
    <Card className="flex flex-col">
      <div className="h-56 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <Badge status={status} />
        <h3 className="text-lg font-medium text-ink">{name}</h3>
        <p className="text-sm text-stone">{description}</p>
        <span className="text-xl text-terracotta mt-auto">{formatPrice(price)}</span>
        <Button to="/productos" variant="secondary" className="w-full">
          Ver Producto
        </Button>

        {/* Controles de administración (solo en modo admin) */}
        {isAdmin && (
          <div className="flex gap-3 border-t border-border/15 pt-3">
            <button type="button" onClick={onEdit} className="text-clay hover:underline text-sm">
              Editar
            </button>
            <button type="button" onClick={onDelete} className="text-stone hover:text-red-700 hover:underline text-sm">
              Eliminar
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

export default ProductCard;