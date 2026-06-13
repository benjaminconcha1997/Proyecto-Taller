import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService.js";
import SectionTitle from "../ui/SectionTitle.jsx";
import Button from "../ui/Button.jsx";
import ProductCard from "./ProductCard.jsx";

function ProductsSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const featured = products.slice(0, 4);

  return (
    <section className="py-20 bg-terracotta/5">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Productos Destacados"
          subtitle="Descubre nuestra colección de piezas de cerámica únicas, hechas a mano."
          centered
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button to="/productos" variant="secondary">
            Ver toda la tienda
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;