function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-clay-100 border-t border-clay-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-clay-700">
        <p className="font-semibold text-clay-900">Taller de la Puerta Roja</p>
        <p className="text-sm mt-1">Cerámica artesanal · Vitacura, Chile</p>
        <p className="text-sm mt-4">
          © {year} Taller de la Puerta Roja. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;