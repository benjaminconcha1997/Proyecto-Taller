import { getWorkshops } from "../../services/workshopService.js";
import { useFetch } from "../../hooks/useFetch.js";
import SectionTitle from "../ui/SectionTitle.jsx";
import Button from "../ui/Button.jsx";
import Loader from "../ui/Loader.jsx";
import ErrorMessage from "../ui/ErrorMessage.jsx";
import WorkshopCard from "./WorkshopCard.jsx";

function WorkshopSection() {
  const { data: workshops, loading, error } = useFetch(getWorkshops);
  const featured = workshops.slice(0, 3);

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Talleres Destacados"
          subtitle="Únete a nuestros talleres prácticos y desarrolla tus habilidades en cerámica."
          centered
        />

        {loading && <Loader message="Cargando talleres..." />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
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
          </>
        )}
      </div>
    </section>
  );
}

export default WorkshopSection;