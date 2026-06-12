import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/talleres", label: "Talleres" },
  { to: "/productos", label: "Productos" },
  { to: "/contacto", label: "Contacto" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-brick-500 font-semibold"
      : "text-clay-700 hover:text-brick-500 transition-colors";

  return (
    <header className="bg-clay-50 border-b border-clay-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-clay-900">
          Taller de la Puerta Roja
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/admin"
            className="px-4 py-2 rounded-lg bg-brick-500 text-white hover:bg-brick-600 transition-colors"
          >
            Admin
          </Link>
        </nav>

        {/* Botón menú mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden text-clay-700"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span className="text-2xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Menú mobile desplegable */}
      {menuOpen && (
        <nav className="md:hidden border-t border-clay-200 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 rounded-lg bg-brick-500 text-white text-center hover:bg-brick-600 transition-colors"
          >
            Admin
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;