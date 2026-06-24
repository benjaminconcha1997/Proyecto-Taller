function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream mt-0">
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <p className="font-semibold text-lg">Taller de la Puerta Roja</p>
        <p className="text-sm mt-1 text-cream/70">
          Cerámica artesanal · Santiago, Chile
        </p>
        <p className="text-sm mt-6 text-cream/60">
          © {year} Taller de la Puerta Roja. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;