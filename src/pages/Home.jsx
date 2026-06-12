import PageLayout from "../components/layout/PageLayout.jsx";

function Home() {
  return (
    <PageLayout>
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-clay-900">Inicio</h1>
        <p className="mt-2 text-clay-700">
          Aquí irá la Home con todas sus secciones (Bloque 3).
        </p>
      </section>
    </PageLayout>
  );
}

export default Home;