import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      onClose(); // cierra el modal al entrar; el header se actualiza solo
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
      setLoading(false);
    }
  }

  return (
    // Fondo oscurecido. Al hacer clic aquí (fuera de la tarjeta) se cierra.
    <div
      className="fixed inset-0 bg-ink/50 flex items-center justify-center p-4 z-[60]"
      onClick={onClose}
    >
      {/* stopPropagation evita que el clic dentro de la tarjeta cierre el modal */}
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-[480px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        {/* Cabecera terracota */}
        <div className="bg-terracotta px-8 py-6 text-center">
          <h2 id="login-title" className="text-2xl font-medium text-white">
            Taller de la Puerta Roja
          </h2>
          <p className="text-white/90 mt-1">Panel de Administración</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8" noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border/30 focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              placeholder="admin@puertaroja.cl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border/30 focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-700 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 rounded-xl bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Pie con datos demo */}
        <div className="bg-cream border-t border-border/15 px-8 py-4 text-center">
          <p className="text-xs text-stone">
            
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;