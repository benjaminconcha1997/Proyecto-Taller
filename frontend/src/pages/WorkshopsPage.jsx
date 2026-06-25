import { useEffect, useState } from "react";
import { Users, Package, Award } from "lucide-react";
import PageLayout from "../components/layout/PageLayout.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import WorkshopCard from "../components/home/WorkshopCard.jsx";
import CreateWorkshopCard from "../components/workshops/CreateWorkshopCard.jsx";
import WorkshopForm from "../components/workshops/WorkshopForm.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorMessage from "../components/ui/ErrorMessage.jsx";
import {
  getWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
} from "../services/workshopService.js";
import { useAuth } from "../context/AuthContext.jsx";
import heroImage from "../assets/images/hero.jpg";

const benefits = [
  { icon: Users, title: "Grupos Pequeños", description: "Máximo 8 personas por taller para garantizar atención personalizada." },
  { icon: Package, title: "Materiales Incluidos", description: "Todos los materiales y herramientas necesarias están incluidos." },
  { icon: Award, title: "Profesoras con Experiencia", description: "Aprende de ceramistas profesionales con años de experiencia." },
];

function WorkshopsPage() {
  const { isAdmin } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);

  function loadWorkshops() {
    setLoading(true);
    getWorkshops()
      .then(setWorkshops)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadWorkshops();
  }, []);

  function handleCreate() {
    setEditingWorkshop(null);
    setShowForm(true);
  }

  function handleEdit(workshop) {
    setEditingWorkshop(workshop);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Eliminar este taller?")) return;
    try {
      await deleteWorkshop(id);
      loadWorkshops();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSave(formData) {
    if (editingWorkshop) {
      await updateWorkshop(editingWorkshop.id, formData);
    } else {
      await createWorkshop(formData);
    }
    setShowForm(false);
    setEditingWorkshop(null);
    loadWorkshops();
  }

  return (
    <PageLayout>
      <PageHero
        title="Descubre Nuestros Talleres de Cerámica"
        subtitle="Aprende técnicas artesanales en un ambiente creativo y profesional. Cursos para todos los niveles."
        image={heroImage}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {loading && <Loader message="Cargando talleres..." />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card de crear, primera y solo para admin */}
              {isAdmin && <CreateWorkshopCard onClick={handleCreate} />}

              {workshops.map((workshop) => (
                <WorkshopCard
                  key={workshop.id}
                  workshop={workshop}
                  onEdit={isAdmin ? () => handleEdit(workshop) : undefined}
                  onDelete={isAdmin ? () => handleDelete(workshop.id) : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#e8ddd6]/30">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="flex flex-col items-center text-center gap-3">
                <div className="bg-terracotta/10 p-4 rounded-full">
                  <Icon className="w-8 h-8 text-terracotta" />
                </div>
                <h3 className="text-lg font-medium text-ink">{benefit.title}</h3>
                <p className="text-stone">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {showForm && (
        <WorkshopForm
          workshop={editingWorkshop}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingWorkshop(null);
          }}
        />
      )}
    </PageLayout>
  );
}

export default WorkshopsPage;