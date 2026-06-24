function ErrorMessage({ message = "No se pudieron cargar los datos." }) {
  return (
    <div className="py-16 text-center text-red-700" role="alert">
      <p>{message}</p>
      <p className="text-sm text-stone mt-2">
        Verifica que el servidor esté funcionando e inténtalo de nuevo.
      </p>
    </div>
  );
}

export default ErrorMessage;