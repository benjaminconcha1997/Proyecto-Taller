import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import PageLayout from "../components/layout/PageLayout.jsx";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

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
      navigate("/admin"); // tras iniciar sesión, va al panel
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
      setLoading(false);
    }
  }

  return (
    <PageLayout>
      <section className="max-w-md mx-auto px-4 py-20">
        <h1 className="text-3xl font-medium text-ink mb-2">Iniciar sesión</h1>
        <p className="text-stone mb-8">Acceso para administradoras del taller.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-ink font-medium">Correo</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border/40 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              placeholder="admin@puertaroja.cl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-ink font-medium">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border/40 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-700 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 rounded-xl bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </section>
    </PageLayout>
  );
}

export default LoginPage;