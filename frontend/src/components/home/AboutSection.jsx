import aboutImage from "../../assets/images/about.jpg";

function AboutSection() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-medium text-ink">
            Bienvenido a Nuestro Espacio Creativo
          </h2>
          <p className="text-lg text-stone leading-relaxed">
            Taller de la Puerta Roja es más que un estudio de cerámica. Somos un
            espacio creativo colaborativo en el corazón de Santiago donde las
            clases de cerámica, las piezas artesanales y la expresión artística
            se encuentran.
          </p>
          <p className="text-lg text-stone leading-relaxed">
            Ya seas un principiante que busca explorar la alfarería por primera
            vez o un artista experimentado que busca un ambiente de apoyo,
            nuestro taller ofrece una atmósfera cálida y profesional para todos.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={aboutImage}
            alt="Persona modelando una pieza de cerámica en el torno"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;