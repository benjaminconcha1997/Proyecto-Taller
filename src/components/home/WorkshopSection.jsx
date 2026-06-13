import { useEffect, useState } from "react";
import { getWorkshops } from "../../services/workshopService.js";
import SectionTitle from "../ui/SectionTitle.jsx";
import Button from "../ui/Button.jsx";
import WorkshopCard from "./WorkshopCard.jsx";

function WorkshopSection() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    getWorkshops().then(setWorkshops);
  }, []);

  // En la Home mostramos solo los primeros 3.
  const featured = workshops.slice(0, 3);

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Talleres Destacados"
          subtitle="Únete a nuestros talleres prácticos y desarrolla tus habilidades en cerámica."
          centered
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featured.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button to="/talleres" variant="secondary">
            Ver todos los talleres
          </Button>
        </div>
      </div>
    </section>
  );
}

export default WorkshopSection;