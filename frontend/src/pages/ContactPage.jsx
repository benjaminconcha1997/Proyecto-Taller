import { Mail, Phone, MapPin } from "lucide-react";
import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import ContactForm from "../components/contact/ContactForm.jsx";

// Datos de contacto de ejemplo (ajústalos a los reales del taller).
const contactInfo = [
  { icon: MapPin, label: "Dirección", value: "Vitacura, Santiago, Chile" },
  { icon: Mail, label: "Correo", value: "hola@tallerpuertaroja.cl" },
  { icon: Phone, label: "Teléfono", value: "+56 9 1234 5678" },
];

function ContactPage() {
  return (
    <PageLayout>
      <PageHero
        title="Contáctanos"
        subtitle="¿Tienes dudas sobre nuestros talleres o productos? Escríbenos y te responderemos a la brevedad."
      />

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-medium text-ink mb-6">Envíanos un mensaje</h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="text-2xl font-medium text-ink mb-6">Información de contacto</h2>
            <ul className="flex flex-col gap-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="bg-terracotta/10 p-3 rounded-full">
                      <Icon className="w-6 h-6 text-terracotta" />
                    </div>
                    <div>
                      <p className="text-sm text-stone">{item.label}</p>
                      <p className="text-ink">{item.value}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default ContactPage;