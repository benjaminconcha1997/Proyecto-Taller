import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import ProductCard from "../components/home/ProductCard.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorMessage from "../components/ui/ErrorMessage.jsx";
import { getProducts } from "../services/productService.js";
import { useFetch } from "../hooks/useFetch.js";

function ProductsPage() {
  const { data: products, loading, error } = useFetch(getProducts);

  return (
    <PageLayout>
      <PageHero
        title="Tienda de Cerámica Artesanal"
        subtitle="Descubre nuestra colección única de piezas de cerámica hechas a mano con pasión y dedicación artesanal."
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {loading && <Loader message="Cargando productos..." />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

export default ProductsPage;