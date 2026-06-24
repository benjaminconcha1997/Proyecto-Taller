import { Heart, Users, Sparkles } from "lucide-react";
import SectionTitle from "../ui/SectionTitle.jsx";
import Card from "../ui/Card.jsx";

const features = [
  {
    icon: Heart,
    title: "Artesanal y Local",
    description:
      "Cada pieza es elaborada con cuidado en nuestro taller en Santiago, apoyando a artesanos locales y prácticas sustentables.",
  },
  {
    icon: Users,
    title: "Talleres de Grupos Pequeños",
    description:
      "Aprende en clases íntimas con atención personalizada de artistas ceramistas experimentados.",
  },
  {
    icon: Sparkles,
    title: "Piezas Cerámicas Únicas",
    description:
      "Descubre creaciones únicas que aportan calidez y carácter a tu hogar.",
  },
];

function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-[#e8ddd6]/30">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Por Qué Elegirnos"
          subtitle="Combinamos técnicas tradicionales con creatividad moderna para ofrecer una experiencia cerámica auténtica."
          centered
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="p-8 flex flex-col items-center text-center gap-5">
                <div className="bg-terracotta/10 p-4 rounded-full">
                  <Icon className="w-8 h-8 text-terracotta" />
                </div>
                <h3 className="text-xl font-medium text-ink">{feature.title}</h3>
                <p className="text-stone">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;