import Button from "../ui/Button.jsx";
import heroImage from "../../assets/images/hero.jpg";

function HeroSection() {
  return (
    <section className="relative">
      <img
        src={heroImage}
        alt="Manos trabajando arcilla en un torno de cerámica"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay oscuro para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />

      <div className="relative max-w-4xl mx-auto px-4 py-28 md:py-36 flex flex-col items-center text-center gap-7">
        <h1 className="text-4xl md:text-6xl font-medium text-white leading-tight">
          Crea, Aprende y Descubre la Cerámica Artesanal
        </h1>
        <p className="text-lg md:text-2xl text-white/90 max-w-2xl">
          Un taller de cerámica cálido en Santiago donde estudiantes, artistas y
          clientes se conectan a través de la arcilla, la creatividad y la
          artesanía.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button to="/talleres" variant="primary">
            Ver Talleres
          </Button>
          <Button to="/productos" variant="light">
            Visitar Tienda
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;