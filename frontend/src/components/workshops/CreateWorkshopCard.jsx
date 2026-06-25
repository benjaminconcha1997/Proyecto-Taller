import { Plus } from "lucide-react";

function CreateWorkshopCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full min-h-[300px] rounded-2xl border-2 border-dashed border-terracotta/50 flex flex-col items-center justify-center gap-4 text-terracotta hover:bg-terracotta/5 transition-colors"
    >
      <span className="w-16 h-16 rounded-full border-2 border-terracotta/50 flex items-center justify-center">
        <Plus className="w-8 h-8" />
      </span>
      <span className="text-lg font-medium">Crear Nuevo Taller</span>
    </button>
  );
}

export default CreateWorkshopCard;