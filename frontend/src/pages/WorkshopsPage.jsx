import { useEffect, useState } from "react";
import { Users, Package, Award } from "lucide-react";
import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import WorkshopCard from "../components/home/WorkshopCard.jsx";
import { getWorkshops } from "../services/workshopService.js";
import heroImage from "../assets/images/hero.jpg";

// Beneficios fijos extraídos del diseño de Figma.
const benefits = [
  {
    icon: Users,
    title: "Grupos Pequeños",
    description:
      "Máximo 8 personas por taller para garantizar atención personalizada.",
  },
  {
    icon: Package,
    title: "Materiales Incluidos",
    description:
      "Todos los materiales y herramientas necesarias están incluidos.",
  },
  {
    icon: Award,
    title: "Profesoras con Experiencia",
    description:
      "Aprende de ceramistas profesionales con años de experiencia.",
  },
];

function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    getWorkshops().then(setWorkshops);
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Descubre Nuestros Talleres de Cerámica"
        subtitle="Aprende técnicas artesanales en un ambiente creativo y profesional. Cursos para todos los niveles."
        image={heroImage}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#e8ddd6]/30">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="flex flex-col items-center text-center gap-3">
                <div className="bg-terracotta/10 p-4 rounded-full">
                  <Icon className="w-8 h-8 text-terracotta" />
                </div>
                <h3 className="text-lg font-medium text-ink">{benefit.title}</h3>
                <p className="text-stone">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}

export default WorkshopsPage;