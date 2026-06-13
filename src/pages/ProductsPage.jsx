import { useEffect, useState } from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import ProductCard from "../components/home/ProductCard.jsx";
import { getProducts } from "../services/productService.js";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Tienda de Cerámica Artesanal"
        subtitle="Descubre nuestra colección única de piezas de cerámica hechas a mano con pasión y dedicación artesanal."
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default ProductsPage;