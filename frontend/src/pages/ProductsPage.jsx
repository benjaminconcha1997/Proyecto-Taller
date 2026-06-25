import { useEffect, useState } from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import ProductCard from "../components/home/ProductCard.jsx";
import CreateProductCard from "../components/products/CreateProductCard.jsx";
import ProductForm from "../components/products/ProductForm.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorMessage from "../components/ui/ErrorMessage.jsx";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";
import { useAuth } from "../context/AuthContext.jsx";

function ProductsPage() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  function loadProducts() {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleCreate() {
    setEditingProduct(null);
    setShowForm(true);
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSave(formData) {
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData);
    } else {
      await createProduct(formData);
    }
    setShowForm(false);
    setEditingProduct(null);
    loadProducts();
  }

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
              {/* Card de crear, primera y solo para admin */}
              {isAdmin && <CreateProductCard onClick={handleCreate} />}

              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={isAdmin ? () => handleEdit(product) : undefined}
                  onDelete={isAdmin ? () => handleDelete(product.id) : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </PageLayout>
  );
}

export default ProductsPage;