import { useEffect, useState } from "react";

// Hook reutilizable para cargar datos desde un service.
// Recibe una función async (serviceFn) y devuelve { data, loading, error }.
// Maneja los tres estados en un solo lugar, para no repetir la lógica
// de carga/error en cada componente.
export function useFetch(serviceFn) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true; // evita actualizar estado si el componente se desmonta

    setLoading(true);
    setError(null);

    serviceFn()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err) => {
        if (active) setError(err.message || "Ocurrió un error");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}