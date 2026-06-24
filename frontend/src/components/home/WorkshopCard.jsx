import { Calendar, Clock, Users } from "lucide-react";
import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";

// Formatea el precio en pesos chilenos.
function formatPrice(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

function WorkshopCard({ workshop }) {
  const { title, description, teacher, day, schedule, availableSlots, price, status } = workshop;
  const soldOut = status === "agotado";

  return (
    <Card className="p-6 flex flex-col gap-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-xl font-medium text-ink">{title}</h3>
        <Badge status={status} />
      </div>

      <p className="text-stone">{description}</p>

      <ul className="flex flex-col gap-3 text-ink/80">
        <li className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-terracotta" />
          <span>{day}</span>
        </li>
        <li className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-terracotta" />
          <span>{schedule}</span>
        </li>
        <li className="flex items-center gap-3">
          <Users className="w-5 h-5 text-terracotta" />
          <span>
            {availableSlots > 0 ? `${availableSlots} cupos disponibles` : "Sin cupos"}
          </span>
        </li>
      </ul>

      <p className="text-sm text-stone border-t border-border/15 pt-3">
        Profesora/or: <span className="text-ink">{teacher}</span>
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-lg font-medium text-terracotta">{formatPrice(price)}</span>
        <Button to="/talleres" variant={soldOut ? "secondary" : "primary"}>
          {soldOut ? "Agotado" : "Inscribirse"}
        </Button>
      </div>
    </Card>
  );
}

export default WorkshopCard;