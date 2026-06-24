import { useState } from "react";
import Button from "../ui/Button.jsx";

const initialForm = { name: "", email: "", message: "" };

function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // TODO (backend futuro): enviar `form` a la API con fetch(VITE_API_URL).
    setError("");
    setSent(true);
    setForm(initialForm);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-ink font-medium">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-border/40 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/40"
          placeholder="Tu nombre"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-ink font-medium">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-border/40 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/40"
          placeholder="tucorreo@ejemplo.cl"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-ink font-medium">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          className="px-4 py-3 rounded-xl border border-border/40 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/40 resize-none"
          placeholder="Cuéntanos en qué te podemos ayudar"
        />
      </div>

      {error && <p className="text-red-700 text-sm">{error}</p>}
      {sent && (
        <p className="text-terracotta text-sm">
          ¡Gracias! Tu mensaje fue recibido. Te responderemos pronto.
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full">
        Enviar mensaje
      </Button>
    </form>
  );
}

export default ContactForm;