import Button from "../ui/Button.jsx";

function ContactCTA() {
  return (
    <section className="py-20 bg-terracotta/10">
      <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center gap-7">
        <h2 className="text-3xl md:text-4xl font-medium text-ink">
          ¿Listo para Comenzar tu Viaje Creativo?
        </h2>
        <p className="text-lg text-stone">
          Únete a nuestra comunidad de entusiastas de la cerámica o visita
          nuestra tienda para descubrir piezas artesanales únicas. Estamos aquí
          para ayudarte a conectar con el arte de la alfarería.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button to="/contacto" variant="primary">
            Contáctanos
          </Button>
          <Button to="/talleres" variant="secondary">
            Ver Talleres
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;