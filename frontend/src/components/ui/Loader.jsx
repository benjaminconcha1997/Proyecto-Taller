function Loader({ message = "Cargando..." }) {
  return (
    <div className="py-16 text-center text-stone" role="status" aria-live="polite">
      {message}
    </div>
  );
}

export default Loader;