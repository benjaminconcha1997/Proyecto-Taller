import PageLayout from "../components/layout/PageLayout.jsx";

function ProductsPage() {
  return (
    <PageLayout>
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-clay-900">Productos</h1>
        <p className="mt-2 text-clay-700">
          Listado de productos dinámico (Bloque 4).
        </p>
      </section>
    </PageLayout>
  );
}

export default ProductsPage;