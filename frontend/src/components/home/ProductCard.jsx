import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";

function formatPrice(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

function ProductCard({ product }) {
  const { name, description, price, image, status } = product;

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
      </div>
    </Card>
  );
}

export default ProductCard;